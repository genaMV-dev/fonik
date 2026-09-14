"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import css from "./registerPage.module.css"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { RegisterDTO, registerUser } from "@/lib/api/api"
import { AxiosError } from "axios"
import { useAuthStore } from "@/lib/store/authStore";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name is too short")
    .max(32, "Name is too long")
    .required("Required field"),
  email: Yup.string().email("Invalid email").required("Required field"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters long.")
    .max(64, "Password is too long")
    .required("Required field"),
})

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  
  const setUser = useAuthStore((state) => state.setUser)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (
    values: RegisterDTO,
    { setSubmitting, resetForm }: FormikHelpers<RegisterDTO>,
  ): Promise<void> => {
    try {
      const data = await registerUser(values)
      console.log("Registration successful:", data)

      
      const user = data.user || data
      setUser(user)

      resetForm()
      router.push("/")
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Registration error"
      console.error("Registration error:", errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Register</h2>

            {/* Поле USERNAME */}
            <div className={css.fieldWrapper}>
              <label htmlFor="username" className={css.label}>
                Name
              </label>

              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className={css.input}
                placeholder="Enter your name"
              />

              <ErrorMessage
                name="username"
                component="span"
                className={css.error}
              />
            </div>

            {/* Поле EMAIL */}
            <div className={css.fieldWrapper}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>

              <Field
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className={css.input}
                placeholder="example@mail.com"
              />

              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            {/* Поле PASSWORD */}
            <div className={css.fieldWrapper}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>

              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="new-password"
                className={css.input}
                placeholder="••••••••"
              />

              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />

              <button
                className={css.buttonEye}
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOff className={css.eye} size={25} />
                ) : (
                  <IoEye className={css.eye} size={25} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css.submitBtn}
            >
              {isSubmitting ? "Loading..." : "Sign up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterPage
