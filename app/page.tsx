import Link from "next/link"
import css from "./page.module.css"
import Image from "next/image";

export default function Home() {
  return (
    <div className={css.container}>
      <div className={css.text}>
      <h2 className={css.title}>SMARTPHONES FOR YOU</h2>
      <p className={css.paragraph}>
        Turn your used phone into <br /> cash or find your next smartphone
        directly <br /> from other users.
      </p>

      <ul className={css.btnList}>
        <li className={css.btnItem}>
          <Link className={css.sell} href="/products">
            SELL NOW
          </Link>
        </li>
        <li className={css.btnItem}>
          <Link className={css.buy} href="/sell">
            BUY NOW
          </Link>
        </li>
      </ul>
      </div>

      <div className={css.gallery}>
        <Image src="/img/iphone17.webp" alt="IPHONE 17" width={780} height={680}/>
      </div>

    </div>
  )
}
