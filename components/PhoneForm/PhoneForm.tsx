"use client"

import { ChangeEvent, useId, useState } from "react"
import Image from "next/image"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { CiCamera } from "react-icons/ci"
import css from "./PhoneForm.module.css"
import * as Yup from "yup"
import { BATTERY, CONDITIONS, INUSE, STORAGE } from "@/lib/api/api"

const MAX_FILE_SIZE = 1024 * 1024

const PhoneSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Too short!")
    .max(48, "Too long!")
    .required("Required"),
  description: Yup.string()
    .trim()
    .min(10, "Too short!")
    .max(4000, "Too long!")
    .required("Required"),
  photo: Yup.mixed<File | string>().required("Required"),
  price: Yup.number().min(0).integer().required("Required"),
  storage: Yup.string().oneOf(STORAGE.map(String)).required("Required"),
  battery_health: Yup.string().oneOf(BATTERY).required("Required"),
  period_of_use: Yup.string().oneOf(INUSE).required("Required"),
  cosmetic_condition: Yup.string().oneOf(CONDITIONS).required("Required"),
})

export interface SellFormValues {
  name: string
  price: number
  description: string
  storage: string
  battery_health: string
  period_of_use: string
  cosmetic_condition: string
  photo: File | string | null
}

interface PhoneFormProps {
  initialValues: SellFormValues
  onSubmit: (
    values: SellFormValues,
    formikHelpers: FormikHelpers<SellFormValues>,
  ) => void | Promise<void>
}

const PhoneForm = ({ initialValues, onSubmit }: PhoneFormProps) => {
  const fieldId = useId()
  const [preview, setPreview] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState("")

  const handleSubmit = async (
    values: SellFormValues,
    formikHelpers: FormikHelpers<SellFormValues>,
  ) => {
    await onSubmit(values, formikHelpers)
    setPreview(null)
    setPhotoError("")
  }

  const renderRadioOptions = (
    name: keyof Pick<
      SellFormValues,
      "storage" | "battery_health" | "period_of_use" | "cosmetic_condition"
    >,
    options: [string, string][],
  ) =>
    options.map(([value, label]) => (
      <div className={css.radioOption} key={value}>
        <Field
          type="radio"
          id={`${fieldId}-${name}-${value}`}
          name={name}
          value={value}
          className={css.radioInput}
        />
        <label
          htmlFor={`${fieldId}-${name}-${value}`}
          className={css.radioLabel}
        >
          {label}
        </label>
      </div>
    ))

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={PhoneSchema}
      validateOnMount
    >
      {({ setFieldValue, errors, submitCount }) => {
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0]
          setPhotoError("")

          if (!file) return

          if (!file.type.startsWith("image/")) {
            setPhotoError("Only images are allowed.")
            setFieldValue("photo", null)
            setPreview(null)
            return
          }

          if (file.size > MAX_FILE_SIZE) {
            setPhotoError("Maximum file size is 1 MB.")
            setFieldValue("photo", null)
            setPreview(null)
            return
          }

          setFieldValue("photo", file)
          const reader = new FileReader()
          reader.onloadend = () => setPreview(reader.result as string)
          reader.readAsDataURL(file)
        }

        return (
          <>
            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <p className={css.error}>Please complete all required fields.</p>
            )}
            <Form className={css.form}>
              <div className={css.inputsColumn}>
                <label className={css.textLabel} htmlFor={`${fieldId}-name`}>
                  Name
                </label>
                <Field
                  className={css.textInput}
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                />

                <label className={css.textLabel} htmlFor={`${fieldId}-price`}>
                  Price
                </label>
                <Field
                  className={css.textInput}
                  type="number"
                  name="price"
                  id={`${fieldId}-price`}
                />

                <label
                  className={css.textLabel}
                  htmlFor={`${fieldId}-description`}
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  className={css.textarea}
                  name="description"
                  id={`${fieldId}-description`}
                />

                <div className={css.radioWrapper}>
                  <div className={css.radioForm}>
                    <label className={css.label}>Storage</label>
                    {renderRadioOptions("storage", [
                      ["8", "8 gb"],
                      ["16", "16 gb"],
                      ["32", "32 gb"],
                      ["64", "64 gb"],
                      ["128", "128 gb"],
                      ["256", "256 gb"],
                    ])}
                  </div>
                  <div className={css.radioForm}>
                    <label className={css.label}>Battery Health</label>
                    {renderRadioOptions("battery_health", [
                      ["100%", "100%"],
                      ["85%-99%", "85%–99%"],
                      ["Below 85%", "Below 85%"],
                    ])}
                  </div>
                  <div className={css.radioForm}>
                    <label className={css.label}>Period of Use</label>
                    {renderRadioOptions("period_of_use", [
                      ["Under 6 months", "Under 6 months"],
                      ["6-12 months", "6–12 months"],
                      ["1-2 years", "1–2 years"],
                      ["2+ years", "2+ years"],
                    ])}
                  </div>
                  <div className={css.radioForm}>
                    <label className={css.label}>Cosmetic Condition</label>
                    {renderRadioOptions("cosmetic_condition", [
                      ["Perfect", "Perfect"],
                      ["Good", "Good"],
                      ["Damaged", "Damaged"],
                    ])}
                  </div>
                </div>

                <button className={css.submit} type="submit">
                  SELL
                </button>
              </div>

              <div className={css.wrapper}>
                <input
                  type="file"
                  id={`${fieldId}-image`}
                  accept="image/*"
                  className={css.hiddenInput}
                  onChange={handleFileChange}
                />
                <label
                  htmlFor={`${fieldId}-image`}
                  className={`${css.uploadLabel} ${preview ? css.hasPreview : ""}`}
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      className={css.previewImage}
                      width={580}
                      height={374}
                    />
                  ) : (
                    <CiCamera className={css.cameraIcon} size={140} />
                  )}
                </label>
                {photoError && <p className={css.error}>{photoError}</p>}
              </div>
            </Form>
          </>
        )
      }}
    </Formik>
  )
}

export default PhoneForm
