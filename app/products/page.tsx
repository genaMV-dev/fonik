"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import css from "./ProductsPage.module.css"
import Image from "next/image"
import { SlBasket } from "react-icons/sl"
import { getAllPhones, addToBasket, getBasket, PhoneItem } from "@/lib/api/api"
import Loader from "@/components/Loader/Loader"
import toast from "react-hot-toast"
import { useAuthStore } from "@/lib/store/authStore"

const ProductsPage = () => {
  const [phones, setPhones] = useState<PhoneItem[]>([])
  const [basketItemIds, setBasketItemIds] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [addingId, setAddingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const incrementBasketCount = useAuthStore((state) => state.incrementBasketCount)

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        // Завантажуємо список товарів та кошик паралельно
        const [productsData, basketData] = await Promise.all([
          getAllPhones({ page: 1, perPage: 6 }),
          isAuthenticated ? getBasket().catch(() => []) : Promise.resolve([]),
        ])

        setPhones(productsData.phones)
        setTotalPages(productsData.totalPages)

        if (Array.isArray(basketData)) {
          setBasketItemIds(basketData.map((item) => item._id))
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [isAuthenticated])

  const handleLoadMore = async (): Promise<void> => {
    if (page >= totalPages || loadingMore) return

    const nextPage = page + 1
    try {
      setLoadingMore(true)
      const data = await getAllPhones({ page: nextPage, perPage: 12 })
      setPhones((prev) => [...prev, ...data.phones])
      setPage(nextPage)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("Error loading more products:", err)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleAddToBasket = async (phoneId: string): Promise<void> => {
    try {
      setAddingId(phoneId)
      const res = await addToBasket(phoneId)

      // Додаємо ID товару в локальний масив кошика
      setBasketItemIds((prev) => [...prev, phoneId])

      // Збільшуємо лічильник у Zustand
      incrementBasketCount()

      toast.success(res.message || "Added to basket!")
    } catch (err) {
      console.error("Error adding to basket:", err)
      toast.error("Failed to add to basket")
    } finally {
      setAddingId(null)
    }
  }

  const truncateWords = (text: string, limit: number): string => {
    if (!text) return ""
    const words = text.trim().split(/\s+/)
    if (words.length <= limit) return text
    return words.slice(0, limit).join(" ") + "..."
  }

  return (
    <>
      <h2 className={css.title}>PRODUCTS</h2>
      <div className={css.container}>
        {error && <p className={css.error}>{error}</p>}

        <ul className={css.adsList}>
          {phones.map((phone) => {
            const imageUrl =
              typeof phone.photo === "string" && phone.photo
                ? phone.photo
                : "/placeholder.png"

            const isInBasket = basketItemIds.includes(phone._id)

            return (
              <li key={phone._id} className={css.adsItem}>
                <div className={css.wrapper}>
                  <Image
                    className={css.image}
                    src={imageUrl}
                    alt={phone.name || "Phone image"}
                    width={200}
                    height={200}
                  />
                  <div className={css.mainTextContent}>
                    <h2 className={css.name}>{phone.name}</h2>
                    <h3 className={css.price}>{phone.price}$</h3>
                    <Link
                      className={css.learnMore}
                      href={`/products/${phone._id}`}
                    >
                      LEARN MORE
                    </Link>
                  </div>

                  {!isInBasket && (
                    <div className={css.basket}>
                      <button
                        className={css.basketBtn}
                        type="button"
                        onClick={() => handleAddToBasket(phone._id)}
                        disabled={addingId === phone._id}
                      >
                        <SlBasket size={25} />
                      </button>
                    </div>
                  )}
                </div>

                <p className={css.description}>
                  {truncateWords(phone.description, 27)}
                </p>
              </li>
            )
          })}
        </ul>

        {loading && <Loader />}
      </div>

      {page < totalPages && (
        <div className={css.loadMoreContainer}>
          <button
            className={css.loadMore}
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "LOADING..." : "LOAD MORE"}
          </button>
        </div>
      )}
    </>
  )
}

export default ProductsPage