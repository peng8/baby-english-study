/* 美式发音（Web Speech API），语速放慢适合幼儿 */

let cachedVoice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (!import.meta.client || !('speechSynthesis' in window)) return
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return
  cachedVoice =
    voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|aria|jenny|zira|google/i.test(v.name)) ||
    voices.find(v => /en[-_]US/i.test(v.lang)) ||
    voices.find(v => /^en/i.test(v.lang)) ||
    null
}

if (import.meta.client && 'speechSynthesis' in window) {
  pickVoice()
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice)
}

const EN_PRAISES = ['Great job!', 'Wonderful!', 'Awesome!', 'Super!', 'You did it!', 'Yay! Well done!']

export function useSpeech() {
  function speak(text: string, opts: { rate?: number; lang?: string } = {}) {
    if (!import.meta.client || !('speechSynthesis' in window) || !text) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = opts.lang ?? 'en-US'
      u.rate = opts.rate ?? 0.8 // 幼儿语速放慢
      u.pitch = 1.1
      if (cachedVoice) u.voice = cachedVoice
      window.speechSynthesis.speak(u)
    }
    catch { /* 语音不可用时静默 */ }
  }

  /** 播报英文单词/句子（去掉省略号等符号） */
  function speakEn(text: string) {
    speak(text.replace(/[…·]/g, '').trim())
  }

  /** 答对后的随机英文鼓励 */
  function praise() {
    speak(EN_PRAISES[Math.floor(Math.random() * EN_PRAISES.length)], { rate: 0.85 })
  }

  return { speak, speakEn, praise }
}
