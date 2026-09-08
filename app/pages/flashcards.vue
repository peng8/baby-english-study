<script setup lang="ts">
import type { Word } from '~/data'
import { categories, words } from '~/data'

const route = useRoute()
const { speakEn } = useSpeech()
const { favs, markLearned, toggleFav, isFav } = useProgress()

const stage = ref(Number(route.query.stage) || 1)
const cat = ref<string>((route.query.cat as string) || 'all')
const mode = ref<'grid' | 'single'>((route.query.mode as string) === 'single' ? 'single' : 'grid')
const shuffleMode = route.query.shuffle === '1'

const auto = ref(false)
const idx = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const stageCats = computed(() => categories.filter(c => c.stage === stage.value))

const displayList = ref<Word[]>([])
function rebuild() {
  let list = words.filter(w => w.stage === stage.value)
  if (cat.value === 'fav') list = list.filter(w => favs.value.includes(w.id))
  else if (cat.value !== 'all') list = list.filter(w => w.category === cat.value)
  if (shuffleMode) list = [...list].sort(() => Math.random() - .5)
  displayList.value = list
  idx.value = 0
}
watch([stage, cat], rebuild, { immediate: true })

function playCurrent() {
  const w = displayList.value[idx.value]
  if (!w) return
  speakEn(w.en)
  markLearned(w.id)
}

/* 点击卡片：发音 + 有实物照片的词弹出照片弹窗加深记忆 */
const photoWord = ref<Word | null>(null)

function tapWord(w: Word) {
  markLearned(w.id)
  speakEn(w.en)
  if (w.photo) photoWord.value = w
}

watch(idx, () => { if (mode.value === 'single') playCurrent() })
watch(mode, (m) => { if (m === 'single') playCurrent() })

function next() { if (displayList.value.length) idx.value = (idx.value + 1) % displayList.value.length }
function prev() { if (displayList.value.length) idx.value = (idx.value - 1 + displayList.value.length) % displayList.value.length }

watch(auto, (v) => {
  if (timer) { clearInterval(timer); timer = null }
  if (v && displayList.value.length) {
    playCurrent()
    timer = setInterval(next, 3400)
  }
})
onUnmounted(() => { if (timer) clearInterval(timer) })

const current = computed(() => displayList.value[idx.value])

function pickStage(s: number) {
  stage.value = s
  cat.value = 'all'
}
</script>

<template>
  <div>
    <h1 class="page-title">🃏 闪卡学习</h1>
    <p class="page-sub">点一点卡片，听一听单词</p>

    <!-- 阶段筛选 -->
    <div class="chip-row no-bar">
      <button
        v-for="s in 4" :key="s"
        class="chip" :class="[{ active: stage === s }, `t-${['pink', 'blue', 'green', 'purple'][s - 1]}`]"
        @click="pickStage(s)"
      >阶段{{ ['一', '二', '三', '四'][s - 1] }}</button>
      <button class="chip t-pink" :class="{ active: cat === 'fav' }" @click="cat = cat === 'fav' ? 'all' : 'fav'">💖 收藏</button>
    </div>

    <!-- 分类筛选 -->
    <div class="chip-row no-bar">
      <button class="chip t-blue" :class="{ active: cat === 'all' }" @click="cat = 'all'">全部</button>
      <button
        v-for="c in stageCats" :key="c.key"
        class="chip" :class="[{ active: cat === c.key }, `t-${c.color}`]"
        @click="cat = c.key"
      >{{ c.emoji }} {{ c.name }}</button>
    </div>

    <!-- 视图切换 -->
    <div class="view-toggle">
      <button class="chip t-purple" :class="{ active: mode === 'grid' }" @click="mode = 'grid'">🧩 浏览</button>
      <button class="chip t-purple" :class="{ active: mode === 'single' }" @click="mode = 'single'">📖 学习</button>
      <button v-if="mode === 'single'" class="chip t-orange" :class="{ active: auto }" @click="auto = !auto">
        {{ auto ? '⏸ 停止轮播' : '▶ 自动轮播' }}
      </button>
    </div>

    <!-- 空状态 -->
    <div v-if="!displayList.length" class="empty card">
      <div class="empty-emoji">💛</div>
      <p>这里还没有单词哦，去别的分类看看吧</p>
    </div>

    <!-- 网格浏览模式 -->
    <div v-else-if="mode === 'grid'" class="grid">
      <WordCard
        v-for="w in displayList" :key="w.id"
        :word="w" size="sm" show-fav :fav="isFav(w.id)"
        @play="() => tapWord(w)"
        @fav="() => toggleFav(w.id)"
      />
    </div>

    <!-- 单卡学习模式 -->
    <template v-else-if="current">
      <div class="single-wrap">
        <WordCard
          :key="current.id"
          :word="current" size="lg" show-fav :fav="isFav(current.id)"
          class="single-card"
          @play="() => tapWord(current)"
          @fav="() => toggleFav(current.id)"
        />
        <p class="counter">{{ idx + 1 }} / {{ displayList.length }}</p>
        <div class="ctrl">
          <button class="ctrl-btn t-blue" @click="prev">⬅️</button>
          <button class="ctrl-play t-pink" @click="playCurrent">🔊</button>
          <button class="ctrl-btn t-blue" @click="next">➡️</button>
        </div>
        <p class="tip">点击大卡片也能发音哦</p>
      </div>
    </template>

    <!-- 实物照片弹窗：看真实照片，加深记忆 -->
    <Transition name="fade">
      <div v-if="photoWord" class="photo-overlay" @click.self="photoWord = null">
        <div class="photo-card">
          <button class="photo-close" @click="photoWord = null">✕</button>
          <span class="spark s1">✨</span>
          <span class="spark s2">⭐</span>

          <div class="photo-frame">
            <img :src="photoWord.photo" :alt="photoWord.en" class="photo-img">
          </div>

          <div class="photo-en">{{ photoWord.en }}</div>
          <div class="photo-zh">{{ photoWord.zh }}</div>

          <button class="photo-say" @click="speakEn(photoWord.en)">🔊 再听一遍</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.view-toggle { display: flex; gap: 10px; margin-bottom: 14px; }

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 560px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 900px) { .grid { grid-template-columns: repeat(4, 1fr); } }

.single-wrap { display: flex; flex-direction: column; align-items: center; }
.single-card {
  width: min(420px, 100%);
  min-height: 340px;
  padding: 26px 20px;
  animation: pop .3s ease-out;
}
@media (min-width: 720px) { .single-card { min-height: 400px; } }

.counter { color: var(--sub); font-weight: 700; margin: 14px 0 6px; font-size: 14px; }

.ctrl { display: flex; align-items: center; gap: 22px; }
.ctrl-btn {
  font-size: 26px;
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--cs);
  transition: transform .12s;
}
.ctrl-btn:active { transform: scale(.9); }
.ctrl-play {
  font-size: 32px;
  width: 84px; height: 84px;
  border-radius: 50%;
  background: var(--cs);
  box-shadow: 0 8px 0 var(--cd), var(--shadow);
  transition: transform .12s, box-shadow .12s;
}
.ctrl-play:active { transform: translateY(5px); box-shadow: 0 3px 0 var(--cd); }
.tip { color: var(--sub); font-size: 13px; margin-top: 14px; }

.empty { padding: 50px 20px; text-align: center; color: var(--sub); }
.empty-emoji { font-size: 52px; margin-bottom: 10px; }

/* ---- 实物照片弹窗 ---- */
.photo-overlay {
  position: fixed; inset: 0; z-index: 260;
  background: rgba(91, 75, 73, .45);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.photo-card {
  position: relative;
  width: min(88vw, 420px);
  max-height: 90dvh;
  background: #fff;
  border: 4px solid var(--pink-soft);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow);
  padding: 16px 16px 18px;
  animation: pop .35s ease-out;
  display: flex; flex-direction: column; align-items: center;
}
.photo-close {
  position: absolute; top: 10px; right: 10px; z-index: 2;
  width: 38px; height: 38px; border-radius: 999px;
  background: var(--yellow-soft); color: var(--ink);
  font-size: 17px; font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  transition: transform .15s;
}
.photo-close:active { transform: scale(.88); }

/* 照片相框：白边圆角，轻微呼吸缩放 */
.photo-frame {
  width: 100%;
  border-radius: var(--r-md);
  background: #fff;
  padding: 8px;
  box-shadow: 0 4px 14px rgba(170, 130, 95, .18), 0 0 0 3px var(--pink-soft);
  overflow: hidden;
}
.photo-img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: calc(var(--r-md) - 4px);
  animation: photo-breathe 3.2s ease-in-out infinite;
}
@keyframes photo-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.045); }
}

/* 闪烁的小星星装饰 */
.spark {
  position: absolute; z-index: 2;
  font-size: 22px;
  animation: spark-twinkle 1.8s ease-in-out infinite;
}
.s1 { top: 18px; left: 18px; }
.s2 { top: 52px; right: 52px; font-size: 17px; animation-delay: .6s; }
@keyframes spark-twinkle {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: .9; }
  50% { transform: scale(1.35) rotate(18deg); opacity: .45; }
}

.photo-en {
  margin-top: 14px;
  font-weight: 800; color: var(--cd);
  font-size: clamp(28px, 6vw, 38px);
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
  letter-spacing: 1px;
  animation: bounce 1.6s ease-in-out infinite;
  text-shadow: 0 3px 0 var(--pink-soft);
}
.photo-zh { color: var(--sub); font-weight: 700; font-size: 15px; margin-top: 2px; }

.photo-say {
  margin-top: 12px;
  padding: 10px 26px;
  border-radius: 999px;
  background: var(--pink-soft); color: var(--cd);
  font-weight: 800; font-size: 15px;
  box-shadow: 0 4px 0 var(--cd);
  transition: transform .12s, box-shadow .12s;
}
.photo-say:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--cd); }

.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
