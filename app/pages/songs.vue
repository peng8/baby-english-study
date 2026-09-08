<script setup lang="ts">
import { songs, stages } from '~/data'
import type { SongItem } from '~/data/types'

/* 儿歌库：优先网页内嵌播放，视频加载失败回退外链 */
const { markWatched, watched } = useProgress()

const playing = ref<SongItem | null>(null)
const videoFailed = ref(false)

function open(song: SongItem) {
  markWatched(song.id)
  if (song.video) {
    videoFailed.value = false
    playing.value = song
  } else {
    window.open(song.url, '_blank', 'noopener')
  }
}

function close() {
  playing.value = null
}

function onVideoError() {
  videoFailed.value = true
}
</script>

<template>
  <div>
    <h1 class="page-title">🎵 儿歌时间</h1>
    <p class="page-sub">点击卡片立即播放，和宝宝一起唱吧 🎤</p>

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
            <span v-if="song.video" class="play-badge">▶</span>
          </span>
          <span class="song-title">{{ song.title }}</span>
          <span class="song-desc">{{ song.desc }}</span>
          <span class="play-tag">{{ song.video ? '▶ 立即播放' : '▶ 去听儿歌' }}</span>
        </button>
      </div>
    </section>

    <!-- 内嵌播放弹窗 -->
    <Transition name="fade">
      <div v-if="playing" class="player-overlay" @click.self="close">
        <div class="player-card" :class="`t-${playing.color}`">
          <button class="player-close" @click="close">✕</button>
          <div class="player-head">
            <span class="player-emoji">{{ playing.emoji }}</span>
            <span class="player-title">{{ playing.title }}</span>
          </div>

          <video
            v-if="!videoFailed"
            class="player-video"
            :src="playing.video"
            controls
            autoplay
            playsinline
            webkit-playsinline
            preload="auto"
            @error="onVideoError"
          />

          <div v-else class="player-fallback">
            <span class="fb-emoji">😅</span>
            <p>视频加载失败了，去B站看吧～</p>
            <a class="btn-big" :href="playing.url" target="_blank" rel="noopener" @click="close">▶ 去 B 站观看</a>
          </div>
        </div>
      </div>
    </Transition>
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
.play-badge {
  position: absolute; bottom: 8px; left: 8px;
  width: 30px; height: 30px; border-radius: 999px;
  background: rgba(255, 255, 255, .92); color: var(--cd);
  font-size: 13px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  padding-left: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
}

.song-title {
  font-weight: 800; font-size: 15px;
  padding: 0 14px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
}
.song-desc { color: var(--sub); font-size: 12px; padding: 0 14px; margin-top: 4px; }
.play-tag { color: var(--cd); font-weight: 800; font-size: 13px; padding: 0 14px; margin-top: 8px; }

/* ---- 播放弹窗 ---- */
.player-overlay {
  position: fixed; inset: 0; z-index: 250;
  background: rgba(91, 75, 73, .45);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.player-card {
  position: relative;
  width: min(92vw, 860px);
  max-height: 90dvh;
  background: #fff;
  border: 4px solid var(--cs, var(--pink-soft));
  border-radius: var(--r-lg);
  box-shadow: var(--shadow);
  padding: 14px 14px 16px;
  animation: pop .3s ease-out;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.player-close {
  position: absolute; top: 10px; right: 10px; z-index: 2;
  width: 38px; height: 38px; border-radius: 999px;
  background: var(--yellow-soft); color: var(--ink);
  font-size: 17px; font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
  transition: transform .15s;
}
.player-close:active { transform: scale(.88); }
.player-head {
  display: flex; align-items: center; gap: 10px;
  padding: 2px 4px 10px;
}
.player-emoji { font-size: 26px; }
.player-title {
  font-weight: 800; font-size: 17px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
}
.player-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--r-md);
  background: #000;
  object-fit: contain;
}
.player-fallback {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 34px 10px;
  text-align: center;
}
.fb-emoji { font-size: 46px; }
.player-fallback p { color: var(--sub); font-weight: 700; margin: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
