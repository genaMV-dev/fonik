"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import css from "./ProductsPage.module.css"
import Image from "next/image"
import { SlBasket } from "react-icons/sl"
import { getAllPhones, PhoneItem } from "@/lib/api/api"

const ProductsPage = () => {
  const [phones, setPhones] = useState<PhoneItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialPhones = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllPhones({ page: 1, perPage: 12 })
        setPhones(data.phones)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPhones()
  }, [])

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
                    <Link className={css.learnMore} href={`/products/${phone._id}`}>
                      LEARN MORE
                    </Link>
                  </div>

                  <div className={css.basket}>
                    <button className={css.basketBtn} type="button">
                      <SlBasket size={25} />
                    </button>
                  </div>
                </div>

                <p className={css.description}>
                  {truncateWords(phone.description, 27)}
                </p>
              </li>
            )
          })}
        </ul>

        {loading && <p className={css.loadingText}>Loading...</p>}
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