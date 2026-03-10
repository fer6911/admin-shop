<template>
  <div>

    <h1 class="text-2xl font-semibold mb-4">Nueva Cuenta</h1>

    <form @submit.prevent="onRegister">

      <div class="mb-4">
        <label for="fullName" class="block text-gray-600">Nombre</label>
        <input
          v-model="fullName"
          ref="fullnameInputRef"
          type="text"
          id="fullName"
          name="fullName"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-600">Correo</label>
        <input
          v-model="email"
          ref="emailInputRef"
          type="email"
          id="email"
          name="email"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
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

      <div class="mb-6 text-blue-500">
        <a href="#" class="hover:underline">¿Olvidaste tu contraseña?</a>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Registrarse
      </button>

    </form>

    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'login' }" class="hover:underline">
        Ingresar por aquí
      </RouterLink>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const fullnameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const fullName = ref('');
const email = ref('');
const password = ref('');

const onRegister = async () => {
  if (fullName.value.length < 6) {
    return fullnameInputRef.value?.focus();
  }
  if (email.value === '') {
    return emailInputRef.value?.focus();
  }
  if (password.value.length < 6) {
    return passwordInputRef.value?.focus();
  }

  const { ok, message } = await authStore.register(fullName.value, email.value, password.value);
  if (ok) return;
  toast.error(message);
};

</script>