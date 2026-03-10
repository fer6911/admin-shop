import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse, User } from "../interfaces"
import { isAxiosError } from "axios"

interface LoginError {
  ok: false,
  message: string
}
interface LoginSuccess {
  ok: true,
  user: User,
  token: string
}

export const loginAction =
  async (mail: string, password: string): Promise<LoginError | LoginSuccess> => {
    try {
      const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email: mail, password })
      return {
        ok: true,
        user: data.user,
        token: data.token
      }
    } catch (error) {
      if ((isAxiosError(error) && error.response?.status)) {
        if (error.response?.status === 401) {
          return {
            ok: false,
            message: 'Usuario o Contraseña incorrectos'
          }
        }
      }
      throw new Error('No se puedo realizar la peticion, intente de nuevo')
    }
  }
