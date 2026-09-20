"use client"

import { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import css from "./LoginPage.module.css"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { LoginDTO, loginUser } from "@/lib/api/api"
import { AxiosError } from "axios"
import { useAuthStore } from "@/lib/store/authStore"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required field"),
  password: Yup.string().required("Required field"),
})

const LoginPage = () => {
  
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (
    values: LoginDTO,
    { setSubmitting, resetForm }: FormikHelpers<LoginDTO>,
  ): Promise<void> => {
    setServerError(null)

    try {
      const user = await loginUser(values)

      if (user) {
        setUser(user)
        resetForm()
        router.push("/")
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Login error"

      setServerError(errorMessage)
      console.error("Login error:", errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  
  if (user) return null

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Login</h2>

            {serverError && <div className={css.error}>{serverError}</div>}

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
                autoComplete="current-password"
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
              {isSubmitting ? "Loading..." : "Sign in"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage