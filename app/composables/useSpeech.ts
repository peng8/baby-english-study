/* 语音（Web Speech API）：英文单词发音 + 中文答题反馈，语速放慢适合幼儿 */

let cachedEnVoice: SpeechSynthesisVoice | null = null
let cachedZhVoice: SpeechSynthesisVoice | null = null

function pickVoices() {
  if (!import.meta.client || !('speechSynthesis' in window)) return
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return
  cachedEnVoice =
    voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|aria|jenny|zira|google/i.test(v.name)) ||
    voices.find(v => /en[-_]US/i.test(v.lang)) ||
    voices.find(v => /^en/i.test(v.lang)) ||
    null
  cachedZhVoice =
    voices.find(v => /zh[-_]CN/i.test(v.lang) && /female|xiaoxiao|tingting|google/i.test(v.name)) ||
    voices.find(v => /zh[-_]CN/i.test(v.lang)) ||
    voices.find(v => /^zh/i.test(v.lang)) ||
    null
}

if (import.meta.client && 'speechSynthesis' in window) {
  pickVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoices)
}

const EN_PRAISES = ['Great job!', 'Wonderful!', 'Awesome!', 'Super!', 'You did it!', 'Yay! Well done!']

export function useSpeech() {
  function speak(text: string, opts: { rate?: number; lang?: string } = {}) {
    if (!import.meta.client || !('speechSynthesis' in window) || !text) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      const lang = opts.lang ?? 'en-US'
      u.lang = lang
      u.rate = opts.rate ?? 0.8 // 幼儿语速放慢
      u.pitch = 1.1
      u.voice = /^zh/i.test(lang) ? cachedZhVoice : cachedEnVoice
      window.speechSynthesis.speak(u)
    }
    catch { /* 语音不可用时静默 */ }
  }

  /** 播报英文单词/句子（去掉省略号等符号） */
  function speakEn(text: string) {
    speak(text.replace(/[…·]/g, '').trim())
  }

  /** 播报中文提示语（如答题反馈） */
  function speakZh(text: string) {
    speak(text, { lang: 'zh-CN', rate: 0.9 })
  }

  /** 答对后的随机英文鼓励 */
  function praise() {
    speak(EN_PRAISES[Math.floor(Math.random() * EN_PRAISES.length)], { rate: 0.85 })
  }

  return { speak, speakEn, speakZh, praise }
}
