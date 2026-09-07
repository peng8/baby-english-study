<script setup lang="ts">
import { stage2Commands, words } from '~/data'

/* 听指令做动作：播放指令语音 + 动作演示，邀请宝宝模仿 */
const { speakEn } = useSpeech()

interface Cmd { en: string, zh: string, emoji: string }

const ACTION_IDS = ['run', 'jump', 'hop', 'stop', 'go', 'sit', 'stand', 'clap', 'wave', 'touch', 'open', 'close', 'eat', 'drink', 'sleep']
const CMD_ZH: Record<string, string> = {
  run: '跑一跑', jump: '跳一跳', hop: '单脚跳', stop: '停一停', go: '出发咯',
  sit: '坐下来', stand: '站起来', clap: '拍拍手', wave: '挥挥手', touch: '摸一摸',
  open: '打开它', close: '关上它', eat: '啊呜吃', drink: '喝一喝', sleep: '睡一觉',
}

const commands = computed<Cmd[]>(() => {
  const wordCmds = ACTION_IDS
    .map(id => words.find(w => w.id === `s2-actions-${id}`))
    .filter((w): w is NonNullable<typeof w> => !!w)
    .map(w => ({ en: `${w.en[0].toUpperCase()}${w.en.slice(1)}!`, zh: CMD_ZH[w.en] ?? w.zh, emoji: w.emoji! }))
  const phraseCmds = stage2Commands
    .filter(p => ['ph2-come-here', 'ph2-sit-down', 'ph2-stand-up', 'ph2-clap-hands', 'ph2-open-mouth'].includes(p.id))
    .map(p => ({ en: p.en, zh: p.zh, emoji: p.emoji }))
  return [...wordCmds, ...phraseCmds]
})

const idx = ref(0)
const cmd = computed(() => commands.value[idx.value])

function play() {
  if (cmd.value) speakEn(cmd.value.en)
}
function next() {
  idx.value = (idx.value + 1) % commands.value.length
}

onMounted(play)
watch(idx, play)
</script>

<template>
  <div>
    <div class="top"><NuxtLink to="/games" class="back">⬅ 换个游戏</NuxtLink></div>
    <h1 class="page-title">🕺 听指令做动作</h1>
    <p class="page-sub">听指令，宝宝也一起来做一做！</p>

    <div v-if="cmd" class="stage-card card t-orange">
      <div class="cmd-emoji">{{ cmd.emoji }}</div>
      <div class="cmd-en">{{ cmd.en }}</div>
      <div class="cmd-zh">{{ cmd.zh }}</div>
      <button class="btn-big t-orange" @click="play">🔊 再听一遍</button>
    </div>

    <p class="tip">👣 站起来，跟着画面一起做</p>

    <div class="next-row">
      <button class="btn-big t-pink" @click="next">下一个动作 ➜</button>
    </div>
  </div>
</template>

<style scoped>
.top { margin-bottom: 6px; }
.back { color: var(--sub); text-decoration: none; font-size: 14px; font-weight: 700; }

.stage-card {
  max-width: 480px; margin: 16px auto 0;
  padding: 38px 24px 30px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center;
}
.cmd-emoji { font-size: clamp(96px, 20vw, 150px); line-height: 1; animation: bounce 1.1s ease-in-out infinite; }
.cmd-en {
  font-size: clamp(30px, 6vw, 42px); font-weight: 900; color: var(--orange-deep);
  font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
}
.cmd-zh { color: var(--sub); font-weight: 700; font-size: 17px; margin-bottom: 8px; }

.tip { text-align: center; color: var(--sub); font-size: 14px; margin-top: 18px; }
.next-row { display: flex; justify-content: center; margin-top: 14px; }
</style>
