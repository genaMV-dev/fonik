"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MdDelete } from "react-icons/md"
import { getBasket, removeFromBasket, PhoneItem } from "@/lib/api/api"
import { useAuthStore } from "@/lib/store/authStore"
import css from "./BasketPage.module.css"

const BasketPage = () => {
  const [phones, setPhones] = useState<PhoneItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const setBasketCount = useAuthStore((state) => state.setBasketCount)
  const decrementBasketCount = useAuthStore((state) => state.decrementBasketCount)

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        setIsLoading(true)
        const data = await getBasket()
        setPhones(data)
        setBasketCount(data.length)
      } catch (err) {
        console.error("Failed to load basket:", err)
        setError("Failed to load basket items")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBasket()
  }, [setBasketCount])

  const handleDelete = async (phoneId: string) => {
    try {
      await removeFromBasket(phoneId)
      setPhones((prevPhones) =>
        prevPhones.filter((phone) => phone._id !== phoneId)
      )
      // Зменшуємо лічильник у шапці
      decrementBasketCount()
    } catch (err) {
      console.error("Failed to remove item from basket:", err)
    }
  }

  const totalPrice = phones.reduce((acc, phone) => acc + (phone.price || 0), 0)

  if (isLoading) {
    return <div className={css.container}>Loading basket...</div>
  }

  if (error) {
    return <div className={css.container}>{error}</div>
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>YOUR BASKET</h2>

      {phones.length === 0 ? (
        <p className={css.emptyBasket}>Your basket is empty.</p>
      ) : (
        <div className={css.basketContent}>
          <ul className={css.basketList}>
            {phones.map((phone) => {
              const imageSrc =
                typeof phone.photo === "string" && phone.photo
                  ? phone.photo
                  : "/placeholder.png"

              return (
                <li className={css.basketItem} key={phone._id}>
                  <div className={css.leftGroup}>
                    <Image
                      className={css.image}
                      src={imageSrc}
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
                    <Link
                      href={`/products/${phone._id}`}
                      className={css.learnMore}
                    >
                      LEARN MORE
                    </Link>
                    <button
                      className={css.deleteBtn}
                      onClick={() => handleDelete(phone._id)}
                      aria-label="Delete item"
                      type="button"
                    >
                      <MdDelete className={css.deleteIcon} size={32} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={css.summaryCard}>
            <h3 className={css.summaryTitle}>ORDER SUMMARY</h3>
            <div className={css.summaryRow}>
              <span>Total Items:</span>
              <span>{phones.length}</span>
            </div>
            <div className={css.summaryRow}>
              <span>Total Amount:</span>
              <span className={css.totalPrice}>{totalPrice}$</span>
            </div>
            <button className={css.checkoutBtn} type="button">
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BasketPage