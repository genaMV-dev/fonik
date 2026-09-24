"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaUpload, FaCheck, FaTimes } from "react-icons/fa"
import axios from "axios"
import css from "./EditProfilePage.module.css"
import { getCurrentUser, updateUserProfile, UserDTO } from "@/lib/api/api"

const EditProfilePage = () => {
  const [username, setUsername] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("/placeholder.png")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user: UserDTO = await getCurrentUser()
        setUsername(user.username || "")
        if (user.avatar) {
          setAvatarPreview(user.avatar)
        }
      } catch (err) {
        console.error("Failed to load user:", err)
        setError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await updateUserProfile({
        username,
        file: avatarFile,
      })
      router.push("/profile")
    } catch (err: unknown) {
      console.error("Update error:", err)

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update profile")
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to update profile")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className={css.container}>Loading...</div>
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>EDIT PROFILE</h1>

      <div className={css.card}>
        <form onSubmit={handleSubmit} className={css.form}>
          {error && <div className={css.errorMessage}>{error}</div>}

          <div className={css.formContent}>
            {/* Секція аватарки */}
            <div className={css.avatarSection}>
              <h3 className={css.sectionTitle}>Profile Picture</h3>
              <div className={css.avatarWrapper}>
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  fill
                  priority
                  className={css.avatar}
                />
              </div>

              <label htmlFor="avatar-upload" className={css.uploadBtn}>
                <FaUpload size={16} />
                CHANGE PHOTO
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={css.fileInput}
              />
            </div>

            {/* Секція імені користувача */}
            <div className={css.infoSection}>
              <div className={css.inputGroup}>
                <label htmlFor="username" className={css.label}>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className={css.input}
                  minLength={2}
                  maxLength={32}
                  required
                />
                <p className={css.hint}>
                  Username can only contain letters, numbers, and underscores (max 32 characters).
                </p>
              </div>

              {/* Кнопки збереження та скасування */}
              <div className={css.actionsGroup}>
                <button
                  type="submit"
                  disabled={submitting}
                  className={css.saveBtn}
                >
                  <FaCheck size={16} />
                  {submitting ? "SAVING..." : "SAVE CHANGES"}
                </button>

                <Link href="/profile" className={css.cancelBtn}>
                  <FaTimes size={16} />
                  CANCEL
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfilePage