"use client"

import { useEffect } from "react"
import { isAxiosError } from "axios"
import { useAuthStore } from "@/lib/store/authStore"
import { refreshUserSession } from "@/lib/api/api"

export default function AuthSessionChecker() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const checkSession = async () => {
      try {
        await refreshUserSession()
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 401) {
          clearAuth()
        }
      }
    }

    checkSession()
  }, [isAuthenticated, clearAuth])

  return null
}
