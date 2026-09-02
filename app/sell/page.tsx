"use client"

import { ChangeEvent, useId, useState } from "react"
import Image from "next/image"
import { Formik, Form, Field } from "formik"
import css from "./SellPage.module.css"
import { CiCamera } from "react-icons/ci"

const MAX_FILE_SIZE = 1024 * 1024 // 1 MB

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

const SellPage = () => {
  const fieldId = useId()

  const [preview, setPreview] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState("")

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

  const handleSubmit = (
    values: SellFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    console.log(values)

    
    resetForm()

    setPreview(null)
    setPhotoError("")
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>CREATE AN AD</h2>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => {
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

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="8gb"
                        name="storage"
                        value="8gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="8gb" className={css.radioLabel}>
                        8 gb
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="16gb"
                        name="storage"
                        value="16gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="16gb" className={css.radioLabel}>
                        16 gb
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="32gb"
                        name="storage"
                        value="32gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="32gb" className={css.radioLabel}>
                        32 gb
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="64gb"
                        name="storage"
                        value="64gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="64gb" className={css.radioLabel}>
                        64 gb
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="128gb"
                        name="storage"
                        value="128gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="128gb" className={css.radioLabel}>
                        128 gb
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="256gb"
                        name="storage"
                        value="256gb"
                        className={css.radioInput}
                      />
                      <label htmlFor="256gb" className={css.radioLabel}>
                        256 gb
                      </label>
                    </div>
                  </div>

                  <div className={css.radioForm}>
                    <label className={css.label}>Battery Health</label>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="100"
                        name="battery_health"
                        value="100"
                        className={css.radioInput}
                      />
                      <label htmlFor="100" className={css.radioLabel}>
                        100%
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="85_99"
                        name="battery_health"
                        value="85_99"
                        className={css.radioInput}
                      />
                      <label htmlFor="85_99" className={css.radioLabel}>
                        85%–99%
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="below85"
                        name="battery_health"
                        value="below85"
                        className={css.radioInput}
                      />
                      <label htmlFor="below85" className={css.radioLabel}>
                        Below 85%
                      </label>
                    </div>
                  </div>

                  <div className={css.radioForm}>
                    <label className={css.label}>Period of Use</label>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="under6m"
                        name="period_of_use"
                        value="under6m"
                        className={css.radioInput}
                      />
                      <label htmlFor="under6m" className={css.radioLabel}>
                        Under 6 months
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="6_12m"
                        name="period_of_use"
                        value="6_12m"
                        className={css.radioInput}
                      />
                      <label htmlFor="6_12m" className={css.radioLabel}>
                        6–12 months
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="1_2y"
                        name="period_of_use"
                        value="1_2y"
                        className={css.radioInput}
                      />
                      <label htmlFor="1_2y" className={css.radioLabel}>
                        1–2 years
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="2y"
                        name="period_of_use"
                        value="2y"
                        className={css.radioInput}
                      />
                      <label htmlFor="2y" className={css.radioLabel}>
                        2+ years
                      </label>
                    </div>
                  </div>

                  <div className={css.radioForm}>
                    <label className={css.label}>Cosmetic Condition</label>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="perfect"
                        name="cosmetic_condition"
                        value="perfect"
                        className={css.radioInput}
                      />
                      <label htmlFor="perfect" className={css.radioLabel}>
                        Perfect
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="good"
                        name="cosmetic_condition"
                        value="good"
                        className={css.radioInput}
                      />
                      <label htmlFor="good" className={css.radioLabel}>
                        Good
                      </label>
                    </div>

                    <div className={css.radioOption}>
                      <Field
                        type="radio"
                        id="damaged"
                        name="cosmetic_condition"
                        value="damaged"
                        className={css.radioInput}
                      />
                      <label htmlFor="damaged" className={css.radioLabel}>
                        Damaged
                      </label>
                    </div>
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
          )
        }}
      </Formik>
    </div>
  )
}

export default SellPage
