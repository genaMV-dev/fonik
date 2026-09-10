import Link from "next/link"
import css from "./MyAds.module.css"
import { FiPlusCircle } from "react-icons/fi"
import Image from "next/image"
import { MdModeEditOutline } from "react-icons/md"
import { MdDelete } from "react-icons/md"

const MyAds = () => {
const testPhones = [
  {
    name: "iPhone 15 Pro Max",
    description:
      "Mint condition flagship device featuring 512 GB of internal storage. Carefully handled for under six months with maximum overall battery performance and efficiency. The natural titanium frame shows absolutely zero marks or scratches, and the ceramic shield front screen is in spotless condition. Includes the original USB-C braided cable, original box, and a free premium protective silicone case.",
    price: 1100,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    description:
      "Powerful Android flagship equipped with 256 GB of fast storage and an integrated S-Pen stylus. Has slight visible scuffs right around the bottom charging port, but the Dynamic AMOLED display and back camera glass remain untouched. Battery health is excellent, lasting easily over a day of heavy use. Comes with all original accessories and standard documentation.",
    price: 780,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "Google Pixel 8 Pro",
    description:
      "Amazing camera phone with 128 GB of space for all your photos and high-resolution videos. There is a small cracked back glass section on the top right corner, but the screen and technical performance are completely flawless. Battery health is strong and holds a reliable full day charge without issues. Sold with a fast charger and tough case.",
    price: 490,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "iPhone 14 Pro",
    description:
      "Flawless Space Black edition with 256 GB of internal storage space. Used for just a few months strictly as a secondary business phone, meaning zero scratches or micro-abrasions on the display and stainless steel edges. Maximum battery capacity remains at a high 98%. Includes original box, factory Lightning cable, and a unused glass screen protector.",
    price: 820,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "Xiaomi 13 Ultra",
    description:
      "Professional Leica quad-camera system paired with 512 GB of high-speed capacity. Light signs of regular daily use can be seen along the aluminum side frame, but the display screen is pristine. Battery holds charge just like new, supporting blazing fast 90W wired charging. Ships in full retail packaging with the original fast wall adapter included.",
    price: 620,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "iPhone 13 Mini",
    description:
      "Compact pink model offering 128 GB of storage space. Has deep scratches across the front screen display as well as noticeable dent marks on the aluminum corners. Battery health currently sits at 79%, so a future battery service is recommended. Fully functional internally, with working Face ID, clear speakers, and cameras. Great secondary phone or project device.",
    price: 310,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "OnePlus 11 5G",
    description:
      "Fast charging performance champion with 256 GB of internal storage. Unboxed only for brief media testing purposes, remaining in pristine, untouched condition with 100% battery capacity. The curved Super Fluid AMOLED screen delivers smooth visuals. Comes complete with the original 100W SuperVOOC power adapter, red signature cable, pre-applied screen protector, and original brand packaging.",
    price: 540,
    image: "/testImg/testIphone.webp",
  },
  {
    name: "Nothing Phone (2)",
    description:
      "Unique transparent back design featuring white Glyph interface LEDs and 128 GB storage space. Minor hairline scratches are visible on the side bezel under direct lighting, but overall the phone is in great working shape. Battery life comfortably powers through a full busy day. Includes the transparent C-to-C charging cable, SIM ejector tool, and original box.",
    price: 430,
    image: "/testImg/testIphone.webp",
  },
];

  const truncateWords = (text: string, limit: number = 35): string => {
    const words = text.trim().split(/\s+/)
    if (words.length <= limit) return text
    return words.slice(0, limit).join(" ") + "..."
  }

  return (
    <>
      <h2 className={css.title}>MY ADS</h2>
      <div className={css.container}>
        <ul className={css.adsList}>
          <Link href="/sell">
            <div className={css.addSell}>
              <FiPlusCircle className={css.plusIcon} size={120} />
            </div>
          </Link>
          {testPhones.map((phone, index) => (
            <li key={index} className={css.adsItem}>
              <div className={css.wrapper}>
                <Link className={css.editLink} href="#">
                  <MdModeEditOutline className={css.editIcon} size={25} />
                </Link>

                <button className={css.deleteBtn}>
                  <MdDelete className={css.deleteIcon} size={25} />
                </button>

                <Image
                  className={css.image}
                  src={phone.image}
                  alt="PHONE"
                  width={200}
                  height={200}
                />
                <div className={css.mainTextContent}>
                  <h2 className={css.name}>{phone.name}</h2>
                  <h3 className={css.price}>{phone.price}$</h3>
                </div>
              </div>

              <p className={css.description}>
                {truncateWords(phone.description, 27)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MyAds
