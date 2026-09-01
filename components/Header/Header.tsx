import Link from "next/link"
import css from "./Header.module.css"
import Image from "next/image";
import { SlBasket } from "react-icons/sl";


const Header = () => {
  return (
    <header className={css.header}>
        <Link className={css.logo} href="./">
        <Image className={css.icon} src="/logo.ico" alt="Fomik Logo" width={32} height={32} />
        <h2 className={css.logoTitle}>FOMIK</h2>
        </Link>

      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href="./">HOME</Link>
        </li>
        <li className={css.navItem}>
          <Link href="/products">PRODUCTS</Link>
        </li>
        <li className={css.navItem}>
          <Link href="/ads">MY ADS</Link>
        </li>
        <li className={css.navItem}>
          <Link href="/about">ABOUT US</Link>
        </li>
      </ul>

      <div className={css.basket}><Link href="/basket"><SlBasket size={50} /><div className={css.counter}>5</div></Link></div>
    </header>
  )
}

export default Header
