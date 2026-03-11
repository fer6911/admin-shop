import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // const userId = localStorage.getItem('userId')
  // localStorage.setItem('lastPath', to.path)

  // if (!userId) {
  //   return next({
  //     name: 'login'
  //   })
  // }

  // console.log(to);

  const authStore = useAuthStore()

  await authStore.checkAuthStatus()
  return authStore.authStatus === AuthStatus.Authenticated ? next({name: 'home'}) : next()
  
  // return next()
};

export default isNotAuthenticatedGuard;