<script setup lang="ts">
import type { Category, Word } from '~/data'
import { categories, words } from '~/data'

/* 分类小游戏：点击卡片再点篮子（也支持拖拽），送宝贝回家 */
const { speakEn, praise } = useSpeech()
const { markLearned } = useProgress()

const CAT_KEYS = ['animals', 'food', 'toys', 'people', 'nature', 'clothes', 'colors']

const basketA = ref<Category | null>(null)
const basketB = ref<Category | null>(null)
const items = ref<Word[]>([])
const selected = ref<Word | null>(null)
const doneIds = ref<string[]>([])
const celebrate = ref(0)
const mini = ref(0)
const finished = ref(false)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5)
}

function pickWords(catKey: string, n = 3) {
  return shuffle(words.filter(w => w.category === catKey)).slice(0, n)
}

function deal() {
  const keys = shuffle(CAT_KEYS).slice(0, 2)
  basketA.value = categories.find(c => c.key === keys[0])!
  basketB.value = categories.find(c => c.key === keys[1])!
  items.value = shuffle([...pickWords(keys[0]), ...pickWords(keys[1])])
  selected.value = null
  doneIds.value = []
  finished.value = false
}

function put(basket: Category) {
  if (!selected.value || finished.value) return
  const w = selected.value
  if (w.category === basket.key) {
    doneIds.value = [...doneIds.value, w.id]
    markLearned(w.id)
    speakEn(w.en)
    mini.value++
    selected.value = null
    if (doneIds.value.length === items.value.length) {
      finished.value = true
      celebrate.value++
      setTimeout(deal, 2400)
    }
  }
  else {
    // 放错了：悄悄弹回，没有惩罚
    selected.value = null
  }
}

function onDragStart(e: DragEvent, w: Word) {
  selected.value = w
  e.dataTransfer?.setData('text/plain', w.id)
}

onMounted(() => {
  deal()
  setTimeout(praise, 400) // 欢迎语
})
</script>

<template>
  <div>
    <div class="top"><NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink></div>
    <h1 class="page-title">🧺 分类小能手</h1>
    <p class="page-sub">先点卡片，再点篮子，送宝贝回家</p>

    <!-- 篮子 -->
    <div class="baskets">
      <button
        v-for="b in [basketA, basketB]" :key="b?.key"
        class="basket card"
        :class="`t-${b?.color}`"
        @click="b && put(b)"
        @dragover.prevent
        @drop="b && put(b)"
      >
        <span class="basket-emoji">{{ b?.emoji }}</span>
        <span class="basket-name">{{ b?.name }}</span>
        <span class="basket-items">
          <span v-for="id in doneIds.filter(id => items.find(x => x.id === id)?.category === b?.key)" :key="id" class="mini-item">
            {{ items.find(x => x.id === id)?.emoji || items.find(x => x.id === id)?.text || '⭐' }}
          </span>
        </span>
      </button>
    </div>

    <!-- 物品卡 -->
    <div class="items">
      <WordCard
        v-for="w in items" :key="w.id"
        :word="w" size="sm"
        class="item"
        :class="{ picked: selected?.id === w.id, gone: doneIds.includes(w.id) }"
        draggable="true"
        @play="() => (selected = selected?.id === w.id ? null : w)"
        @dragstart="(e: DragEvent) => onDragStart(e, w)"
      />
    </div>

    <p v-if="finished" class="done-tip">都送回家啦，你真棒！🎉</p>
    <CelebrationBurst :trigger="celebrate" size="lg" text="全部分对啦!" />
    <CelebrationBurst :trigger="mini" size="sm" :voice="false" />
  </div>
</template>

<style scoped>
.top { margin-bottom: 6px; }
.back { color: var(--sub); text-decoration: none; font-size: 14px; font-weight: 700; }

.baskets { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 12px 0 20px; }
.basket {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 18px 12px 14px;
  border: 3px dashed var(--c);
  transition: transform .15s;
}
.basket:active { transform: scale(.95); }
.basket-emoji { font-size: 44px; line-height: 1; }
.basket-name { font-weight: 800; font-size: 16px; }
.basket-items { display: flex; gap: 4px; min-height: 22px; flex-wrap: wrap; justify-content: center; }
.mini-item { font-size: 18px; animation: pop .3s ease-out; }

.items {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  max-width: 640px;
}
@media (min-width: 620px) { .items { grid-template-columns: repeat(6, 1fr); } }

.item { padding: 12px 4px; transition: opacity .3s, transform .15s; }
.item.picked { border-color: var(--c); box-shadow: 0 0 0 5px var(--cs), var(--shadow); transform: scale(1.06); }
.item.gone { opacity: 0; pointer-events: none; transform: scale(.5); }

.done-tip { text-align: center; color: var(--green-deep); font-weight: 800; margin-top: 18px; }
</style>
