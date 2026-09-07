/* 学习进度：已学单词 / 收藏 / 儿歌浏览 / 任务勾选 —— 全部存在本机 localStorage */

const KEYS = {
  learned: 'bes:learned',
  favs: 'bes:favs',
  watched: 'bes:songs-watched',
  tasks: 'bes:tasks-done',
} as const

let inited = false

function readList(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }
  catch {
    return []
  }
}

export function useProgress() {
  const learned = useState<string[]>('bes-learned', () => [])
  const favs = useState<string[]>('bes-favs', () => [])
  const watched = useState<string[]>('bes-watched', () => [])
  const taskDone = useState<string[]>('bes-tasks', () => [])

  /** 在 layout 挂载时调用一次：读取本地数据并开启持久化 */
  function initProgress() {
    if (inited || !import.meta.client) return
    inited = true
    learned.value = readList(KEYS.learned)
    favs.value = readList(KEYS.favs)
    watched.value = readList(KEYS.watched)
    taskDone.value = readList(KEYS.tasks)

    watch(learned, v => localStorage.setItem(KEYS.learned, JSON.stringify(v)), { deep: true })
    watch(favs, v => localStorage.setItem(KEYS.favs, JSON.stringify(v)), { deep: true })
    watch(watched, v => localStorage.setItem(KEYS.watched, JSON.stringify(v)), { deep: true })
    watch(taskDone, v => localStorage.setItem(KEYS.tasks, JSON.stringify(v)), { deep: true })
  }

  /** 听过就算学会（去重） */
  function markLearned(id: string) {
    if (!learned.value.includes(id)) learned.value = [...learned.value, id]
  }

  function toggleFav(id: string) {
    favs.value = favs.value.includes(id) ? favs.value.filter(x => x !== id) : [...favs.value, id]
  }

  const isFav = (id: string) => favs.value.includes(id)

  function markWatched(id: string) {
    if (!watched.value.includes(id)) watched.value = [...watched.value, id]
  }

  function toggleTask(id: string) {
    taskDone.value = taskDone.value.includes(id) ? taskDone.value.filter(x => x !== id) : [...taskDone.value, id]
  }

  function resetAll() {
    learned.value = []
    favs.value = []
    watched.value = []
    taskDone.value = []
    if (import.meta.client) {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k))
      localStorage.removeItem('bes:daily-start')
    }
  }

  /** 某阶段的学习进度（0-1） */
  function stageProgress(stageWords: { id: string, stage: number }[], stage: number) {
    const list = stageWords.filter(w => w.stage === stage)
    if (!list.length) return 0
    const done = list.filter(w => learned.value.includes(w.id)).length
    return done / list.length
  }

  return { learned, favs, watched, taskDone, initProgress, markLearned, toggleFav, isFav, markWatched, toggleTask, resetAll, stageProgress }
}
