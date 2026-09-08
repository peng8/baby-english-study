export type Stage = 1 | 2 | 3 | 4
export type ColorTheme = 'pink' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'

export interface Category {
  key: string
  name: string
  emoji: string
  color: ColorTheme
  stage: Stage
}

export interface Word {
  id: string
  en: string
  zh: string
  /** 主图 emoji */
  emoji?: string
  /** 组合 emoji（方位词等场景图） */
  emojis?: string[]
  /** 文本主显示（数字等） */
  text?: string
  /** 颜色词色块 */
  color?: string
  category: string
  stage: Stage
}

export interface SongItem {
  id: string
  stage: Stage
  title: string
  emoji: string
  desc: string
  url: string
  /** 本站视频路径（如 /media/songs/xxx.mp4），存在时优先内嵌播放 */
  video?: string
  color: ColorTheme
}

export interface Phrase {
  id: string
  en: string
  zh: string
  emoji: string
}
