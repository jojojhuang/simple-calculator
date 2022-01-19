<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useCalculateStore } from '@/store/calculateStore'

  const { expression, ans, error } = storeToRefs(useCalculateStore())
</script>

<template>
  <div class="screen relative rounded-3xl bg-[#1e2129]">
    <i
      v-if="!error"
      class="w-3 h-[2px] absolute left-auto top-auto bottom-1/15 right-5 bg-white animate-pulse"
    />
    <div
      class="overflow-hidden text-right h-full flex flex-col items-end"
      :class="[error ? 'justify-center' : 'justify-end']"
    >
      <span v-if="!error" class="select-none whitespace-pre pr-5 text-white text-7xl font-teko">
        {{ ans }}
      </span>
      <span
        v-else
        class="text-red-500 text-6xl place-self-center font-teko select-none"
        data-test="error"
      >
        Invalid expression
      </span>
      <span
        v-if="!error"
        class="select-none whitespace-pre pr-9 text-white/40 text-4xl font-teko"
        data-test="text"
      >
        {{ expression }}
      </span>
    </div>
  </div>
</template>

<style scoped>
  .screen {
    box-shadow: inset 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  }
</style>
