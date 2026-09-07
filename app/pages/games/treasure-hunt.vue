<script setup lang="ts">
import type { Word } from '~/data'
import { words } from '~/data'

/* 情景寻宝：播放 Where is...? 在场景中找到目标物品 */
const { speakEn } = useSpeech()
const { markLearned } = useProgress()

const range = ref(0)
const target = ref<Word | null>(null)
const items = ref<Word[]>([])
const answered = ref(false)
const celebrate = ref(0)

const SLOTS = [
  { left: '6%', top: '16%' }, { left: '40%', top: '10%' }, { left: '72%', top: '18%' },
  { left: '12%', top: '58%' }, { left: '44%', top: '52%' }, { left: '74%', top: '56%' },
]

const pool = computed(() =>
  words.filter(w => w.emoji && !w.emojis && !w.color && !w.text).filter(w => !range.value || w.stage === range.value),
)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5)
}

function nextQ() {
  const p = shuffle(pool.value)
  if (p.length < 6) return
  target.value = p[0]
  items.value = shuffle([p[0], ...p.slice(1, 6)])
  answered.value = false
  nextTick(() => ask())
}

function ask() {
  if (target.value) speakEn(`Where is the ${target.value.en}?`)
}

function pick(w: Word) {
  if (answered.value || !target.value) return
  if (w.id === target.value.id) {
    answered.value = true
    markLearned(w.id)
    speakEn(`Yes! This is the ${w.en}!`)
    celebrate.value++
    setTimeout(nextQ, 1900)
  }
}

watch(range, nextQ)
onMounted(nextQ)
</script>

<template>
  <div>
    <div class="top"><NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink></div>
    <h1 class="page-title">🔍 情景寻宝</h1>
    <p class="page-sub">Where is it? 把它找出来！</p>

    <div class="chip-row no-bar">
      <button class="chip t-blue" :class="{ active: range === 0 }" @click="range = 0">全部</button>
      <button v-for="s in 4" :key="s" class="chip" :class="[{ active: range === s }, `t-${['pink', 'blue', 'green', 'purple'][s - 1]}`]" @click="range = s">
        阶段{{ ['一', '二', '三', '四'][s - 1] }}
      </button>
    </div>

    <div class="ask-row">
      <button class="speaker t-purple" @click="ask">🔊</button>
      <span v-if="target" class="ask-zh">找一找：<b>{{ target.zh }}</b></span>
    </div>

    <div class="scene card t-yellow">
      <button
        v-for="(w, i) in items" :key="w.id"
        class="treasure"
        :style="{ left: SLOTS[i].left, top: SLOTS[i].top }"
        :class="{ found: answered && w.id === target?.id }"
        @click="pick(w)"
      >
        {{ w.emoji }}
      </button>
    </div>

    <CelebrationBurst :trigger="celebrate" size="lg" text="找到啦!" />
  </div>
</template>

<style scoped>
.top { margin-bottom: 6px; }
.back { color: var(--sub); text-decoration: none; font-size: 14px; font-weight: 700; }

.ask-row { display: flex; align-items: center; gap: 16px; margin: 10px 0 16px; }
.speaker {
  font-size: 30px;
  width: 76px; height: 76px; border-radius: 50%;
  background: var(--cs);
  box-shadow: 0 7px 0 var(--cd), var(--shadow);
  transition: transform .12s, box-shadow .12s;
  animation: float 2.8s ease-in-out infinite;
}
.speaker:active { transform: translateY(4px); box-shadow: 0 3px 0 var(--cd); animation: none; }
.ask-zh { color: var(--sub); font-size: 15px; }
.ask-zh b { color: var(--ink); }

.scene {
  position: relative;
  height: 380px;
  max-width: 720px;
  background: linear-gradient(160deg, var(--yellow-soft), var(--green-soft));
  overflow: hidden;
}
@media (max-width: 560px) { .scene { height: 320px; } }

.treasure {
  position: absolute;
  font-size: clamp(48px, 9vw, 72px);
  line-height: 1;
  padding: 10px;
  border-radius: 20px;
  transition: transform .15s, background .2s;
}
.treasure:active { transform: scale(.9); }
.treasure.found {
  background: #fff;
  box-shadow: 0 0 0 6px var(--green-soft), var(--shadow);
  animation: pop .4s ease-out;
}
</style>
