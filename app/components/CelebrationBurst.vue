<script setup lang="ts">
/* 答对庆祝：星星爱心迸发 + 中央鼓励大字 + 英文夸奖语音 */
const props = withDefaults(defineProps<{
  trigger: number
  size?: 'sm' | 'lg'
  text?: string
  voice?: boolean
}>(), { size: 'lg' })

const burstKey = ref(0)
const particles = ref<{ id: number, emoji: string, dx: string, dy: string, delay: string, fontSize: string, rot: string }[]>([])
const showText = ref(false)
const textShow = ref('太棒啦!')
const { praise } = useSpeech()

const ZH = ['太棒啦!', '真厉害!', '好棒呀!', '完成啦!', '你真优秀!']

watch(() => props.trigger, (n) => {
  if (!n) return
  const em = ['⭐', '✨', '💖', '🌈', '🎈', '🎉', '🍬', '💛']
  const count = props.size === 'lg' ? 28 : 14
  particles.value = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
    const dist = props.size === 'lg' ? 110 + Math.random() * 130 : 70 + Math.random() * 60
    return {
      id: i,
      emoji: em[Math.floor(Math.random() * em.length)],
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist - 50}px`,
      delay: `${Math.random() * 0.15}s`,
      fontSize: `${18 + Math.random() * (props.size === 'lg' ? 26 : 12)}px`,
      rot: `${Math.round(Math.random() * 360)}deg`,
    }
  })
  burstKey.value++
  if (props.size === 'lg') {
    textShow.value = props.text ?? ZH[Math.floor(Math.random() * ZH.length)]
    showText.value = true
  }
  if (props.voice !== false) praise()
  setTimeout(() => (showText.value = false), 1300)
  setTimeout(() => (particles.value = []), 1800)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="trigger" :key="burstKey" class="burst-layer">
      <span
        v-for="p in particles" :key="p.id" class="particle"
        :style="{ '--dx': p.dx, '--dy': p.dy, '--rot': p.rot, animationDelay: p.delay, fontSize: p.fontSize }"
      >{{ p.emoji }}</span>
      <div v-if="showText" class="big-text">{{ textShow }}</div>
    </div>
  </Teleport>
</template>

<style scoped>
.burst-layer {
  position: fixed; inset: 0; z-index: 200;
  pointer-events: none; overflow: hidden;
}
.particle {
  position: absolute; left: 50%; top: 42%;
  animation: burst-fly 1.3s ease-out forwards;
  will-change: transform, opacity;
}
.big-text {
  position: absolute; left: 50%; top: 42%;
  transform: translate(-50%, -50%);
  font-size: clamp(36px, 8vw, 64px);
  font-weight: 900; color: #ff7d9c;
  text-shadow:
    0 3px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff,
    0 10px 24px rgba(231, 109, 141, .4);
  animation: big-pop .5s ease-out;
  white-space: nowrap;
}
</style>
