<script setup lang="ts">
const { initProgress } = useProgress()
const { showRest } = useScreenTime()
onMounted(initProgress)
</script>

<template>
  <div class="app-shell">
    <!-- 背景装饰 -->
    <span class="deco cloud d1">☁️</span>
    <span class="deco cloud d2">☁️</span>
    <span class="deco cloud d3">☁️</span>
    <span class="deco rainbow">🌈</span>
    <span class="deco star s1">⭐</span>
    <span class="deco star s2">🎈</span>

    <main class="app-main">
      <slot />
    </main>

    <!-- 屏幕时长温馨提示 -->
    <Transition name="fade">
      <div v-if="showRest" class="rest-overlay" @click="showRest = false">
        <div class="rest-card">
          <div class="rest-emoji">👀</div>
          <div class="rest-title">小眼睛休息一下～</div>
          <div class="rest-sub">看看远处，眨眨眼，喝口水吧</div>
        </div>
      </div>
    </Transition>

    <AppTabBar />
  </div>
</template>

<style scoped>
.cloud { font-size: 54px; animation: float 6s ease-in-out infinite; }
.d1 { top: 6%; left: 4%; }
.d2 { top: 14%; right: 8%; font-size: 40px; animation-delay: 1.6s; }
.d3 { top: 46%; left: 2%; font-size: 30px; animation-delay: 3s; }
.rainbow { top: -18px; right: 3%; font-size: 66px; transform: rotate(12deg); }
.star { font-size: 26px; }
.s1 { bottom: 22%; left: 3%; animation: float 5s ease-in-out infinite; }
.s2 { bottom: 34%; right: 3%; animation: float 7s ease-in-out infinite; animation-delay: 1s; }

.rest-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(91, 75, 73, .25);
  backdrop-filter: blur(3px);
  display: flex; align-items: center; justify-content: center;
}
.rest-card {
  background: #fff; border-radius: var(--r-lg);
  border: 4px solid var(--yellow-soft);
  box-shadow: var(--shadow);
  padding: 34px 44px; text-align: center;
  animation: pop .35s ease-out;
}
.rest-emoji { font-size: 58px; animation: bounce 1.2s ease-in-out infinite; }
.rest-title { font-size: 22px; font-weight: 800; margin-top: 10px; }
.rest-sub { color: var(--sub); font-size: 14px; margin-top: 6px; }

.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
