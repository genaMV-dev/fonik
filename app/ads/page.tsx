"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import css from "./MyAds.module.css"
import { FiPlusCircle } from "react-icons/fi"
import Image from "next/image"
import { MdModeEditOutline, MdDelete } from "react-icons/md"
import { getMyPhones, deletePhoneById, PhoneItem } from "@/lib/api/api"
import Loader from "@/components/Loader/Loader"
import toast from "react-hot-toast"

const PER_PAGE = 5

const MyAds = () => {
  const [phones, setPhones] = useState<PhoneItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialPhones = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMyPhones({ page: 1, perPage: PER_PAGE })
        setPhones(data.phones)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error("Error fetching my ads:", err)
        setError("Failed to load your ads")
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
      const data = await getMyPhones({ page: nextPage, perPage: PER_PAGE })
      setPhones((prev) => [...prev, ...data.phones])
      setPage(nextPage)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("Error loading more of my ads:", err)
      toast.error("Failed to load more ads")
    } finally {
      setLoadingMore(false)
    }
  }

  const handleDelete = async (phoneId: string): Promise<void> => {
    const isConfirmed = window.confirm("Are you sure you want to delete this ad?")
    if (!isConfirmed) return

    try {
      setDeletingId(phoneId)
      const res = await deletePhoneById(phoneId)

      setPhones((prev) => prev.filter((phone) => phone._id !== phoneId))
      toast.success(res.message || "Ad deleted successfully")
    } catch (err) {
      console.error("Error deleting ad:", err)
      toast.error("Failed to delete ad")
    } finally {
      setDeletingId(null)
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
      <h2 className={css.title}>MY ADS</h2>
      <div className={css.container}>
        {error && <p className={css.error}>{error}</p>}

        <ul className={css.adsList}>
          {/* Кнопка створення нового оголошення */}
          <li className={css.addSellItem}>
            <Link href="/sell">
              <div className={css.addSell}>
                <FiPlusCircle className={css.plusIcon} size={120} />
              </div>
            </Link>
          </li>

          {phones.map((phone) => {
            const imageUrl =
              typeof phone.photo === "string" && phone.photo
                ? phone.photo
                : "/placeholder.png"

            return (
              <li key={phone._id} className={css.adsItem}>
                <div className={css.wrapper}>
                  <Link className={css.editLink} href={`/ads/update/${phone._id}`}>
                    <MdModeEditOutline className={css.editIcon} size={25} />
                  </Link>

                  <button
                    className={css.deleteBtn}
                    type="button"
                    onClick={() => handleDelete(phone._id)}
                    disabled={deletingId === phone._id}
                  >
                    <MdDelete className={css.deleteIcon} size={25} />
                  </button>

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
                  </div>
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

export default MyAds