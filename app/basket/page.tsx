import Image from "next/image"
import css from "./BasketPage.module.css"
import { MdDelete } from "react-icons/md"

const BasketPage = () => {
  const testPhones = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description:
        "Mint condition flagship device featuring 512 GB of internal storage...",
      price: 1100,
      image: "/testImg/testIphone.webp",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      description:
        "Flawless Space Black edition with 256 GB of internal storage space...",
      price: 820,
      image: "/testImg/testIphone.webp",
    },
    {
      id: 3,
      name: "Xiaomi 13 Ultra",
      description:
        "Professional Leica quad-camera system paired with 512 GB...",
      price: 620,
      image: "/testImg/testIphone.webp",
    },
  ]

  const totalPrice = testPhones.reduce((acc, phone) => acc + phone.price, 0)

  return (
    <div className={css.container}>
      <h2 className={css.title}>YOUR BASKET</h2>

      <div className={css.basketContent}>
        <ul className={css.basketList}>
          {testPhones.map((phone) => (
            <li className={css.basketItem} key={phone.id}>
              <div className={css.leftGroup}>
                <Image
                  className={css.image}
                  src={phone.image}
                  alt={phone.name}
                  width={100}
                  height={100}
                />
                <div className={css.textContent}>
                  <h3 className={css.name}>{phone.name}</h3>
                  <p className={css.price}>{phone.price}$</p>
                </div>
              </div>

              
              <div className={css.rightGroup}>
                <button className={css.learnMore}>LEARN MORE</button>
                <button className={css.deleteBtn} aria-label="Delete item">
                  <MdDelete className={css.deleteIcon} size={32} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        
        <div className={css.summaryCard}>
          <h3 className={css.summaryTitle}>ORDER SUMMARY</h3>
          <div className={css.summaryRow}>
            <span>Total Items:</span>
            <span>{testPhones.length}</span>
          </div>
          <div className={css.summaryRow}>
            <span>Total Amount:</span>
            <span className={css.totalPrice}>{totalPrice}$</span>
          </div>
          <button className={css.checkoutBtn}>CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default BasketPage