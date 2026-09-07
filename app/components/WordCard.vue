<script setup lang="ts">
import type { Word } from '~/data'
import { categoryColor } from '~/data'

const props = withDefaults(defineProps<{
  word: Word
  size?: 'sm' | 'lg'
  showFav?: boolean
  fav?: boolean
}>(), { size: 'sm' })

const emit = defineEmits<{ play: [], fav: [] }>()
const theme = computed(() => categoryColor(props.word.category))
</script>

<template>
  <button
    class="word-card t-pink"
    :class="[`t-${theme}`, size]"
    @click="emit('play')"
  >
    <span
      v-if="showFav"
      class="fav" :class="{ on: fav }"
      @click.stop="emit('fav')"
    >{{ fav ? '💖' : '🤍' }}</span>

    <span class="visual">
      <span v-if="word.emojis" class="combo">
        <span v-for="(e, i) in word.emojis" :key="i" :class="`combo-p${i}`">{{ e }}</span>
      </span>
      <span v-else-if="word.color" class="color-dot" :style="{ background: word.color }" />
      <span v-else-if="word.text" class="num-text">{{ word.text }}</span>
      <span v-else class="emoji">{{ word.emoji }}</span>
    </span>

    <span class="en">{{ word.en }}</span>
    <span class="zh">{{ word.zh }}</span>
  </button>
</template>

<style scoped>
.word-card {
  position: relative;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px;
  width: 100%;
  background: #fff;
  border: 3px solid var(--cs);
  border-radius: var(--r-lg);
  box-shadow: 0 6px 16px rgba(170, 130, 95, .12);
  transition: transform .15s, box-shadow .15s;
  user-select: none;
}
.word-card:active { transform: scale(.94); box-shadow: 0 2px 8px rgba(170, 130, 95, .15); }

.visual {
  display: flex; align-items: center; justify-content: center;
  position: relative;
  line-height: 1;
}
.emoji { display: block; }
.sm .emoji { font-size: clamp(44px, 9vw, 64px); }
.lg .emoji { font-size: clamp(88px, 18vw, 140px); }

.combo { position: relative; display: block; }
.combo span { display: block; }
.combo-p0 { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -64%) scale(.62); z-index: 2; }
.combo-p1 { opacity: .95; }
.sm .combo { font-size: clamp(44px, 9vw, 64px); }
.lg .combo { font-size: clamp(88px, 18vw, 140px); }

.color-dot {
  display: block; border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, .9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .12), inset 0 -6px 14px rgba(0, 0, 0, .08);
}
.sm .color-dot { width: clamp(44px, 9vw, 60px); height: clamp(44px, 9vw, 60px); }
.lg .color-dot { width: clamp(90px, 18vw, 130px); height: clamp(90px, 18vw, 130px); }

.num-text {
  display: block;
  font-weight: 900; color: var(--cd);
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
  text-shadow: 0 3px 0 var(--cs);
}
.sm .num-text { font-size: clamp(40px, 8vw, 56px); }
.lg .num-text { font-size: clamp(80px, 16vw, 120px); }

.en {
  font-weight: 800; color: var(--ink);
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Segoe UI', sans-serif;
  letter-spacing: .5px;
}
.sm .en { font-size: clamp(16px, 3.4vw, 22px); }
.lg .en { font-size: clamp(28px, 6vw, 40px); }

.zh { color: var(--sub); font-weight: 600; }
.sm .zh { font-size: 13px; }
.lg .zh { font-size: clamp(15px, 3vw, 20px); }

.fav {
  position: absolute; top: 8px; right: 8px; z-index: 3;
  font-size: 22px; line-height: 1;
  padding: 6px; border-radius: 50%;
  transition: transform .2s;
}
.fav.on { animation: pop .3s ease-out; }
</style>
