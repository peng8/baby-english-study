export * from './types'
export { categories, words, categoryColor } from './words'
export { songs } from './songs'
export { stage2Commands, stage3Sentences, stage4Sentences } from './phrases'
export { parentTasks, parentTips, weeklyPlan } from './parent'

import type { ColorTheme, Stage } from './types'

export interface StageMeta {
  stage: Stage
  name: string
  weeks: string
  emoji: string
  color: ColorTheme
  goal: string
}

export const stages: StageMeta[] = [
  { stage: 1, name: '听音入门期', weeks: '第 1-8 周', emoji: '🌱', color: 'pink', goal: '熟悉语音语调，认识高频名词' },
  { stage: 2, name: '场景词汇期', weeks: '第 9-20 周', emoji: '🏡', color: 'blue', goal: '拓展场景词汇，听懂简单指令' },
  { stage: 3, name: '简单表达期', weeks: '第 21-36 周', emoji: '🗣️', color: 'green', goal: '鼓励模仿开口，熟悉口语句型' },
  { stage: 4, name: '综合巩固期', weeks: '第 37-52 周', emoji: '🎓', color: 'purple', goal: '综合复习，掌握方位表达' },
]

export const stageMeta = (s: Stage) => stages.find(x => x.stage === s)!
