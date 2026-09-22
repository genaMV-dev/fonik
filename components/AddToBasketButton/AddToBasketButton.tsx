"use client"

import { useEffect, useState } from "react"
import { SlBasket } from "react-icons/sl"
import toast from "react-hot-toast"
import { addToBasket, getBasket } from "@/lib/api/api"
import { useAuthStore } from "@/lib/store/authStore"
import css from "@/app/products/[phoneId]/PhonePage.module.css"

type AddToBasketButtonProps = {
  phoneId: string
}

export const AddToBasketButton = ({ phoneId }: AddToBasketButtonProps) => {
  const [isInBasket, setIsInBasket] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const incrementBasketCount = useAuthStore(
    (state) => state.incrementBasketCount,
  )

  useEffect(() => {
    if (!isAuthenticated) return

    const checkBasket = async () => {
      try {
        const basket = await getBasket()
        const found = basket.some(
          (item: { _id: string }) => item._id === phoneId,
        )
        setIsInBasket(found)
      } catch (err) {
        console.error("Failed to check basket status:", err)
      }
    }

    checkBasket()
  }, [phoneId, isAuthenticated])

  const handleAddToBasket = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to basket")
      return
    }

    try {
      setIsLoading(true)
      const res = await addToBasket(phoneId)
      setIsInBasket(true)
      incrementBasketCount()
      toast.success(res.message || "Added to basket!")
    } catch (err) {
      console.error("Failed to add to basket:", err)
      toast.error("Failed to add to basket")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      className={`${css.addToBasketBtn} ${isInBasket ? css.disabled : ""}`}
      type="button"
      onClick={handleAddToBasket}
      disabled={isInBasket || isLoading}
    >
      {isInBasket ? "IN BASKET" : "ADD TO BASKET"} <SlBasket size={32} />
    </button>
  )
}
