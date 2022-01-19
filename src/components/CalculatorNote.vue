<script setup lang="ts">
  import CalculatorNoteItem from '@/components/CalculatorNoteItem.vue'
  import { useCalculateStore } from '@/store/calculateStore'
  import { computed, nextTick, onUpdated, ref, watch } from 'vue'

  const calculateStore = useCalculateStore()
  const { removeHistory, assignFromHistory, clearHistory } = calculateStore

  const isHistoryEmpty = computed(() => calculateStore.history.length === 0)

  const itemContainerRef = ref<HTMLElement>()

  watch(calculateStore.history, async () => {
    await nextTick()
    if (itemContainerRef.value) {
      itemContainerRef.value.scrollTop = itemContainerRef.value.scrollHeight
    }
  })
</script>

<template>
  <div
    class="aspect-3/5 relative w-full max-w-[450px] bg-gradient-to-r from-btn-blue-shadow via-btn-blue to-btn-blue-shadow rounded-3xl px-6 pt-36 pb-8 md:py-10"
  >
    <div
      class="aspect-3/5 w-full max-h-full flex flex-col justify-start items-center gap-1 overflow-y-auto no-scrollbar"
      ref="itemContainerRef"
    >
      <transition-group name="slide-fade">
        <calculator-note-item
          v-for="(h, i) in calculateStore.history"
          :ans="h.ans"
          :expression="h.expression"
          :key="h.id"
          @toCalc="assignFromHistory(i)"
          @remove="removeHistory(i)"
        />
      </transition-group>
    </div>
    <div class="absolute top-27 left-10 md:(top-auto bottom-2 left-15) flex items-center gap-2">
      <a
        class="text-white/10 hover:text-white"
        href="https://github.com/jojojhuang/simple-calculator"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>

      <button
        title="刪除全部"
        class="transition-colors"
        :class="[isHistoryEmpty ? 'text-white/10 cursor-default' : 'text-white']"
        @click="clearHistory"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active {
    transition: transform 0.1s ease-in-out;
  }
  .slide-fade-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .slide-fade-enter-from {
    transform: translateY(50%);
  }
  .slide-fade-leave-to {
    transform: translateY(-50%);
    opacity: 0;
  }

  @media (min-width: 768px) {
    .slide-fade-enter-active {
      transition: transform 0.1s ease-in-out;
    }
    .slide-fade-leave-active {
      transition: all 0.2s ease-in-out;
    }
    .slide-fade-enter-from {
      transform: translateX(50%);
    }
    .slide-fade-leave-to {
      transform: translateX(-50%);
      opacity: 0;
    }
  }
</style>
