<script setup lang="ts">
import { stages, words } from '~/data'

const { learned } = useProgress()

const stageStats = computed(() =>
  stages.map((s) => {
    const list = words.filter(w => w.stage === s.stage)
    const done = list.filter(w => learned.value.includes(w.id)).length
    return { ...s, total: list.length, done }
  }),
)

const entries = [
  { to: '/flashcards', label: '闪卡学习', emoji: '🃏', color: 'blue' },
  { to: '/games', label: '游戏中心', emoji: '🎮', color: 'yellow' },
  { to: '/songs', label: '儿歌库', emoji: '🎵', color: 'green' },
  { to: '/review', label: '复习乐园', emoji: '🌟', color: 'purple' },
]
</script>

<template>
  <div>
    <!-- 顶部问候 -->
    <section class="hero card t-pink">
      <div class="hero-emojis">
        <span class="h1">🐰</span>
        <span class="h2">🌟</span>
        <span class="h3">🎈</span>
      </div>
      <h1 class="hero-title">Ann宝宝英语乐园</h1>
      <p class="hero-tip">⏰ 每天玩 5-10 分钟，听一听就好啦</p>
    </section>

    <!-- 学习阶段 -->
    <h2 class="sec-title">🌈 学习阶段</h2>
    <div class="stage-grid">
      <NuxtLink
        v-for="s in stageStats" :key="s.stage"
        :to="`/flashcards?stage=${s.stage}`"
        class="stage-card card"
        :class="`t-${s.color}`"
      >
        <div class="stage-emoji">{{ s.emoji }}</div>
        <div class="stage-name">阶段{{ ['一', '二', '三', '四'][s.stage - 1] }} · {{ s.name }}</div>
        <div class="stage-weeks">{{ s.weeks }} · {{ s.total }} 词</div>
        <div class="progress">
          <div class="progress-bar" :style="{ width: `${(s.done / s.total) * 100}%` }" />
        </div>
        <div class="stage-done">已听 {{ s.done }} / {{ s.total }}</div>
      </NuxtLink>
    </div>

    <!-- 快捷入口 -->
    <h2 class="sec-title">🎠 快乐入口</h2>
    <div class="entry-grid">
      <NuxtLink
        v-for="e in entries" :key="e.to" :to="e.to"
        class="entry card"
        :class="`t-${e.color}`"
      >
        <span class="entry-emoji">{{ e.emoji }}</span>
        <span class="entry-label">{{ e.label }}</span>
      </NuxtLink>
    </div>

    <!-- 家长入口（儿童模式低调隐藏） -->
    <footer class="parent-entry">
      <NuxtLink to="/parent">家长入口</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 34px 24px 28px;
  text-align: center;
  background: linear-gradient(135deg, var(--pink-soft), var(--yellow-soft));
  overflow: hidden;
}
.hero-emojis span { position: absolute; font-size: 34px; animation: float 4s ease-in-out infinite; }
.h1 { left: 8%; top: 22%; }
.h2 { right: 10%; top: 30%; animation-delay: 1.2s; }
.h3 { right: 22%; bottom: 12%; animation-delay: 2.2s; }
.hero-title { margin: 0; font-size: clamp(26px, 5vw, 34px); font-weight: 900; color: var(--pink-deep); }
.hero-tip { margin: 10px 0 0; color: var(--sub); font-weight: 700; font-size: 15px; }

.sec-title { font-size: 19px; font-weight: 800; margin: 26px 4px 12px; }

.stage-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
@media (min-width: 720px) { .stage-grid { grid-template-columns: repeat(4, 1fr); } }

.stage-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 18px 16px;
  text-decoration: none; color: inherit;
  transition: transform .15s;
}
.stage-card:active { transform: scale(.96); }
.stage-emoji { font-size: 40px; line-height: 1; }
.stage-name { font-weight: 800; font-size: 15px; margin-top: 10px; }
.stage-weeks { color: var(--sub); font-size: 12px; margin-top: 3px; }
.progress {
  width: 100%; height: 10px; margin-top: 12px;
  background: var(--cs); border-radius: 999px; overflow: hidden;
}
.progress-bar {
  height: 100%; border-radius: 999px;
  background: var(--c);
  transition: width .6s ease;
}
.stage-done { color: var(--sub); font-size: 12px; margin-top: 6px; font-weight: 700; }

.entry-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
@media (max-width: 560px) { .entry-grid { grid-template-columns: repeat(2, 1fr); } }
.entry {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 20px 8px;
  text-decoration: none; color: inherit;
  transition: transform .15s;
}
.entry:active { transform: scale(.94); }
.entry-emoji { font-size: 42px; line-height: 1; }
.entry-label { font-weight: 800; font-size: 14px; }

.parent-entry { text-align: center; margin-top: 34px; }
.parent-entry a { color: var(--sub); opacity: .45; font-size: 12px; text-decoration: none; }
</style>
