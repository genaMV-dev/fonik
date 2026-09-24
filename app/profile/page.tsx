"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa"
import { RiLogoutBoxRLine } from "react-icons/ri"
import css from "./ProfilePage.module.css"
import {
  getCurrentUser,
  getMyPhones,
  logoutUser,
  PhoneItem,
  UserDTO,
} from "@/lib/api/api"
import { useAuthStore } from "@/lib/store/authStore"
import ProfileLoader from "@/components/ProfileLoader/ProfileLoader"

interface ExtendedUserDTO extends UserDTO {
  created_at?: string
}

const ProfilePage = () => {
  const [user, setUser] = useState<ExtendedUserDTO | null>(null)
  const [ads, setAds] = useState<PhoneItem[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userData, userAdsData] = await Promise.all([
          getCurrentUser(),
          getMyPhones(),
        ])

        setUser(userData as ExtendedUserDTO)
        setAds(userAdsData.phones)
      } catch (error) {
        console.error("Failed to load profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      useAuthStore.getState().clearAuth()
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className={css.container}>
        <ProfileLoader />
      </div>
    )
  }

  const previewAds = ads.slice(0, 3)

  const rawDate = user?.createdAt || user?.created_at
  const joinedDateFormatted = rawDate
    ? new Date(rawDate)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : "N/A"

  return (
    <div className={css.container}>
      <h1 className={css.title}>USER PROFILE</h1>

      <div className={css.card}>
        <div className={css.headerSection}>
          <div className={css.avatarWrapper}>
            <Image
              className={css.avatar}
              src={user?.avatar || "/placeholder.png"}
              alt="avatar"
              fill
              priority
            />
          </div>

          <div className={css.textInfo}>
            <h2 className={css.username}>{user?.username || "Gena"}</h2>
            <p className={css.email}>{user?.email || "genamush@gmail.com"}</p>
            <div className={css.joinedBadge}>
              <FaCalendarAlt size={18} />
              <span>JOINED: {joinedDateFormatted}</span>
            </div>
          </div>
        </div>

        <div className={css.mainContent}>
          <div className={css.settingsColumn}>
            <h3 className={css.sectionTitle}>Profile settings</h3>
            <div className={css.buttonsGroup}>
              <Link href="/profile/edit" className={css.changeProfileBtn}>
                <FaUserEdit size={20} />
                CHANGE PROFILE
              </Link>

              <button
                type="button"
                className={css.logoutBtn}
                onClick={handleLogout}
              >
                <RiLogoutBoxRLine size={20} />
                LOGOUT
              </button>
            </div>
          </div>

          <div className={css.adsColumn}>
            <h3 className={css.sectionTitle}>MY LISTINGS (ADS)</h3>

            {previewAds.length > 0 ? (
              <div className={css.adsGrid}>
                {previewAds.map((ad) => {
                  const imageUrl =
                    typeof ad.photo === "string" ? ad.photo : "/placeholder.png"

                  return (
                    <div key={ad._id} className={css.adCard}>
                      <div className={css.adImageWrapper}>
                        <Image
                          src={imageUrl}
                          alt={ad.name}
                          fill
                          className={css.adImage}
                        />
                      </div>
                      <div className={css.adInfo}>
                        <span className={css.adTitle}>{ad.name}</span>
                        <div className={css.adMeta}>
                          <span className={css.adPrice}>${ad.price}</span>
                          <span className={`${css.adStatus} ${css.active}`}>
                            active
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className={css.emptyAdsText}>You have no listings yet.</p>
            )}

            <div className={css.seeAllWrapper}>
              <Link href="/ads" className={css.seeAllLink}>
                SEE ALL MY ADS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
