<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button class="btn btn-outline btn-primary" :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })">
      <ArrowLeftIcon :disabled="page === 1" />
      <span>
        Anteriores
      </span>
    </button>
    <button class="btn btn-outline btn-primary" @click="$router.push({ query: { page: page + 1 } })"
      :disabled="hasMoreData"><span>
        Siguientes
      </span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@/icons/arrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

interface Props {
  page: number,
  hasMoreData: boolean
}

defineProps<Props>()
</script>