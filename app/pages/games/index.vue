<script setup lang="ts">
const games = [
  { to: '/games/listen-pick', emoji: '🔊', name: '听音识图', desc: '听声音，找一找是哪张图', color: 'blue', stage: '阶段 1+' },
  { to: '/games/matching', emoji: '🃏', name: '图片配对', desc: '翻开小卡，找出好朋友', color: 'pink', stage: '阶段 1+' },
  { to: '/games/categorize', emoji: '🧺', name: '分类小能手', desc: '把宝贝送回它的家', color: 'green', stage: '阶段 2+' },
  { to: '/games/actions', emoji: '🕺', name: '听指令做动作', desc: '跟着指令一起动起来', color: 'orange', stage: '阶段 2+' },
  { to: '/games/treasure-hunt', emoji: '🔍', name: '情景寻宝', desc: 'Where is it? 找到它！', color: 'purple', stage: '阶段 4+' },
]
</script>

<template>
  <div>
    <h1 class="page-title">🎮 游戏中心</h1>
    <p class="page-sub">没有分数没有惩罚，只有鼓励和掌声 👏</p>

    <div class="game-list">
      <NuxtLink
        v-for="g in games" :key="g.to" :to="g.to"
        class="game-card card"
        :class="`t-${g.color}`"
      >
        <span class="game-emoji">{{ g.emoji }}</span>
        <span class="game-info">
          <span class="game-name">{{ g.name }}</span>
          <span class="game-desc">{{ g.desc }}</span>
        </span>
        <span class="game-right">
          <span class="game-stage">{{ g.stage }}</span>
          <span class="game-arrow">➜</span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.game-list { display: flex; flex-direction: column; gap: 14px; }
.game-card {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 20px;
  text-decoration: none; color: inherit;
  transition: transform .15s;
}
.game-card:active { transform: scale(.97); }
.game-emoji {
  font-size: 38px; line-height: 1;
  width: 68px; height: 68px; flex: none;
  display: flex; align-items: center; justify-content: center;
  background: var(--cs); border-radius: 22px;
}
.game-info { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
.game-name { font-size: 18px; font-weight: 800; }
.game-desc { color: var(--sub); font-size: 13px; }
.game-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.game-stage { font-size: 11px; color: var(--cd); background: var(--cs); padding: 3px 10px; border-radius: 999px; font-weight: 700; }
.game-arrow { color: var(--cd); font-size: 20px; font-weight: 900; }
</style>
