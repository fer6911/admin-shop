import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { checkAuthAction, loginAction, reisterAction } from '../actions'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {

  //Authenticated, unAuthenticated, Checking
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password)
      if (!loginResp.ok) {
        logout()
        return false
      }

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated

      return true

    } catch (error) {
      console.log(error);
      return logout()

    }
  }

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResp = await reisterAction(fullName, email, password)

      if (!registerResp.ok) {
        logout()
        return {
          ok: false,
          message: 'No se pudo registrar el usuario'
        }
      }

      user.value = registerResp.user
      token.value = registerResp.token
      authStatus.value = AuthStatus.Authenticated
      return {
        ok: true,
        message: 'Usuario registrado correctamente'
      }

    } catch (error) {
      console.log(error)
      logout()

      return {
        ok: false,
        message: 'Error inesperado en el registro'
      }
    }
  }

  const logout = () => {
    authStatus.value = AuthStatus.UnAuthenticated
    user.value = undefined
    token.value = ''
    return false
  }
  
const checkAuthStatus = async():Promise<boolean> => {
  try {
    const statusResp = await checkAuthAction()

    if(!statusResp.ok){
      logout()
      return false
    }

    authStatus.value = AuthStatus.Authenticated
    user.value =  statusResp.user
    token.value = statusResp.token
    return true
  } catch (error) {
    console.log(error);
    
    logout()
    return false
  }
}

  return {
    authStatus,
    user,
    token,

    //getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    
    isAdmin: computed(()=> user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    // actions
    login,
    logout,
    register,
    checkAuthStatus
  }
})
