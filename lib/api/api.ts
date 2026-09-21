import axios from "axios"
import { AuthUser } from "../store/authStore"

export const STORAGE = [8, 16, 32, 64, 128, 256]
export const BATTERY = ["100%", "85%-99%", "Below 85%"]
export const INUSE = ["Under 6 months", "6-12 months", "1-2 years", "2+ years"]
export const CONDITIONS = ["Perfect", "Good", "Damaged"]

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

export interface CreatePhoneDTO {
  name: string
  description: string
  price: number
  photo: File | string
  author: string
  storage?: number
  battery?: string
  inUse?: string
  conditions?: string
}

export interface UpdatePhoneDTO {
  name?: string
  description?: string
  price?: number
  photo?: File | string
  author?: string
  storage?: number
  battery?: string
  inUse?: string
  conditions?: string
}

export interface PhoneItem extends CreatePhoneDTO {
  _id: string
  userId: string
  createdAt?: string
  updatedAt?: string
}

export interface GetAllPhonesParams {
  page?: number
  perPage?: number
}

export interface GetAllPhonesResponse {
  page: number
  perPage: number
  totalPhones: number
  totalPages: number
  phones: PhoneItem[]
}

export interface AddToBasketResponse {
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

export const refreshUserSession = async (): Promise<void> => {
  await api.post("/auth/refresh")
}

export const createAd = async (values: CreatePhoneDTO): Promise<PhoneItem> => {
  const formData = new FormData()

  formData.append("name", values.name)
  formData.append("description", values.description)
  formData.append("price", String(values.price))
  formData.append("photo", values.photo)
  formData.append("author", values.author)

  if (values.storage) formData.append("storage", String(values.storage))
  if (values.battery) formData.append("battery", values.battery)
  if (values.inUse) formData.append("inUse", values.inUse)
  if (values.conditions) formData.append("conditions", values.conditions)

  const { data } = await api.post<PhoneItem>("/phones", formData)
  return data
}

export const updatePhone = async (
  phoneId: string,
  values: UpdatePhoneDTO,
): Promise<PhoneItem> => {
  const payload: Record<string, string | number> = {}

  if (values.name) payload.name = values.name
  if (values.description) payload.description = values.description
  if (values.price !== undefined) payload.price = Number(values.price)

  const author = values.author?.trim()
  if (author && author.length >= 2) {
    payload.author = author
  }

  if (values.storage !== undefined) {
    payload.storage = values.storage
  }
  if (values.battery) payload.battery = values.battery
  if (values.inUse) payload.inUse = values.inUse
  if (values.conditions) payload.conditions = values.conditions

  if (values.photo instanceof File) {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    formData.append("photo", values.photo)

    const { data } = await api.patch<PhoneItem>(`/phones/${phoneId}`, formData)
    return data
  }

  const { data } = await api.patch<PhoneItem>(`/phones/${phoneId}`, payload)
  return data
}

export const getAllPhones = async (
  params?: GetAllPhonesParams,
): Promise<GetAllPhonesResponse> => {
  const { data } = await api.get<GetAllPhonesResponse>("/phones", {
    params,
  })
  return data
}

export const getMyPhones = async (
  params?: GetAllPhonesParams,
): Promise<GetAllPhonesResponse> => {
  const { data } = await api.get<GetAllPhonesResponse>("/phones/my", {
    params,
  })
  return data
}

export const getPhoneById = async (phoneId: string): Promise<PhoneItem> => {
  const { data } = await api.get<PhoneItem>(`/phones/${phoneId}`)
  return data
}

export const addToBasket = async (
  phoneId: string,
): Promise<AddToBasketResponse> => {
  const { data } = await api.post<AddToBasketResponse>(
    `/phones/${phoneId}/basket`,
  )
  return data
}
