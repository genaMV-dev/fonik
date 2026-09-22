"use client"

import { useEffect } from "react"
import Link from "next/link"
import css from "./Header.module.css"
import Image from "next/image"
import { SlBasket } from "react-icons/sl"
import { useAuthStore } from "@/lib/store/authStore"
import { usePathname, useRouter } from "next/navigation"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { getBasket, logoutUser } from "@/lib/api/api"

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const basketCount = useAuthStore((state) => state.basketCount)
  const setBasketCount = useAuthStore((state) => state.setBasketCount)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) return

    let isMounted = true

    const fetchBasket = async () => {
      try {
        const data = await getBasket()
        if (isMounted) {
          setBasketCount(data.length)
        }
      } catch (error) {
        console.error("Failed to fetch basket count:", error)
      }
    }

    fetchBasket()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated, setBasketCount])

  const hiddenRoutes = ["/login", "/register"]

  if (hiddenRoutes.includes(pathname)) {
    return (
      <div className={css.container}>
        <Link className={css.logo} href="/">
          <Image
            className={css.icon}
            src="/logo.ico"
            alt="Fomik Logo"
            width={32}
            height={32}
          />
          <h2 className={css.logoTitle}>FOMIK</h2>
        </Link>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Logout error on backend:", error)
    } finally {
      useAuthStore.getState().clearAuth()
      router.push("/")
    }
  }

  return (
    <header className={css.header}>
      <Link className={css.logo} href="/">
        <Image
          className={css.icon}
          src="/logo.ico"
          alt="Fomik Logo"
          width={32}
          height={32}
        />
        <h2 className={css.logoTitle}>FOMIK</h2>
      </Link>

      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href="/">HOME</Link>
        </li>
        <li className={css.navItem}>
          <Link href="/products">PRODUCTS</Link>
        </li>
        {isAuthenticated && (
          <li className={css.navItem}>
            <Link href="/ads">MY ADS</Link>
          </li>
        )}
        <li className={css.navItem}>
          <Link href="/about">ABOUT US</Link>
        </li>
      </ul>

      {isAuthenticated ? (
        <div className={css.basketWrapper}>
          <Link href="/basket">
            <SlBasket size={50} />
            {basketCount > 0 && (
              <div className={css.counter}>{basketCount}</div>
            )}
          </Link>

          <button className={css.logout} type="button" onClick={handleLogout}>
            <RiLogoutBoxRLine size={50} />
          </button>
        </div>
      ) : (
        <div>
          <ul className={css.unAuthList}>
            <li className={css.unAuthItem}>
              <Link className={css.loginLink} href="/login">
                Login
              </Link>
            </li>
            <li className={css.unAuthItem}>
              <Link className={css.regLink} href="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header