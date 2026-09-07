/* 屏幕时长提示：每 8 分钟弹出"休息一下"温馨提示 */

let started = false

export function useScreenTime() {
  const showRest = useState('bes-rest', () => false)
  const todayMinutes = useState('bes-minutes', () => 0)

  if (import.meta.client && !started) {
    started = true
    const key = 'bes:daily-start'
    let start = Number(localStorage.getItem(key) || 0)
    if (!start || new Date(start).toDateString() !== new Date().toDateString()) {
      start = Date.now()
      localStorage.setItem(key, String(start))
    }

    let lastPrompt = -1
    setInterval(() => {
      const mins = Math.floor((Date.now() - start) / 60000)
      todayMinutes.value = mins
      if (mins > 0 && mins % 8 === 0 && mins !== lastPrompt && !showRest.value) {
        lastPrompt = mins
        showRest.value = true
        setTimeout(() => (showRest.value = false), 7000)
      }
    }, 20000)
  }

  return { showRest, todayMinutes }
}
