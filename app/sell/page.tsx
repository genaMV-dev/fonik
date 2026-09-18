"use client"

import { useState } from "react"
import { FormikHelpers } from "formik"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { isAxiosError } from "axios"

import PhoneForm, { SellFormValues } from "@/components/PhoneForm/PhoneForm"
import { createAd } from "@/lib/api/api"
import { useAuthStore } from "@/lib/store/authStore"
import css from "./SellPage.module.css"

export default function SellPage() {
  const username = useAuthStore((state) => state.user?.username ?? "Unknown")
  const queryClient = useQueryClient()
  const router = useRouter()
  const [submitError, setSubmitError] = useState("")

  function getErrorMessage(error: unknown) {
    if (isAxiosError<{ message?: string }>(error)) {
      return (
        error.response?.data?.message ??
        "Unable to publish the article. Please try again."
      )
    }

    if (error instanceof Error) {
      return error.message
    }

    return "Unable to publish the article. Please try again."
  }

  const initialValues: SellFormValues = {
    name: "",
    price: 0,
    description: "",
    storage: "",
    battery_health: "",
    period_of_use: "",
    cosmetic_condition: "",
    photo: null,
  }

  const mutation = useMutation({
    mutationFn: (newAd: Parameters<typeof createAd>[0]) => createAd(newAd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] })
      router.push("/ads")
    },
    onError: (error) => {
      setSubmitError(getErrorMessage(error))
    },
  })

  const handleSubmit = async (
    values: SellFormValues,
    { resetForm }: FormikHelpers<SellFormValues>,
  ) => {
    if (!values.photo || typeof values.photo === "string") return

    setSubmitError("")

    try {
      await mutation.mutateAsync({
        name: values.name,
        description: values.description,
        price: Number(values.price),
        author: username,
        photo: values.photo,
        battery: values.battery_health || undefined,
        storage: values.storage
          ? Number.parseInt(values.storage, 10)
          : undefined,
        conditions: values.cosmetic_condition || undefined,
        inUse: values.period_of_use || undefined,
      })

      resetForm()
    } catch {
      // Помилка обробляється у mutation onError
    }
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>CREATE AN AD</h2>
      {submitError && <p className={css.error}>{submitError}</p>}
      <PhoneForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  )
}
