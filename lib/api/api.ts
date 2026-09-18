import axios from "axios"
import { AuthUser } from "../store/authStore";

export interface RegisterDTO {
  username: string 
  email: string
  password: string
}

export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterResponse {
  user: AuthUser
  status: number
  message: string
  data: {
    user: User
    accessToken?: string
  }
}

export interface LogoutResponse {
  message: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
})

export const registerUser = async (
  userData: RegisterDTO,
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", userData)
  return data
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>("/auth/logout");
  return response.data;
};