import type { SongItem } from './types'

/* ============================================================
 * 儿歌&视频资源库 —— 仅保存标题/简介/外链，不存储音视频
 *
 * 增减儿歌：直接复制/删除一条即可。
 * url 建议填 B 站搜索页或具体视频链接，点击封面跳转外部播放。
 * ============================================================ */

const bili = (keyword: string) =>
  `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`

export const songs: SongItem[] = [
  // 阶段一
  { id: 'song-baby-shark', stage: 1, title: 'Baby Shark', emoji: '🦈', desc: '全家总动员的洗脑神曲，跟着鲨鱼一家游起来', url: bili('Baby Shark 儿歌'), color: 'pink' },
  { id: 'song-head-shoulders', stage: 1, title: 'Head Shoulders Knees & Toes', emoji: '🙆', desc: '指五官神曲，边唱边摸身体部位', url: bili('Head Shoulders Knees and Toes 儿歌'), color: 'blue' },
  { id: 'song-colors-song', stage: 1, title: 'Colors Song', emoji: '🌈', desc: '认识红黄蓝绿，颜色真漂亮', url: bili('Colors Song 幼儿英语'), color: 'purple' },
  { id: 'song-vegetables', stage: 1, title: 'Yes Yes Vegetables Song', emoji: '🥦', desc: '爱吃蔬菜的好宝宝', url: bili('Yes Yes Vegetables Song'), color: 'green' },
  // 阶段二
  { id: 'song-one-little-finger', stage: 2, title: 'One Little Finger', emoji: '👆', desc: '一根小手指点点点，认识身体', url: bili('One Little Finger 儿歌'), color: 'yellow' },
  { id: 'song-five-monkeys', stage: 2, title: 'Five Little Monkeys', emoji: '🐵', desc: '五只小猴子在床上跳，数字启蒙', url: bili('Five Little Monkeys 儿歌'), color: 'orange' },
  { id: 'song-open-shut', stage: 2, title: 'Open Shut Them', emoji: '🙌', desc: '打开关上小手掌，配上指令互动', url: bili('Open Shut Them 儿歌'), color: 'blue' },
  { id: 'song-walking-walking', stage: 2, title: 'Walking Walking', emoji: '🚶', desc: '走、跳、跑、停，跟着做动作', url: bili('Walking Walking 儿歌'), color: 'green' },
  // 阶段三
  { id: 'song-if-happy', stage: 3, title: 'If You Are Happy', emoji: '😊', desc: '开心就拍拍手，情绪表达经典儿歌', url: bili('If You Are Happy 儿歌'), color: 'pink' },
  { id: 'song-i-like-apples', stage: 3, title: 'I Like Apples', emoji: '🍎', desc: 'I like... 句型启蒙，说说喜欢的东西', url: bili('I Like Apples 儿歌'), color: 'pink' },
  { id: 'song-this-is-the-way', stage: 3, title: 'This Is The Way', emoji: '🛁', desc: '洗漱穿衣好习惯儿歌', url: bili('This Is The Way 儿歌'), color: 'blue' },
  { id: 'song-whats-your-name', stage: 3, title: 'What is Your Name?', emoji: '👋', desc: '打招呼问名字，自信开口', url: bili('What is Your Name 儿歌'), color: 'purple' },
  // 阶段四
  { id: 'song-rain-rain', stage: 4, title: 'Rain Rain Go Away', emoji: '🌧️', desc: '情景小故事，雨天也想出去玩', url: bili('Rain Rain Go Away 儿歌'), color: 'blue' },
  { id: 'song-wheels-bus', stage: 4, title: 'The Wheels on the Bus', emoji: '🚌', desc: '公交车的轮子转呀转，情景儿歌', url: bili('The Wheels on the Bus 儿歌'), color: 'yellow' },
]
