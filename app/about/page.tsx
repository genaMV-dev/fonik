import css from "./AboutPage.module.css"
import { TbTargetArrow } from "react-icons/tb"
import { GoShieldCheck } from "react-icons/go"
import { CiGlobe } from "react-icons/ci"
import Image from "next/image"

const AboutPage = () => {
  return (
    <div className={css.container}>
      <div className={css.textContent}>
        <h2 className={css.title}>ABOUT US</h2>
        <p className={css.paragraph}>
          LEARN MORE ABOUT OUR JOURNEY, VALUES, <br /> AND DEDICATED TEAM.
        </p>
      </div>

      <ul className={css.aboutList}>
        <li className={css.aboutItem}>
          <TbTargetArrow size={120} />
          <h2 className={css.titleItem}>OUR MISSION</h2>
          <p className={css.paragraphItem}>
            To create a curated, reliable marketplace for quality pre-owned
            iPhones, Samsung, and other leading smartphones. We are breaking
            down barriers to deliver verified mobile devices while fostering
            trust with every purchase you make.
          </p>
        </li>
        <li className={css.aboutItem}>
          <GoShieldCheck size={120} />
          <h2 className={css.titleItem}>FRAUD PREVENTION</h2>
          <p className={css.paragraphItem}>
            We combat fraud and prevent client deception through a multi-layered
            verification system for device condition and ownership. Our approach
            includes secure transactions, thorough identity checks, and rigorous
            fraud protection — all to guarantee transparent and honest deals.
          </p>
        </li>
        <li className={css.aboutItem}>
          <CiGlobe size={120} />
          <h2 className={css.titleItem}>GLOBAL REACH</h2>
          <p className={css.paragraphItem}>
            Reliable shipping and targeted marketing to serve our customers
            globally. We have built a strong community of customers and partners
            across many regions.
          </p>
        </li>
      </ul>

      <h2 className={css.titleFounders}>MEET THE FOUNDERS</h2>
      <ul className={css.foundersList}>
        <li className={css.foundersItem}>
          <Image
            className={css.image}
            src="/img/Harry.webp"
            alt="HARRY"
            width={200}
            height={200}
          ></Image>
          <p className={css.aboutFounders}>
            Harry Smith is a professional innovator driving progress in
            education. His expertise also extends to technology, where he
            continues to make a lasting impact.
          </p>
        </li>

        <li className={css.foundersItem}>
          <Image
            className={css.image}
            src="/img/Jiona.webp"
            alt="JIONA"
            width={200}
            height={200}
          ></Image>
          <p className={css.aboutFounders}>
            Jiona Seon is a passionate professional dedicated to community
            growth. Her work empowers individuals and strengthens connections
            within our network.
          </p>
        </li>
      </ul>
    </div>
  )
}

export default AboutPage
