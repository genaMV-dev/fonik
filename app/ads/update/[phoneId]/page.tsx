"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "@/components/Loader/Loader"
import PhoneForm, { SellFormValues } from "@/components/PhoneForm/PhoneForm"
import { getPhoneById, updatePhone } from "@/lib/api/api"
import css from "./UpdatePhonePage.module.css"

const UpdatePhonePage = () => {
  const router = useRouter()
  const params = useParams()
  const phoneId = params?.phoneId as string

  const [initialValues, setInitialValues] = useState<SellFormValues | null>(
    null,
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!phoneId) return

    const fetchPhone = async () => {
      try {
        setLoading(true)
        setError(null)

        const phone = await getPhoneById(phoneId)

        setInitialValues({
          name: phone.name || "",
          price: phone.price || 0,
          description: phone.description || "",
          storage: phone.storage ? String(phone.storage) : "128",
          battery_health: phone.battery || "100%",
          period_of_use: phone.inUse || "Under 6 months",
          cosmetic_condition: phone.conditions || "Perfect",
          photo: phone.photo || null,
          author: phone.author || "",
        })
      } catch (err) {
        console.error("Error fetching phone:", err)
        setError("Failed to load phone details")
        toast.error("Failed to load phone details")
      } finally {
        setLoading(false)
      }
    }

    fetchPhone()
  }, [phoneId])

  const handleSubmit = async (values: SellFormValues) => {
    try {
      await updatePhone(phoneId, {
        name: values.name,
        price: Number(values.price),
        description: values.description,
        storage: Number(values.storage),
        battery: values.battery_health,
        inUse: values.period_of_use,
        conditions: values.cosmetic_condition,
        author:
          values.author?.trim() || initialValues?.author?.trim() || undefined,
        ...(typeof values.photo === "string" && values.photo.trim()
          ? { photo: values.photo.trim() }
          : {}),
        ...(values.photo instanceof File && { photo: values.photo }),
      })

      toast.success("Phone updated successfully!")
      router.push("/ads")
    } catch (err) {
      console.error("Error updating phone:", err)
      toast.error("Failed to update phone")
    }
  }

  if (loading) return <Loader />
  if (error) return <p>{error}</p>
  if (!initialValues) return null

  return (
    <div className={css.container}>
      <h2 className={css.title}>EDIT AD</h2>
      <PhoneForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  )
}

export default UpdatePhonePage
