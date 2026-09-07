<script setup lang="ts">
import { songs, stages } from '~/data'

/* 儿歌库：仅跳转外部播放，记录已浏览 */
const { markWatched, watched } = useProgress()

function open(song: { id: string, url: string, title: string }) {
  if (!song.url) return
  markWatched(song.id)
  window.open(song.url, '_blank', 'noopener')
}
</script>

<template>
  <div>
    <h1 class="page-title">🎵 儿歌时间</h1>
    <p class="page-sub">点击卡片跳转外部播放，记得控制时长哦 ⏰</p>

    <section v-for="s in stages" :key="s.stage" class="stage-sec">
      <h2 class="sec-head" :class="`t-${s.color}`">{{ s.emoji }} 阶段{{ ['一', '二', '三', '四'][s.stage - 1] }}儿歌</h2>
      <div class="song-grid">
        <button
          v-for="song in songs.filter(x => x.stage === s.stage)" :key="song.id"
          class="song-card card"
          :class="`t-${song.color}`"
          @click="open(song)"
        >
          <span class="cover" :style="{ background: `linear-gradient(135deg, var(--cs), var(--c))` }">
            <span class="cover-emoji">{{ song.emoji }}</span>
            <span v-if="watched.includes(song.id)" class="watched">看过 ✓</span>
          </span>
          <span class="song-title">{{ song.title }}</span>
          <span class="song-desc">{{ song.desc }}</span>
          <span class="play-tag">▶ 去听儿歌</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stage-sec { margin-bottom: 10px; }
.sec-head { font-size: 17px; font-weight: 800; margin: 16px 4px 10px; }

.song-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
}
@media (min-width: 720px) { .song-grid { grid-template-columns: repeat(4, 1fr); } }

.song-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 0 0 14px; overflow: hidden;
  text-align: left;
  transition: transform .15s;
}
.song-card:active { transform: scale(.96); }

.cover {
  position: relative;
  width: 100%; aspect-ratio: 2.35 / 1;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 10px;
}
.cover-emoji { font-size: clamp(40px, 7vw, 56px); filter: drop-shadow(0 4px 8px rgba(0, 0, 0, .15)); }
.watched {
  position: absolute; top: 8px; right: 8px;
  background: #fff; color: var(--green-deep);
  font-size: 11px; font-weight: 800;
  padding: 3px 10px; border-radius: 999px;
}

.song-title {
  font-weight: 800; font-size: 15px;
  padding: 0 14px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
}
.song-desc { color: var(--sub); font-size: 12px; padding: 0 14px; margin-top: 4px; }
.play-tag { color: var(--cd); font-weight: 800; font-size: 13px; padding: 0 14px; margin-top: 8px; }
</style>
