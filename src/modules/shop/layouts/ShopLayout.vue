<template>
  <!-- Header Navbar -->
  <top-menu />

  <!-- Routerview -->
  <router-view />

  <!-- Footer -->
  <custom-footer />
</template>
<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';

</script>
