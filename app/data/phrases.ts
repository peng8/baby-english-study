import type { Phrase } from './types'

/* ============================================================
 * 短句&句型库（只听不认读，不要求拼写）
 * 增减句子：直接复制/删除一条即可。
 * ============================================================ */

/** 阶段二：听学短句 */
export const stage2Commands: Phrase[] = [
  { id: 'ph2-come-here', en: 'Come here.', zh: '过来呀', emoji: '🤗' },
  { id: 'ph2-go-away', en: 'Go away.', zh: '走开呀', emoji: '🙅' },
  { id: 'ph2-sit-down', en: 'Sit down.', zh: '坐下', emoji: '🧎' },
  { id: 'ph2-stand-up', en: 'Stand up.', zh: '站起来', emoji: '🧍' },
  { id: 'ph2-clap-hands', en: 'Clap your hands.', zh: '拍拍手', emoji: '👏' },
  { id: 'ph2-open-mouth', en: 'Open your mouth.', zh: '张嘴巴', emoji: '👄' },
  { id: 'ph2-i-like-it', en: 'I like it.', zh: '我喜欢它', emoji: '💖' },
]

/** 阶段三：核心句型 */
export const stage3Sentences: Phrase[] = [
  { id: 'ph3-i-want', en: 'I want …', zh: '我想要……', emoji: '🙋' },
  { id: 'ph3-i-like', en: 'I like …', zh: '我喜欢……', emoji: '💗' },
  { id: 'ph3-it-is', en: 'It is …', zh: '它是……', emoji: '👉' },
  { id: 'ph3-this-is', en: 'This is …', zh: '这是……', emoji: '🫶' },
  { id: 'ph3-what-this', en: 'What is this?', zh: '这是什么？', emoji: '❓' },
]

/** 阶段四：方位句型 */
export const stage4Sentences: Phrase[] = [
  { id: 'ph4-where-is', en: 'Where is …?', zh: '……在哪里？', emoji: '🔍' },
  { id: 'ph4-it-is-in', en: 'It is in the box.', zh: '它在盒子里', emoji: '📦' },
  { id: 'ph4-it-is-on', en: 'It is on the chair.', zh: '它在椅子上', emoji: '🪑' },
  { id: 'ph4-it-is-under', en: 'It is under the bed.', zh: '它在床底下', emoji: '🛏️' },
]
