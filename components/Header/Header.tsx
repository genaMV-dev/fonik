"use client"

import Link from "next/link"
import css from "./Header.module.css"
import Image from "next/image"
import { SlBasket } from "react-icons/sl"
import { useAuthStore } from "@/lib/store/authStore"
import { usePathname } from "next/navigation"

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const pathname = usePathname()

  const hiddenRoutes = ["/login", "/register"]

  if (hiddenRoutes.includes(pathname)) {
    return (
      <div className={css.container}>
      <Link className={css.logo} href="./">
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

  return (
    <header className={css.header}>
      <Link className={css.logo} href="./">
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
          <Link href="./">HOME</Link>
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
        <div className={css.basket}>
          <Link href="/basket">
            <SlBasket size={50} />
            <div className={css.counter}>5</div>
          </Link>
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
