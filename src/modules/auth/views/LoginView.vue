<template>
  <div>

    <h1 class="text-2xl font-semibold mb-4">Login</h1>

    <form @submit.prevent="onLogin">
      <div class="mb-4">
        <label for="email" class="block text-gray-600">Correo</label>
        <input
          v-model="email"
          ref="emailInputRef"
          type="text"
          id="email"
          name="email"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder-gray-400 text-gray-900 bg-white"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-600">Contraseña</label>
        <input
          v-model="password"
          ref="passwordInputRef"
          type="password"
          id="password"
          name="password"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div class="mb-4 flex items-center">
        <input
          v-model="rememberMe"
          type="checkbox"
          id="remember"
          name="remember"
          class="text-blue-500"
        />
        <label for="remember" class="text-gray-600 ml-2">
          Recordar usuario
        </label>
      </div>

      <div class="mb-6 text-blue-500">
        <a href="#" class="hover:underline">¿Olvidaste la contraseña?</a>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Ingresar
      </button>
    </form>

    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'register' }" class="hover:underline">
        Crear cuenta aquí
      </RouterLink>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const onLogin = async () => {
  if (email.value === '') {
    return emailInputRef.value?.focus();
  }
  if (password.value.length < 6) {
    return passwordInputRef.value?.focus();
  }
  if (rememberMe.value) {
    localStorage.setItem('email', email.value);
  } else {
    localStorage.removeItem('email');
  }
  const ok = await authStore.login(email.value, password.value);
  if (ok) return;
  toast.error('Usuario/Contraseña no son correctos');
};

watchEffect(() => {
  const savedEmail = localStorage.getItem('email');
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.value = true;
  }
});
</script>