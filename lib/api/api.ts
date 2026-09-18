import axios from "axios"
import { AuthUser } from "../store/authStore"

export interface RegisterDTO {
  username: string
  email: string
  password: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface LogoutResponse {
  message: string
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
})

export const registerUser = async (
  userData: RegisterDTO,
): Promise<AuthUser> => {
  const { data } = await api.post<AuthUser>("/auth/register", userData)
  return data
}

export const loginUser = async (userData: LoginDTO): Promise<AuthUser> => {
  const { data } = await api.post<AuthUser>("/auth/login", userData)
  return data
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>("/auth/logout")
  return response.data
}