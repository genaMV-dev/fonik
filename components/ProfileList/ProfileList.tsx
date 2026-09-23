"use client"

import { useEffect, useRef } from "react"
import css from "./ProfileList.module.css"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { MdModeEditOutline } from "react-icons/md"
import { FaRegUser } from "react-icons/fa"
import Link from "next/link"

interface ProfileListProps {
  onLogout: () => void
  onClose: () => void
}

const ProfileList = ({ onLogout, onClose }: ProfileListProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Якщо клік відбувся поза контейнером menuRef, закриваємо меню
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Додаємо слухача подій
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      // Прибираємо слухача при розмонтуванні
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={menuRef} className={css.container}>
      <ul className={css.profileList}>
        <li className={css.profileItem}>
          <Link href="/profile" onClick={onClose}>
            My profile
            <FaRegUser className={css.profileIcon} size={20} />
          </Link>
        </li>
        <li className={css.profileItem}>
          <Link href="/profile/edit" onClick={onClose}>
            Change profile
            <MdModeEditOutline className={css.editIcon} size={20} />
          </Link>
        </li>
        <li className={css.profileItem}>
          <button className={css.logoutBtn} type="button" onClick={onLogout}>
            <RiLogoutBoxRLine className={css.logoutIcon} size={20} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileList