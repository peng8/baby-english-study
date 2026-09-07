/* ============================================================
 * 家长专区数据 —— 每周计划 / 亲子任务 / 避坑提醒
 * 可自由增减条目。
 * ============================================================ */

export const weeklyPlan = [
  { stage: 1, name: '听音入门期（1-8周）', emoji: '🌱', plan: '每天 3-5 张闪卡磨耳朵 + 1 首儿歌，重点在"听"，听懂即可', goal: '熟悉语音语调，认识 45 个高频名词' },
  { stage: 2, name: '场景词汇期（9-20周）', emoji: '🏡', plan: '加入指令游戏：Sit down / Clap your hands，把英语变成亲子游戏', goal: '拓展日常词汇，听懂简单指令' },
  { stage: 3, name: '简单表达期（21-36周）', emoji: '🗣️', plan: '鼓励模仿开口说短句 I like it / I want…，多鼓励不纠错', goal: '愿意模仿开口，掌握高频句型' },
  { stage: 4, name: '综合巩固期（37-52周）', emoji: '🎓', plan: '玩寻宝游戏 Where is…? 综合复习，衔接幼儿园英语', goal: '综合巩固约 230 词，掌握方位表达' },
]

export const parentTasks = [
  { id: 'task-real', emoji: '🍎', text: '看到实物随口说英文：看到猫说 cat，看到苹果说 apple' },
  { id: 'task-time', emoji: '⏰', text: '每天固定 5-10 分钟"英语小游戏时间"，贵在坚持不在长' },
  { id: 'task-song', emoji: '👏', text: '播放儿歌时和孩子一起做动作：拍手、跺脚、指五官' },
  { id: 'task-cmd', emoji: '🗣️', text: '用英文短句和孩子玩指令游戏：Come here! / Clap your hands!' },
  { id: 'task-bed', emoji: '🌙', text: '睡前 5 分钟闪卡翻翻乐，当作固定亲子仪式' },
  { id: 'task-repeat', emoji: '🔁', text: '孩子感兴趣的东西反复说，重复就是最好的启蒙' },
  { id: 'task-outdoor', emoji: '🌳', text: '去户外认识 tree / flower / dog，边玩边说' },
  { id: 'task-no-correct', emoji: '💗', text: '孩子说错不纠正，用正确的句子自然回应即可' },
]

export const parentTips = [
  { emoji: '🙅', title: '不强迫跟读', text: '听懂就是收获，开口交给时间和兴趣' },
  { emoji: '✏️', title: '不做默写认读', text: '5 岁前不学 26 个字母，耳朵优先于眼睛' },
  { emoji: '⏰', title: '控制屏幕时间', text: '每天 5-10 分钟，到点就停，网页只是辅助' },
  { emoji: '🌳', title: '现实互动优先', text: '看到真猫真苹果，比看屏幕有效得多' },
  { emoji: '🚫', title: '不打分不排名', text: '只有鼓励动画，没有考试、分数和惩罚' },
]
