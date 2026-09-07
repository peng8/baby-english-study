<script setup lang="ts">
const tabs = [
  { to: '/', label: '首页', emoji: '🏠', color: 'pink' },
  { to: '/flashcards', label: '闪卡', emoji: '🃏', color: 'blue' },
  { to: '/games', label: '游戏', emoji: '🎮', color: 'yellow' },
  { to: '/songs', label: '儿歌', emoji: '🎵', color: 'green' },
  { to: '/review', label: '复习', emoji: '🌟', color: 'purple' },
]

const route = useRoute()
const isActive = (to: string) => to === '/' ? route.path === '/' : route.path.startsWith(to)
</script>

<template>
  <nav class="tabbar">
    <NuxtLink
      v-for="t in tabs" :key="t.to" :to="t.to"
      class="tab-item t-pink"
      :class="[`t-${t.color}`, { active: isActive(t.to) }]"
    >
      <span class="emoji">{{ t.emoji }}</span>
      <span class="label">{{ t.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 100;
  display: flex; justify-content: space-around; align-items: center;
  background: rgba(255, 255, 255, .94);
  backdrop-filter: blur(10px);
  border-top: 2px solid var(--pink-soft);
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom));
}
.tab-item {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  min-width: 58px; padding: 5px 12px;
  border-radius: 18px;
  color: var(--sub); text-decoration: none;
  font-size: 12px; font-weight: 700;
  transition: all .2s;
}
.tab-item .emoji { font-size: 26px; line-height: 1.1; transition: transform .2s; }
.tab-item.active {
  background: var(--cs);
  color: var(--ink);
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(170, 130, 95, .16);
}
.tab-item.active .emoji { transform: scale(1.18); }
</style>
