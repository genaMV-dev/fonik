import { getPhoneById } from "@/lib/api/api"
import css from "./PhonePage.module.css"
import Image from "next/image"
import { LuHardDrive } from "react-icons/lu"
import { MdOutlineVerified } from "react-icons/md"
import { RiBatteryChargeFill } from "react-icons/ri"
import { BsClockHistory } from "react-icons/bs"
import { SlBasket } from "react-icons/sl"
import { GrContact } from "react-icons/gr"
import { FaRegUser } from "react-icons/fa";
import Link from "next/link"

type Props = {
  params: Promise<{ phoneId: string }>
}

const PhonePage = async ({ params }: Props) => {
  const { phoneId } = await params
  const [phone] = await Promise.all([getPhoneById(phoneId)])

  if (!phone) {
    return <div>Phone not found</div>
  }

  const imageSrc =
    typeof phone.photo === "string" && phone.photo
      ? phone.photo
      : "/placeholder.png"

  return (
    <div className={css.container}>
      <div className={css.imageContainer}>
        <Image
          className={css.image}
          src={imageSrc}
          alt={phone.name}
          width={700}
          height={650}
        ></Image>
      </div>

      <div className={css.textContainer}>
        <h2 className={css.name}>{phone.name}</h2>
        <p className={css.price}>{phone.price}$</p>
        <p className={css.descriptionTitle}>Product Description</p>
        <p className={css.description}>{phone.description}</p>

        <div className={css.gridContainer}>
          <div className={css.itemWrapper}>
            <div className={css.iconWrapper}>
              <LuHardDrive size={32} />
            </div>
            <div className={css.wrapper}>
              <p className={css.paragraph}>Storage</p>
              <p className={css.storage}>{phone.storage} GB</p>
            </div>
          </div>

          <div className={css.itemWrapper}>
            <div className={css.iconWrapper}>
              <RiBatteryChargeFill size={32} />
            </div>
            <div className={css.wrapper}>
              <p className={css.paragraph}>Battery Condition</p>
              <p className={css.storage}>{phone.battery}</p>
            </div>
          </div>

          <div className={css.itemWrapper}>
            <div className={css.iconWrapper}>
              <BsClockHistory size={32} />
            </div>
            <div className={css.wrapper}>
              <p className={css.paragraph}>Period of Use</p>
              <p className={css.storage}>{phone.inUse}</p>
            </div>
          </div>

          <div className={css.itemWrapper}>
            <div className={css.iconWrapper}>
              <MdOutlineVerified size={32} />
            </div>
            <div className={css.wrapper}>
              <p className={css.paragraph}>Physical Condition</p>
              <p className={css.storage}>{phone.conditions}</p>
            </div>
          </div>
        </div>

        <div className={css.buttons}>
          <button className={css.addToBasketBtn} type="button">
            ADD TO BASKET <SlBasket size={32} />
          </button>

          <Link
            className={css.contactLink}
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${phone.author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT SELLER <GrContact size={32} />
          </Link>
        </div>

        <div className={css.infoAuthor}>
            <p className={css.infoP}><FaRegUser size={32}/> Seller Information</p>
            <p className={css.contactUser}>User contact: {phone.author}</p>
        </div>
      </div>
    </div>
  )
}

export default PhonePage
