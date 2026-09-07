<script setup lang="ts">
import { parentTasks, parentTips, songs, stages, words } from '~/data'

/* 家长专区：数字验证门 + 统计 + 每周计划 + 任务清单 + 避坑提醒 */
const { learned, favs, watched, taskDone, toggleTask, resetAll, stageProgress } = useProgress()
const { todayMinutes } = useScreenTime()

const unlocked = useState('bes-parent-unlocked', () => false)

// 验证门：简单加法
const gateA = ref(0)
const gateB = ref(0)
const gateOptions = ref<number[]>([])
function newGate() {
  gateA.value = 1 + Math.floor(Math.random() * 5)
  gateB.value = 1 + Math.floor(Math.random() * 5)
  const ans = gateA.value + gateB.value
  gateOptions.value = [...new Set([ans, ans + 1, ans + 2, Math.max(2, ans - 1)])].sort(() => Math.random() - .5).slice(0, 4)
  if (!gateOptions.value.includes(ans)) gateOptions.value[0] = ans
}
function tryGate(v: number) {
  if (v === gateA.value + gateB.value) unlocked.value = true
  else newGate()
}
newGate()

const totalLearned = computed(() => learned.value.length)
const totalWords = words.length
const stageStats = computed(() =>
  stages.map((s) => {
    const list = words.filter(w => w.stage === s.stage)
    return { ...s, total: list.length, pct: stageProgress(words, s.stage) }
  }),
)

function doReset() {
  if (confirm('确定清空所有学习记录吗？此操作不可恢复。')) resetAll()
}
</script>

<template>
  <div>
    <!-- 验证门 -->
    <div v-if="!unlocked" class="gate card t-blue">
      <div class="gate-emoji">🔐</div>
      <div class="gate-title">家长验证</div>
      <p class="gate-sub">请回答下面的问题，进入家长专区</p>
      <div class="gate-q">{{ gateA }} + {{ gateB }} = ?</div>
      <div class="gate-opts">
        <button v-for="o in gateOptions" :key="o" class="chip t-blue" @click="tryGate(o)">{{ o }}</button>
      </div>
      <NuxtLink to="/" class="gate-back">← 返回首页</NuxtLink>
    </div>

    <!-- 家长内容 -->
    <template v-else>
      <h1 class="page-title">👨‍👩‍👧 家长专区</h1>
      <p class="page-sub">所有数据仅保存在本机浏览器，不会上传</p>

      <!-- 统计 -->
      <section class="card sec t-blue">
        <h2 class="sec-title">📊 学习统计</h2>
        <div class="stat-row">
          <div class="stat">
            <div class="stat-num">{{ totalLearned }}<small> / {{ totalWords }}</small></div>
            <div class="stat-label">已听单词</div>
          </div>
          <div class="stat">
            <div class="stat-num">{{ favs.length }}</div>
            <div class="stat-label">收藏单词</div>
          </div>
          <div class="stat">
            <div class="stat-num">{{ watched.length }}<small> / {{ songs.length }}</small></div>
            <div class="stat-label">儿歌浏览</div>
          </div>
          <div class="stat">
            <div class="stat-num">{{ todayMinutes }}<small> 分钟</small></div>
            <div class="stat-label">今日屏幕时间</div>
          </div>
        </div>
        <div v-for="s in stageStats" :key="s.stage" class="stage-row">
          <span class="stage-label">{{ s.emoji }} 阶段{{ ['一', '二', '三', '四'][s.stage - 1] }}</span>
          <div class="progress"><div class="progress-bar" :style="{ width: `${s.pct * 100}%` }" /></div>
          <span class="stage-pct">{{ Math.round(s.pct * 100) }}%</span>
        </div>
      </section>

      <!-- 每周计划 -->
      <section class="card sec t-green">
        <h2 class="sec-title">📅 每周启蒙计划</h2>
        <div v-for="p in stages" :key="p.stage" class="plan-row">
          <span class="plan-emoji">{{ p.emoji }}</span>
          <div>
            <div class="plan-name">{{ p.name }} · {{ p.weeks }}</div>
            <div class="plan-goal">{{ p.goal }}</div>
          </div>
        </div>
      </section>

      <!-- 亲子任务 -->
      <section class="card sec t-orange">
        <h2 class="sec-title">✅ 亲子拓展任务</h2>
        <label v-for="t in parentTasks" :key="t.id" class="task" :class="{ done: taskDone.includes(t.id) }">
          <input type="checkbox" :checked="taskDone.includes(t.id)" @change="toggleTask(t.id)">
          <span class="task-check">{{ taskDone.includes(t.id) ? '✅' : '⬜' }}</span>
          <span class="task-emoji">{{ t.emoji }}</span>
          <span class="task-text">{{ t.text }}</span>
        </label>
      </section>

      <!-- 避坑提醒 -->
      <section class="card sec t-pink">
        <h2 class="sec-title">⚠️ 启蒙避坑提醒</h2>
        <div v-for="tip in parentTips" :key="tip.title" class="tip-row">
          <span class="tip-emoji">{{ tip.emoji }}</span>
          <div>
            <div class="tip-title">{{ tip.title }}</div>
            <div class="tip-text">{{ tip.text }}</div>
          </div>
        </div>
      </section>

      <button class="reset" @click="doReset">🗑 清空学习记录</button>
    </template>
  </div>
</template>

<style scoped>
.gate {
  max-width: 440px; margin: 40px auto 0;
  padding: 40px 28px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center;
}
.gate-emoji { font-size: 56px; }
.gate-title { font-size: 22px; font-weight: 900; }
.gate-sub { color: var(--sub); font-size: 14px; margin: 0; }
.gate-q { font-size: 40px; font-weight: 900; color: var(--blue-deep); margin: 8px 0; }
.gate-opts { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.gate-back { color: var(--sub); font-size: 13px; margin-top: 10px; text-decoration: none; }

.sec { padding: 20px; margin-bottom: 16px; }
.sec-title { font-size: 17px; font-weight: 800; margin: 0 0 14px; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
@media (max-width: 560px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
.stat { text-align: center; background: var(--cs); border-radius: var(--r-md); padding: 12px 6px; }
.stat-num { font-size: 22px; font-weight: 900; color: var(--cd); }
.stat-num small { font-size: 12px; font-weight: 700; }
.stat-label { color: var(--sub); font-size: 12px; font-weight: 700; margin-top: 3px; }

.stage-row { display: flex; align-items: center; gap: 12px; margin: 8px 0; }
.stage-label { width: 92px; font-size: 13px; font-weight: 700; flex: none; }
.progress { flex: 1; height: 12px; background: var(--cs); border-radius: 999px; overflow: hidden; }
.progress-bar { height: 100%; background: var(--c); border-radius: 999px; transition: width .6s; }
.stage-pct { width: 44px; text-align: right; color: var(--sub); font-size: 12px; font-weight: 800; }

.plan-row { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 2px dashed var(--line); }
.plan-row:last-child { border-bottom: none; }
.plan-emoji { font-size: 28px; line-height: 1.2; }
.plan-name { font-weight: 800; font-size: 14px; }
.plan-goal { color: var(--sub); font-size: 13px; margin-top: 3px; }

.task { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; cursor: pointer; }
.task input { display: none; }
.task-check { font-size: 18px; line-height: 1.4; }
.task-emoji { font-size: 18px; line-height: 1.4; }
.task-text { font-size: 14px; line-height: 1.5; }
.task.done .task-text { color: var(--sub); text-decoration: line-through; }

.tip-row { display: flex; gap: 12px; align-items: flex-start; padding: 9px 0; }
.tip-emoji { font-size: 24px; line-height: 1.2; }
.tip-title { font-weight: 800; font-size: 14px; }
.tip-text { color: var(--sub); font-size: 13px; margin-top: 2px; }

.reset {
  display: block; margin: 10px auto 30px;
  color: #d46a6a; font-size: 13px; font-weight: 700;
  padding: 10px 22px; border-radius: 999px;
  background: #fff; border: 2px solid #f5d5d5;
}
</style>
