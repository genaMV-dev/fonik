import { create } from "zustand"
import { persist } from "zustand/middleware"
import { logoutUser } from "../api/api"

export type AuthUser = {
  _id: string
  username: string
  email: string
  avatar?: string | null
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  hasHydrated: boolean
  basketCount: number
  setUser: (user: AuthUser) => void
  updateUser: (user: Partial<AuthUser>) => void
  clearAuth: () => void
  logout: () => Promise<void>
  setBasketCount: (count: number) => void
  incrementBasketCount: () => void
  decrementBasketCount: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      basketCount: 0,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        })
      },

      updateUser: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          basketCount: 0,
        })
      },

      logout: async () => {
        try {
          await logoutUser()
        } catch (error) {
          console.error("Logout request failed:", error)
        } finally {
          get().clearAuth()
        }
      },

      setBasketCount: (count) => set({ basketCount: count }),

      incrementBasketCount: () =>
        set((state) => ({ basketCount: state.basketCount + 1 })),

      decrementBasketCount: () =>
        set((state) => ({ basketCount: Math.max(0, state.basketCount - 1) })),
    }),
    {
      name: "fonik-auth",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true
          // Перевіряємо, чи є користувач, і виставляємо справжній статус
          state.isAuthenticated = !!state.user
        }
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        basketCount: state.basketCount,
      }),
    },
  ),
)