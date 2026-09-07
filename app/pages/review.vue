<script setup lang="ts">
import type { Word } from '~/data'
import { words } from '~/data'

/* 复习模块：随机抽卡 / 收藏复习 / 复习闯关（无分数只有鼓励） */
const { speakEn } = useSpeech()
const { markLearned, favs } = useProgress()

const mode = ref<'idle' | 'play' | 'done'>('idle')
const stageSel = ref(0)
const TOTAL = 10

const qIndex = ref(0)
const current = ref<Word | null>(null)
const options = ref<Word[]>([])
const answered = ref(false)
const celebrate = ref(0)
const doneCelebrate = ref(0)

const pool = computed(() =>
  words
    .filter(w => (w.emoji || w.color) && !w.emojis)
    .filter(w => !stageSel.value || w.stage === stageSel.value),
)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5)
}

function nextQ() {
  if (qIndex.value >= TOTAL) {
    mode.value = 'done'
    doneCelebrate.value++
    return
  }
  const p = shuffle(pool.value)
  if (p.length < 4) return
  current.value = p[0]
  options.value = shuffle([p[0], p[1], p[2], p[3]])
  answered.value = false
  nextTick(() => speakEn(current.value!.en))
}

function start() {
  qIndex.value = 0
  mode.value = 'play'
  nextQ()
}

function pick(w: Word) {
  if (answered.value || !current.value) return
  if (w.id === current.value.id) {
    answered.value = true
    markLearned(w.id)
    celebrate.value++
    setTimeout(() => {
      qIndex.value++
      nextQ()
    }, 1500)
  }
}
</script>

<template>
  <div>
    <h1 class="page-title">🌟 复习乐园</h1>
    <p class="page-sub">温故而知新，答对只有掌声没有惩罚</p>

    <!-- 模式入口 -->
    <template v-if="mode === 'idle'">
      <div class="mode-list">
        <NuxtLink to="/flashcards?mode=single&shuffle=1" class="mode-card card t-pink">
          <span class="m-emoji">🎲</span>
          <span class="m-info">
            <span class="m-name">随机抽卡</span>
            <span class="m-desc">打乱顺序翻闪卡，像抽盲盒一样</span>
          </span>
          <span class="m-arrow">➜</span>
        </NuxtLink>

        <NuxtLink to="/flashcards?mode=single&cat=fav" class="mode-card card t-orange">
          <span class="m-emoji">💖</span>
          <span class="m-info">
            <span class="m-name">复习收藏（{{ favs.length }} 个）</span>
            <span class="m-desc">只看宝宝感兴趣的心愿单</span>
          </span>
          <span class="m-arrow">➜</span>
        </NuxtLink>

        <button class="mode-card card t-purple" @click="start">
          <span class="m-emoji">🏆</span>
          <span class="m-info">
            <span class="m-name">复习闯关</span>
            <span class="m-desc">连续 10 题听音识图，全是鼓励动画</span>
          </span>
          <span class="m-arrow">➜</span>
        </button>
      </div>

      <div class="range-pick">
        <span class="rp-label">闯关范围：</span>
        <button class="chip t-blue" :class="{ active: stageSel === 0 }" @click="stageSel = 0">全部</button>
        <button v-for="s in 4" :key="s" class="chip" :class="[{ active: stageSel === s }, `t-${['pink', 'blue', 'green', 'purple'][s - 1]}`]" @click="stageSel = s">
          阶段{{ ['一', '二', '三', '四'][s - 1] }}
        </button>
      </div>
    </template>

    <!-- 闯关中 -->
    <template v-else-if="mode === 'play' && current">
      <div class="quiz-head">
        <button class="quit" @click="mode = 'idle'">✖ 退出</button>
        <span class="quiz-count">第 {{ qIndex + 1 }} 题</span>
      </div>
      <div class="play-row">
        <button class="speaker t-blue" @click="speakEn(current.en)">🔊</button>
      </div>
      <div class="grid">
        <WordCard
          v-for="w in options" :key="w.id"
          :word="w" size="sm"
          class="opt"
          :class="{ glow: answered && w.id === current.id }"
          @play="() => pick(w)"
        />
      </div>
      <CelebrationBurst :trigger="celebrate" size="sm" />
    </template>

    <!-- 完成 -->
    <div v-else-if="mode === 'done'" class="done card t-pink">
      <div class="done-emoji">🍰</div>
      <div class="done-title">闯关完成！</div>
      <div class="done-sub">你真棒，明天再来玩吧 💪</div>
      <button class="btn-big t-pink" @click="mode = 'idle'">回到复习乐园</button>
    </div>

    <CelebrationBurst :trigger="doneCelebrate" size="lg" text="闯关成功!" />
  </div>
</template>

<style scoped>
.mode-list { display: flex; flex-direction: column; gap: 14px; margin-top: 6px; }
.mode-card {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 20px; text-align: left;
  text-decoration: none; color: inherit;
  transition: transform .15s;
}
.mode-card:active { transform: scale(.97); }
.m-emoji { font-size: 38px; line-height: 1; width: 64px; height: 64px; flex: none; display: flex; align-items: center; justify-content: center; background: var(--cs); border-radius: 20px; }
.m-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.m-name { font-size: 17px; font-weight: 800; }
.m-desc { color: var(--sub); font-size: 13px; }
.m-arrow { color: var(--cd); font-size: 20px; font-weight: 900; }

.range-pick { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
.rp-label { color: var(--sub); font-size: 14px; font-weight: 700; }

.quiz-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.quit { color: var(--sub); font-size: 14px; font-weight: 700; }
.quiz-count { color: var(--sub); font-weight: 800; font-size: 14px; }

.play-row { margin: 8px 0 16px; }
.speaker {
  font-size: 32px; width: 80px; height: 80px; border-radius: 50%;
  background: var(--cs);
  box-shadow: 0 8px 0 var(--cd), var(--shadow);
  transition: transform .12s, box-shadow .12s;
  animation: float 2.6s ease-in-out infinite;
}
.speaker:active { transform: translateY(5px); box-shadow: 0 3px 0 var(--cd); animation: none; }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 640px; }
@media (min-width: 720px) { .grid { grid-template-columns: repeat(4, 1fr); } }
.opt { padding: 16px 8px; }
.opt.glow { border-color: var(--green); box-shadow: 0 0 0 6px var(--green-soft), var(--shadow); animation: pop .35s ease-out; }

.done {
  max-width: 460px; margin: 40px auto 0;
  padding: 46px 24px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center;
}
.done-emoji { font-size: 76px; animation: bounce 1.4s ease-in-out infinite; }
.done-title { font-size: 26px; font-weight: 900; color: var(--pink-deep); }
.done-sub { color: var(--sub); margin-bottom: 12px; }
</style>
