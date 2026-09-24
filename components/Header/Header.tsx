"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import css from "./Header.module.css"
import Image from "next/image"
import { SlBasket } from "react-icons/sl"
import { GoHome, GoPackage, GoTag, GoInfo } from "react-icons/go"
import { useAuthStore } from "@/lib/store/authStore"
import { usePathname, useRouter } from "next/navigation"
import { getBasket, getCurrentUser, logoutUser } from "@/lib/api/api"
import ProfileList from "../ProfileList/ProfileList"

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const basketCount = useAuthStore((state) => state.basketCount)
  const setBasketCount = useAuthStore((state) => state.setBasketCount)

  const [avatar, setAvatar] = useState<string | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) return

    let isMounted = true

    const fetchHeaderData = async () => {
      try {
        const [basketData, userData] = await Promise.all([
          getBasket(),
          getCurrentUser(),
        ])

        if (isMounted) {
          setBasketCount(basketData.length)
          if (userData?.avatar) {
            setAvatar(userData.avatar)
          }
        }
      } catch (error) {
        console.error("Failed to fetch header user/basket data:", error)
      }
    }

    fetchHeaderData()

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
      setIsProfileOpen(false)
      router.push("/")
    }
  }

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev)
  }

  return (
    <>
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

        <ul className={css.navListDesktop}>
          <li className={css.navItem}>
            <Link
              href="/"
              className={pathname === "/" ? css.activeLink : ""}
            >
              HOME
            </Link>
          </li>
          <li className={css.navItem}>
            <Link
              href="/products"
              className={pathname === "/products" ? css.activeLink : ""}
            >
              PRODUCTS
            </Link>
          </li>
          {isAuthenticated && (
            <li className={css.navItem}>
              <Link
                href="/ads"
                className={pathname === "/ads" ? css.activeLink : ""}
              >
                MY ADS
              </Link>
            </li>
          )}
          <li className={css.navItem}>
            <Link
              href="/about"
              className={pathname === "/about" ? css.activeLink : ""}
            >
              ABOUT US
            </Link>
          </li>
        </ul>

        {isAuthenticated ? (
          <div className={css.userActions}>
            <Link href="/basket" className={css.basketLink}>
              <SlBasket size={32} />
              {basketCount > 0 && (
                <div className={css.counter}>{basketCount}</div>
              )}
            </Link>

            <div className={css.profileWrapper}>
              <button
                className={css.profileListBtn}
                type="button"
                onClick={toggleProfileMenu}
              >
                <Image
                  src={avatar || "/placeholder.webp"}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className={css.avatarImage}
                />
              </button>

              {isProfileOpen && (
                <ProfileList
                  onLogout={handleLogout}
                  onClose={() => setIsProfileOpen(false)}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={css.unAuthWrapper}>
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

      <nav className={css.bottomNav}>
        <Link href="/" className={`${css.bottomNavItem} ${pathname === "/" ? css.active : ""}`}>
          <GoHome size={24} />
          <span>HOME</span>
        </Link>

        <Link href="/products" className={`${css.bottomNavItem} ${pathname === "/products" ? css.active : ""}`}>
          <GoPackage size={24} />
          <span>PRODUCTS</span>
        </Link>

        {isAuthenticated && (
          <Link href="/ads" className={`${css.bottomNavItem} ${pathname === "/ads" ? css.active : ""}`}>
            <GoTag size={24} />
            <span>MY ADS</span>
          </Link>
        )}

        <Link href="/about" className={`${css.bottomNavItem} ${pathname === "/about" ? css.active : ""}`}>
          <GoInfo size={24} />
          <span>ABOUT US</span>
        </Link>
      </nav>
    </>
  )
}

export default Header