<script setup lang="ts">
  const props = defineProps<{ ans: string; expression: string }>()
  const emit = defineEmits(['remove', 'toCalc'])
  import { usePermission, useClipboard, autoResetRef } from '@vueuse/core'
  const { isSupported, copy } = useClipboard()

  usePermission('clipboard-read')
  usePermission('clipboard-write')

  const isCopied = autoResetRef(false, 1000)
  const clickCopy = () => {
    if (!isSupported) return

    copy(props.ans)
    isCopied.value = true
  }
</script>

<template>
  <div
    class="relative w-full text-white font-teko flex flex-col justify-end select-none rounded-2xl hover:bg-black/20 px-4 py-1 group"
  >
    <div class="expr text-3xl text-right">{{ expression }}</div>
    <div class="ans text-5xl text-right">{{ ans }}</div>
    <div
      class="absolute group-hover:flex ml-6 justify-start items-center h-full w-full gap-2 hidden"
    >
      <button
        class="rounded-full w-12 h-12 hover:bg-white/10 border-2 border-white/20 active:border-white flex justify-center items-center md:transform md:-rotate-90"
        @click="emit('toCalc')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 stroke-white/40 active:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </button>
      <button
        class="rounded-full w-12 h-12 hover:bg-white/10 border-2 border-white/20 active:border-white flex justify-center items-center"
        @click="emit('remove')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 stroke-white/40 active:stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <button
        class="rounded-full w-12 h-12 hover:bg-white/10 border-2 border-white/20 flex justify-center items-center"
        :class="{ 'border-white': isCopied }"
        @click="clickCopy"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 stroke-white/40"
          :class="{ 'stroke-white transition-colors duration-75': isCopied }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="
              isCopied
                ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            "
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s linear;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .expr::after {
    content: '=';
  }
</style>
