<script setup lang="ts">
  import Calculator from '@/components/Calculator.vue'
  import CalculatorNote from '@/components/CalculatorNote.vue'
  import { ref } from 'vue'

  const toggleNote = ref(true)
</script>

<template>
  <div class="min-h-screen bg-cool-gray-800 flex justify-center items-center overflow-hidden">
    <div
      class="w-full max-w-[900px] grid grid-rows-2 md:(grid-cols-2 grid-rows-1) transition-transform"
    >
      <calculator class="z-1 mx-auto" @toggle="toggleNote = !toggleNote" />
      <calculator-note
        class="mx-auto transform transition-transform"
        :class="[
          toggleNote
            ? '-translate-y-[97%] md:(translate-y-0 -translate-x-[95%])'
            : '-translate-y-25 md:(translate-y-0 -translate-x-10)'
        ]"
      />
    </div>
  </div>
</template>
