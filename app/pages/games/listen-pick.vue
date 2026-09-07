<script setup lang="ts">
import type { Word } from '~/data'
import { words } from '~/data'

/* 听音识图：播放发音，点击匹配图片；答错无任何提示 */
const { speakEn } = useSpeech()
const { markLearned } = useProgress()

const range = ref(0) // 0=全部
const current = ref<Word | null>(null)
const options = ref<Word[]>([])
const answered = ref(false)
const celebrate = ref(0)

const pool = computed(() =>
  words
    .filter(w => w.emoji || w.color || w.text)
    .filter(w => !w.emojis)
    .filter(w => !range.value || w.stage === range.value),
)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5)
}

function nextQ() {
  const p = shuffle(pool.value)
  if (p.length < 4) return
  current.value = p[0]
  options.value = shuffle([p[0], p[1], p[2], p[3]])
  answered.value = false
  nextTick(() => speakEn(current.value!.en))
}

function replay() {
  if (current.value) speakEn(current.value.en)
}

function pick(w: Word) {
  if (answered.value || !current.value) return
  if (w.id === current.value.id) {
    answered.value = true
    markLearned(w.id)
    celebrate.value++
    setTimeout(nextQ, 1600)
  }
  // 答错：没有任何提示，继续点就好
}

watch(range, nextQ)
onMounted(nextQ)
</script>

<template>
  <div>
    <div class="top">
      <NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink>
    </div>
    <h1 class="page-title">🔊 听音识图</h1>
    <p class="page-sub">听一听，点一点正确的图</p>

    <div class="chip-row no-bar">
      <button class="chip t-blue" :class="{ active: range === 0 }" @click="range = 0">全部</button>
      <button v-for="s in 4" :key="s" class="chip" :class="[{ active: range === s }, `t-${['pink', 'blue', 'green', 'purple'][s - 1]}`]" @click="range = s">
        阶段{{ ['一', '二', '三', '四'][s - 1] }}
      </button>
    </div>

    <div class="play-row">
      <button class="speaker t-blue" @click="replay">🔊</button>
      <span class="hint">{{ current?.zh ? '听！是哪个呀？' : '' }}</span>
    </div>

    <div v-if="current" class="grid">
      <WordCard
        v-for="w in options" :key="w.id"
        :word="w" size="sm"
        class="opt"
        :class="{ glow: answered && w.id === current.id }"
        @play="() => pick(w)"
      />
    </div>

    <CelebrationBurst :trigger="celebrate" size="lg" />
  </div>
</template>

<style scoped>
.top { margin-bottom: 6px; }
.back { color: var(--sub); text-decoration: none; font-size: 14px; font-weight: 700; }

.play-row { display: flex; align-items: center; gap: 16px; margin: 10px 0 18px; }
.speaker {
  font-size: 34px;
  width: 84px; height: 84px; border-radius: 50%;
  background: var(--cs);
  box-shadow: 0 8px 0 var(--cd), var(--shadow);
  transition: transform .12s, box-shadow .12s;
  animation: float 2.6s ease-in-out infinite;
}
.speaker:active { transform: translateY(5px) scale(.98); box-shadow: 0 3px 0 var(--cd); animation: none; }
.hint { color: var(--sub); font-weight: 700; font-size: 15px; }

.grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  max-width: 640px;
}
@media (min-width: 720px) { .grid { grid-template-columns: repeat(4, 1fr); } }

.opt { padding: 16px 8px; }
.opt.glow {
  border-color: var(--green);
  box-shadow: 0 0 0 6px var(--green-soft), var(--shadow);
  animation: pop .35s ease-out;
}
</style>
