/* 答题音效：Web Audio 实时合成，无需音频文件 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (!import.meta.client) return null
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  }
  catch { return null }
}

function tone(c: AudioContext, freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.16) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  o.connect(g)
  g.connect(c.destination)
  const t = c.currentTime + start
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.015)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.05)
}

/** 铃琴音色：基音 + 八度泛音 + 三倍频，模拟小钟琴的清脆感 */
function bell(c: AudioContext, freq: number, start: number, dur: number, vol = 0.2) {
  tone(c, freq, start, dur, 'sine', vol)
  tone(c, freq * 2, start, dur * 0.55, 'sine', vol * 0.28)
  tone(c, freq * 3, start, dur * 0.3, 'sine', vol * 0.1)
}

export function useSfx() {
  /** 答对：清脆的钟琴上行「叮-咚~」C6 → G6 → C7 */
  function correct() {
    const c = getCtx()
    if (!c) return
    bell(c, 1046.5, 0, 0.45, 0.2)      // C6
    bell(c, 1568.0, 0.13, 0.65, 0.22)  // G6（尾音更长更亮）
    bell(c, 2093.0, 0.26, 0.45, 0.09)  // C7 高光点缀
  }

  /** 答错：温柔下行两音（提示但不吓人） */
  function wrong() {
    const c = getCtx()
    if (!c) return
    tone(c, 311.13, 0, 0.22, 'sine', 0.13) // Eb4
    tone(c, 233.08, 0.16, 0.35, 'sine', 0.13) // Bb3
  }

  return { correct, wrong }
}
