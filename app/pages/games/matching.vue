<script setup lang="ts">
import type { Word } from '~/data'
import { words } from '~/data'

/* 图片配对：翻牌配对（图-图），配对成功有鼓励动画 */
const { speakEn } = useSpeech()
const { markLearned } = useProgress()

interface Card { w: Word, key: string, flipped: boolean, matched: boolean }

const range = ref(0)
const cards = ref<Card[]>([])
const lock = ref(false)
const firstIdx = ref<number | null>(null)
const done = ref(false)
const celebrate = ref(0)
const mini = ref(0)

const pool = computed(() =>
  words.filter(w => (w.emoji || w.color) && !w.emojis).filter(w => !range.value || w.stage === range.value),
)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5)
}

function deal() {
  const picks = shuffle(pool.value).slice(0, 4)
  if (picks.length < 4) return
  cards.value = shuffle([...picks, ...picks]).map((w, i) => ({ w, key: `${w.id}-${i}`, flipped: false, matched: false }))
  firstIdx.value = null
  done.value = false
  lock.value = false
}

function flip(i: number) {
  const c = cards.value[i]
  if (lock.value || c.matched || c.flipped) return
  c.flipped = true
  speakEn(c.w.en)
  markLearned(c.w.id)

  if (firstIdx.value === null) {
    firstIdx.value = i
    return
  }
  const f = cards.value[firstIdx.value]
  if (f.w.id === c.w.id) {
    f.matched = c.matched = true
    firstIdx.value = null
    mini.value++
    if (cards.value.every(x => x.matched)) {
      done.value = true
      celebrate.value++
      setTimeout(deal, 2200)
    }
  }
  else {
    lock.value = true
    const fi = firstIdx.value
    setTimeout(() => {
      cards.value[fi].flipped = false
      c.flipped = false
      lock.value = false
      firstIdx.value = null
    }, 900)
  }
}

watch(range, deal)
onMounted(deal)
</script>

<template>
  <div>
    <div class="top"><NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink></div>
    <h1 class="page-title">🃏 图片配对</h1>
    <p class="page-sub">翻开卡片，找出两只好朋友</p>

    <div class="chip-row no-bar">
      <button class="chip t-blue" :class="{ active: range === 0 }" @click="range = 0">全部</button>
      <button v-for="s in 4" :key="s" class="chip" :class="[{ active: range === s }, `t-${['pink', 'blue', 'green', 'purple'][s - 1]}`]" @click="range = s">
        阶段{{ ['一', '二', '三', '四'][s - 1] }}
      </button>
    </div>

    <div class="grid">
      <button
        v-for="(c, i) in cards" :key="c.key"
        class="match-card"
        :class="{ flipped: c.flipped || c.matched, matched: c.matched }"
        @click="flip(i)"
      >
        <span v-if="c.flipped || c.matched" class="face">{{ c.w.emoji || '' }}</span>
        <span v-else class="face back">❓</span>
      </button>
    </div>

    <p v-if="done" class="done-tip">全部配对成功，再来一局！🎉</p>
    <CelebrationBurst :trigger="celebrate" size="lg" text="全对啦!" />
    <CelebrationBurst :trigger="mini" size="sm" :voice="false" />
  </div>
</template>

<style scoped>
.top { margin-bottom: 6px; }
.back { color: var(--sub); text-decoration: none; font-size: 14px; font-weight: 700; }

.grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  max-width: 720px; margin-top: 8px;
}
@media (max-width: 560px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

.match-card {
  aspect-ratio: 1;
  border-radius: var(--r-lg);
  background: linear-gradient(135deg, var(--purple), var(--pink));
  border: 4px solid #fff;
  box-shadow: var(--shadow);
  display: flex; align-items: center; justify-content: center;
  transition: transform .2s;
}
.match-card:active { transform: scale(.94); }
.match-card.flipped { background: #fff; border-color: var(--purple-soft); }
.match-card.matched {
  background: var(--green-soft);
  border-color: var(--green);
  animation: pop .35s ease-out;
}
.face { font-size: clamp(46px, 10vw, 76px); line-height: 1; }
.face.back { color: #fff; font-size: clamp(36px, 8vw, 60px); }

.done-tip { text-align: center; color: var(--green-deep); font-weight: 800; margin-top: 18px; }
</style>
