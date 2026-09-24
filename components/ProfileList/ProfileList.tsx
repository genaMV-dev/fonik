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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={menuRef} className={css.container}>
      <ul className={css.profileList}>
        <li className={css.profileItem}>
          <Link href="/profile" onClick={onClose}>
            <span>My profile</span>
            <FaRegUser className={css.profileIcon} size={20} />
          </Link>
        </li>
        <li className={css.profileItem}>
          <Link href="/profile/edit" onClick={onClose}>
            <span>Change profile</span>
            <MdModeEditOutline className={css.editIcon} size={20} />
          </Link>
        </li>
        <li className={css.profileItem}>
          <button className={css.logoutBtn} type="button" onClick={onLogout}>
            <span>Logout</span>
            <RiLogoutBoxRLine className={css.logoutIcon} size={20} />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileList