<script setup lang="ts">
import type { Word } from '~/data'
import { words } from '~/data'

/* 相同图片连连看：卡片全部正面朝上，点两张相同的即配对成功（适合 3 岁） */
const { speakEn } = useSpeech()
const { markLearned } = useProgress()

interface Card { w: Word, key: string, matched: boolean }

const range = ref(0)
const cards = ref<Card[]>([])
const firstIdx = ref<number | null>(null)
const wrongPair = ref<number[]>([])
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
  cards.value = shuffle([...picks, ...picks]).map((w, i) => ({ w, key: `${w.id}-${i}`, matched: false }))
  firstIdx.value = null
  wrongPair.value = []
  done.value = false
}

function tap(i: number) {
  const c = cards.value[i]
  // 抖动反馈期间不接受点击，避免三连点错乱
  if (wrongPair.value.length || c.matched) return
  if (firstIdx.value === i) { firstIdx.value = null; return } // 再点自己=取消选中

  speakEn(c.w.en)
  markLearned(c.w.id)

  if (firstIdx.value === null) {
    firstIdx.value = i
    return
  }

  const f = cards.value[firstIdx.value]
  if (f.w.id === c.w.id) {
    // 配对成功：两张一起点亮
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
    // 不相同：两张轻轻摇一摇，然后取消选中
    wrongPair.value = [firstIdx.value, i]
    setTimeout(() => {
      wrongPair.value = []
      firstIdx.value = null
    }, 550)
  }
}

watch(range, deal)
onMounted(deal)
</script>

<template>
  <div>
    <div class="top"><NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink></div>
    <h1 class="page-title">🔗 相同图片连连看</h1>
    <p class="page-sub">点两张一样的，把它们连起来</p>

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
        :class="{ selected: firstIdx === i, matched: c.matched, wrong: wrongPair.includes(i) }"
        @click="tap(i)"
      >
        <span class="face">{{ c.w.emoji || '' }}</span>
      </button>
    </div>

    <p v-if="done" class="done-tip">全部连好啦，再来一局！🎉</p>
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
  background: #fff;
  border: 4px solid var(--purple-soft);
  box-shadow: var(--shadow);
  display: flex; align-items: center; justify-content: center;
  transition: transform .2s, border-color .2s, background .2s;
}
.match-card:active { transform: scale(.94); }
.match-card.selected {
  border-color: var(--purple);
  background: var(--purple-soft);
  transform: scale(1.06);
}
.match-card.matched {
  background: var(--green-soft);
  border-color: var(--green);
  animation: pop .35s ease-out;
}
.match-card.wrong { animation: shake .45s ease-in-out; }
.face { font-size: clamp(46px, 10vw, 76px); line-height: 1; }

.done-tip { text-align: center; color: var(--green-deep); font-weight: 800; margin-top: 18px; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-4px); }
}
</style>
