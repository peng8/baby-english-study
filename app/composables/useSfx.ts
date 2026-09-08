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
  g.gain.linearRampToValueAtTime(vol, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.05)
}

export function useSfx() {
  /** 答对：欢快上行琶音（C5-E5-G5-C6） */
  function correct() {
    const c = getCtx()
    if (!c) return
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((f, i) => tone(c, f, i * 0.09, 0.3, 'triangle', 0.15))
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
