import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse, User } from "../interfaces"

interface ReisterError {
  ok: false,
  message: string
}
interface ReisterSuccess {
  ok: true,
  user: User,
  token: string
}


export const reisterAction =
  async (fullName: string, email: string, password: string): Promise<ReisterError | ReisterSuccess> => {
    try {
      const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
        fullName,
        email,
        password
      })

      return {
        ok: true,
        user: data.user,
        token: data.token
      }
    } catch (error) {
      console.log(error);
      
      return {
        ok: false,
        message: 'No se puedo crear el usuario'
      }
    }
  }
