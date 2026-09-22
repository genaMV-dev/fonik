import { create } from "zustand"
import { persist } from "zustand/middleware"
import Cookies from "js-cookie"

export type AuthUser = {
  _id: string
  username: string
  email: string
  avatar?: string | null
  accessToken?: string
  refreshToken?: string
  sessionId?: string
  token?: string
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  hasHydrated: boolean
  basketCount: number
  setUser: (user: AuthUser, token?: string) => void
  updateUser: (user: Partial<AuthUser>) => void
  clearAuth: () => void
  setBasketCount: (count: number) => void
  incrementBasketCount: () => void
  decrementBasketCount: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      basketCount: 0,

      setUser: (user, token) => {
        const sessionToken =
          token ||
          user.accessToken ||
          user.sessionId ||
          user.token ||
          user._id

        if (sessionToken) {
          Cookies.set("sessionId", sessionToken, { expires: 7, path: "/" })
        }

        set({
          user: {
            ...user,
            accessToken: sessionToken,
          },
          isAuthenticated: true,
        })
      },

      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),

      clearAuth: () => {
        Cookies.remove("sessionId", { path: "/" })

        set({
          user: null,
          isAuthenticated: false,
          basketCount: 0,
        })
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
        if (state?.user) {
          const token =
            state.user.accessToken ||
            state.user.sessionId ||
            state.user.token ||
            state.user._id

          if (token) {
            Cookies.set("sessionId", token, { expires: 7, path: "/" })
          }
        }
        useAuthStore.setState({ hasHydrated: true })
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        basketCount: state.basketCount,
      }),
    },
  ),
)