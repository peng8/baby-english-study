import type { Category, ColorTheme, Word } from './types'

/* ============================================================
 * 单词库 —— 全部学习词汇在此维护
 *
 * 增删单词：直接复制/删除一行即可，页面自动更新。
 * 字段说明：
 *   id       唯一标识（建议格式 s阶段-分类-单词，重复单词加 -2）
 *   en       英文（点击卡片时朗读这个词）
 *   zh       中文释义
 *   emoji    主图（Q版大图展示）
 *   emojis   组合图（可选，用于方位词等场景）
 *   text     文字主显示（可选，用于数字）
 *   color    色块（可选，用于颜色词）
 *   category 分类 key（见下方 categories）
 *   stage    所属阶段 1-4
 * ============================================================ */

export const categories: Category[] = [
  // 阶段一
  { key: 'animals', name: '动物', emoji: '🐾', color: 'pink', stage: 1 },
  { key: 'food', name: '食物饮品', emoji: '🍎', color: 'yellow', stage: 1 },
  { key: 'colors', name: '颜色', emoji: '🎨', color: 'purple', stage: 1 },
  { key: 'body', name: '身体部位', emoji: '🖐️', color: 'blue', stage: 1 },
  // 阶段二
  { key: 'toys', name: '玩具物品', emoji: '🧸', color: 'green', stage: 2 },
  { key: 'people', name: '人物', emoji: '👨‍👩‍👧', color: 'orange', stage: 2 },
  { key: 'numbers', name: '数字', emoji: '🔢', color: 'blue', stage: 2 },
  { key: 'weather', name: '天气时间', emoji: '🌞', color: 'purple', stage: 2 },
  { key: 'actions', name: '动作', emoji: '✋', color: 'pink', stage: 2 },
  // 阶段三
  { key: 'nature', name: '户外自然', emoji: '🪴', color: 'green', stage: 3 },
  { key: 'clothes', name: '衣物', emoji: '🧣', color: 'blue', stage: 3 },
  { key: 'emotions', name: '情绪', emoji: '🥰', color: 'pink', stage: 3 },
  { key: 'verbs', name: '动词短语', emoji: '🏃', color: 'yellow', stage: 3 },
  // 阶段四
  { key: 'transport', name: '交通工具', emoji: '🚌', color: 'blue', stage: 4 },
  { key: 'position', name: '方位', emoji: '📍', color: 'purple', stage: 4 },
]

export const categoryColor = (key: string): ColorTheme =>
  categories.find(c => c.key === key)?.color ?? 'pink'

export const words: Word[] = [
  /* ============ 阶段一：听音入门期 ============ */

  // 🐾 动物
  { id: 's1-animals-cat', en: 'cat', zh: '小猫', emoji: '🐱', category: 'animals', stage: 1 },
  { id: 's1-animals-dog', en: 'dog', zh: '小狗', emoji: '🐶', category: 'animals', stage: 1 },
  { id: 's1-animals-bird', en: 'bird', zh: '小鸟', emoji: '🐦', category: 'animals', stage: 1 },
  { id: 's1-animals-rabbit', en: 'rabbit', zh: '小兔', emoji: '🐰', category: 'animals', stage: 1 },
  { id: 's1-animals-panda', en: 'panda', zh: '熊猫', emoji: '🐼', category: 'animals', stage: 1 },
  { id: 's1-animals-tiger', en: 'tiger', zh: '老虎', emoji: '🐯', category: 'animals', stage: 1 },
  { id: 's1-animals-monkey', en: 'monkey', zh: '猴子', emoji: '🐵', category: 'animals', stage: 1 },
  { id: 's1-animals-duck', en: 'duck', zh: '鸭子', emoji: '🦆', category: 'animals', stage: 1 },
  { id: 's1-animals-pig', en: 'pig', zh: '小猪', emoji: '🐷', category: 'animals', stage: 1 },
  { id: 's1-animals-cow', en: 'cow', zh: '奶牛', emoji: '🐮', category: 'animals', stage: 1 },
  { id: 's1-animals-sheep', en: 'sheep', zh: '绵羊', emoji: '🐑', category: 'animals', stage: 1 },
  { id: 's1-animals-fish', en: 'fish', zh: '小鱼', emoji: '🐟', category: 'animals', stage: 1 },
  { id: 's1-animals-bear', en: 'bear', zh: '小熊', emoji: '🐻', category: 'animals', stage: 1 },
  { id: 's1-animals-frog', en: 'frog', zh: '青蛙', emoji: '🐸', category: 'animals', stage: 1 },
  { id: 's1-animals-mouse', en: 'mouse', zh: '老鼠', emoji: '🐭', category: 'animals', stage: 1 },

  // 🍎 食物&饮品
  { id: 's1-food-apple', en: 'apple', zh: '苹果', emoji: '🍎', category: 'food', stage: 1 },
  { id: 's1-food-banana', en: 'banana', zh: '香蕉', emoji: '🍌', category: 'food', stage: 1 },
  { id: 's1-food-orange', en: 'orange', zh: '橙子', emoji: '🍊', category: 'food', stage: 1 },
  { id: 's1-food-pear', en: 'pear', zh: '梨子', emoji: '🍐', category: 'food', stage: 1 },
  { id: 's1-food-milk', en: 'milk', zh: '牛奶', emoji: '🥛', category: 'food', stage: 1 },
  { id: 's1-food-egg', en: 'egg', zh: '鸡蛋', emoji: '🥚', category: 'food', stage: 1 },
  { id: 's1-food-cake', en: 'cake', zh: '蛋糕', emoji: '🎂', category: 'food', stage: 1 },
  { id: 's1-food-bread', en: 'bread', zh: '面包', emoji: '🍞', category: 'food', stage: 1 },
  { id: 's1-food-rice', en: 'rice', zh: '米饭', emoji: '🍚', category: 'food', stage: 1 },
  { id: 's1-food-water', en: 'water', zh: '水', emoji: '💧', category: 'food', stage: 1 },
  { id: 's1-food-juice', en: 'juice', zh: '果汁', emoji: '🧃', category: 'food', stage: 1 },
  { id: 's1-food-cookie', en: 'cookie', zh: '饼干', emoji: '🍪', category: 'food', stage: 1 },
  { id: 's1-food-grape', en: 'grape', zh: '葡萄', emoji: '🍇', category: 'food', stage: 1 },
  { id: 's1-food-strawberry', en: 'strawberry', zh: '草莓', emoji: '🍓', category: 'food', stage: 1 },
  { id: 's1-food-ice-cream', en: 'ice cream', zh: '冰淇淋', emoji: '🍦', category: 'food', stage: 1 },

  // 🎨 颜色（用色块展示）
  { id: 's1-colors-red', en: 'red', zh: '红色', color: '#ff6b6b', category: 'colors', stage: 1 },
  { id: 's1-colors-blue', en: 'blue', zh: '蓝色', color: '#5aa9e6', category: 'colors', stage: 1 },
  { id: 's1-colors-yellow', en: 'yellow', zh: '黄色', color: '#ffd93d', category: 'colors', stage: 1 },
  { id: 's1-colors-green', en: 'green', zh: '绿色', color: '#6bcb77', category: 'colors', stage: 1 },
  { id: 's1-colors-white', en: 'white', zh: '白色', color: '#fafafa', category: 'colors', stage: 1 },
  { id: 's1-colors-black', en: 'black', zh: '黑色', color: '#3b3b3b', category: 'colors', stage: 1 },
  { id: 's1-colors-pink', en: 'pink', zh: '粉色', color: '#ff9ebb', category: 'colors', stage: 1 },
  { id: 's1-colors-orange2', en: 'orange', zh: '橙色', color: '#ffa45b', category: 'colors', stage: 1 },
  { id: 's1-colors-purple', en: 'purple', zh: '紫色', color: '#9b7ede', category: 'colors', stage: 1 },

  // 🖐️ 身体部位
  { id: 's1-body-eye', en: 'eye', zh: '眼睛', emoji: '👁️', category: 'body', stage: 1 },
  { id: 's1-body-nose', en: 'nose', zh: '鼻子', emoji: '👃', category: 'body', stage: 1 },
  { id: 's1-body-mouth', en: 'mouth', zh: '嘴巴', emoji: '👄', category: 'body', stage: 1 },
  { id: 's1-body-ear', en: 'ear', zh: '耳朵', emoji: '👂', category: 'body', stage: 1 },
  { id: 's1-body-hand', en: 'hand', zh: '小手', emoji: '✋', category: 'body', stage: 1 },
  { id: 's1-body-foot', en: 'foot', zh: '小脚', emoji: '🦶', category: 'body', stage: 1 },

  /* ============ 阶段二：场景词汇期 ============ */

  // 🧸 玩具物品
  { id: 's2-toys-ball', en: 'ball', zh: '皮球', emoji: '⚽', category: 'toys', stage: 2 },
  { id: 's2-toys-car', en: 'car', zh: '小汽车', emoji: '🚗', category: 'toys', stage: 2 },
  { id: 's2-toys-doll', en: 'doll', zh: '娃娃', emoji: '🪆', category: 'toys', stage: 2 },
  { id: 's2-toys-book', en: 'book', zh: '书本', emoji: '📖', category: 'toys', stage: 2 },
  { id: 's2-toys-pencil', en: 'pencil', zh: '铅笔', emoji: '✏️', category: 'toys', stage: 2 },
  { id: 's2-toys-bag', en: 'bag', zh: '书包', emoji: '🎒', category: 'toys', stage: 2 },
  { id: 's2-toys-chair', en: 'chair', zh: '椅子', emoji: '🪑', category: 'toys', stage: 2 },
  { id: 's2-toys-table', en: 'table', zh: '桌子', emoji: '🍽️', category: 'toys', stage: 2 },
  { id: 's2-toys-bed', en: 'bed', zh: '小床', emoji: '🛏️', category: 'toys', stage: 2 },
  { id: 's2-toys-door', en: 'door', zh: '门', emoji: '🚪', category: 'toys', stage: 2 },
  { id: 's2-toys-window', en: 'window', zh: '窗户', emoji: '🪟', category: 'toys', stage: 2 },
  { id: 's2-toys-box', en: 'box', zh: '箱子', emoji: '📦', category: 'toys', stage: 2 },
  { id: 's2-toys-block', en: 'block', zh: '积木', emoji: '🧩', category: 'toys', stage: 2 },
  { id: 's2-toys-balloon', en: 'balloon', zh: '气球', emoji: '🎈', category: 'toys', stage: 2 },
  { id: 's2-toys-phone', en: 'phone', zh: '手机', emoji: '📱', category: 'toys', stage: 2 },
  { id: 's2-toys-cup', en: 'cup', zh: '水杯', emoji: '🥤', category: 'toys', stage: 2 },
  { id: 's2-toys-spoon', en: 'spoon', zh: '勺子', emoji: '🥄', category: 'toys', stage: 2 },
  { id: 's2-toys-fork', en: 'fork', zh: '叉子', emoji: '🍴', category: 'toys', stage: 2 },
  { id: 's2-toys-hat', en: 'hat', zh: '帽子', emoji: '🎩', category: 'toys', stage: 2 },
  { id: 's2-toys-shoe', en: 'shoe', zh: '鞋子', emoji: '👟', category: 'toys', stage: 2 },

  // 👨‍👩‍👧 人物
  { id: 's2-people-mom', en: 'mom', zh: '妈妈', emoji: '👩', category: 'people', stage: 2 },
  { id: 's2-people-dad', en: 'dad', zh: '爸爸', emoji: '👨', category: 'people', stage: 2 },
  { id: 's2-people-baby', en: 'baby', zh: '宝宝', emoji: '👶', category: 'people', stage: 2 },
  { id: 's2-people-boy', en: 'boy', zh: '男孩', emoji: '👦', category: 'people', stage: 2 },
  { id: 's2-people-girl', en: 'girl', zh: '女孩', emoji: '👧', category: 'people', stage: 2 },
  { id: 's2-people-grandma', en: 'grandma', zh: '奶奶', emoji: '👵', category: 'people', stage: 2 },
  { id: 's2-people-grandpa', en: 'grandpa', zh: '爷爷', emoji: '👴', category: 'people', stage: 2 },
  { id: 's2-people-friend', en: 'friend', zh: '朋友', emoji: '🧑‍🤝‍🧑', category: 'people', stage: 2 },
  { id: 's2-people-teacher', en: 'teacher', zh: '老师', emoji: '🧑‍🏫', category: 'people', stage: 2 },
  { id: 's2-people-kid', en: 'kid', zh: '小朋友', emoji: '🧒', category: 'people', stage: 2 },

  // 🔢 数字 1-10
  { id: 's2-numbers-one', en: 'one', zh: '一', text: '1', category: 'numbers', stage: 2 },
  { id: 's2-numbers-two', en: 'two', zh: '二', text: '2', category: 'numbers', stage: 2 },
  { id: 's2-numbers-three', en: 'three', zh: '三', text: '3', category: 'numbers', stage: 2 },
  { id: 's2-numbers-four', en: 'four', zh: '四', text: '4', category: 'numbers', stage: 2 },
  { id: 's2-numbers-five', en: 'five', zh: '五', text: '5', category: 'numbers', stage: 2 },
  { id: 's2-numbers-six', en: 'six', zh: '六', text: '6', category: 'numbers', stage: 2 },
  { id: 's2-numbers-seven', en: 'seven', zh: '七', text: '7', category: 'numbers', stage: 2 },
  { id: 's2-numbers-eight', en: 'eight', zh: '八', text: '8', category: 'numbers', stage: 2 },
  { id: 's2-numbers-nine', en: 'nine', zh: '九', text: '9', category: 'numbers', stage: 2 },
  { id: 's2-numbers-ten', en: 'ten', zh: '十', text: '10', category: 'numbers', stage: 2 },

  // 🌞 天气&时间
  { id: 's2-weather-sun', en: 'sun', zh: '太阳', emoji: '☀️', category: 'weather', stage: 2 },
  { id: 's2-weather-moon', en: 'moon', zh: '月亮', emoji: '🌙', category: 'weather', stage: 2 },
  { id: 's2-weather-star', en: 'star', zh: '星星', emoji: '⭐', category: 'weather', stage: 2 },
  { id: 's2-weather-rain', en: 'rain', zh: '下雨', emoji: '🌧️', category: 'weather', stage: 2 },
  { id: 's2-weather-cloud', en: 'cloud', zh: '白云', emoji: '☁️', category: 'weather', stage: 2 },
  { id: 's2-weather-hot', en: 'hot', zh: '好热', emoji: '🥵', category: 'weather', stage: 2 },
  { id: 's2-weather-cold', en: 'cold', zh: '好冷', emoji: '🥶', category: 'weather', stage: 2 },
  { id: 's2-weather-morning', en: 'morning', zh: '早晨', emoji: '🌅', category: 'weather', stage: 2 },
  { id: 's2-weather-night', en: 'night', zh: '夜晚', emoji: '🌃', category: 'weather', stage: 2 },
  { id: 's2-weather-day', en: 'day', zh: '白天', emoji: '🌞', category: 'weather', stage: 2 },

  // ✋ 动作动词
  { id: 's2-actions-run', en: 'run', zh: '跑步', emoji: '🏃', category: 'actions', stage: 2 },
  { id: 's2-actions-jump', en: 'jump', zh: '跳跃', emoji: '🤸', category: 'actions', stage: 2 },
  { id: 's2-actions-hop', en: 'hop', zh: '单脚跳', emoji: '🦘', category: 'actions', stage: 2 },
  { id: 's2-actions-stop', en: 'stop', zh: '停一停', emoji: '🛑', category: 'actions', stage: 2 },
  { id: 's2-actions-go', en: 'go', zh: '出发', emoji: '🚦', category: 'actions', stage: 2 },
  { id: 's2-actions-sit', en: 'sit', zh: '坐下', emoji: '🧎', category: 'actions', stage: 2 },
  { id: 's2-actions-stand', en: 'stand', zh: '站立', emoji: '🧍', category: 'actions', stage: 2 },
  { id: 's2-actions-clap', en: 'clap', zh: '拍手', emoji: '👏', category: 'actions', stage: 2 },
  { id: 's2-actions-wave', en: 'wave', zh: '挥手', emoji: '👋', category: 'actions', stage: 2 },
  { id: 's2-actions-touch', en: 'touch', zh: '摸一摸', emoji: '👉', category: 'actions', stage: 2 },
  { id: 's2-actions-open', en: 'open', zh: '打开', emoji: '📂', category: 'actions', stage: 2 },
  { id: 's2-actions-close', en: 'close', zh: '关上', emoji: '📁', category: 'actions', stage: 2 },
  { id: 's2-actions-eat', en: 'eat', zh: '吃东西', emoji: '😋', category: 'actions', stage: 2 },
  { id: 's2-actions-drink', en: 'drink', zh: '喝水', emoji: '🧋', category: 'actions', stage: 2 },
  { id: 's2-actions-sleep', en: 'sleep', zh: '睡觉', emoji: '😴', category: 'actions', stage: 2 },

  /* ============ 阶段三：简单表达期 ============ */

  // 🪴 户外自然
  { id: 's3-nature-tree', en: 'tree', zh: '大树', emoji: '🌳', category: 'nature', stage: 3 },
  { id: 's3-nature-flower', en: 'flower', zh: '花朵', emoji: '🌸', category: 'nature', stage: 3 },
  { id: 's3-nature-grass', en: 'grass', zh: '小草', emoji: '🌿', category: 'nature', stage: 3 },
  { id: 's3-nature-rock', en: 'rock', zh: '石头', emoji: '🪨', category: 'nature', stage: 3 },
  { id: 's3-nature-sand', en: 'sand', zh: '沙子', emoji: '🏖️', category: 'nature', stage: 3 },
  { id: 's3-nature-sea', en: 'sea', zh: '大海', emoji: '🌊', category: 'nature', stage: 3 },
  { id: 's3-nature-butterfly', en: 'butterfly', zh: '蝴蝶', emoji: '🦋', category: 'nature', stage: 3 },
  { id: 's3-nature-ant', en: 'ant', zh: '蚂蚁', emoji: '🐜', category: 'nature', stage: 3 },
  { id: 's3-nature-bee', en: 'bee', zh: '蜜蜂', emoji: '🐝', category: 'nature', stage: 3 },
  { id: 's3-nature-snow', en: 'snow', zh: '下雪', emoji: '❄️', category: 'nature', stage: 3 },
  { id: 's3-nature-wind', en: 'wind', zh: '风', emoji: '🌬️', category: 'nature', stage: 3 },
  { id: 's3-nature-hill', en: 'hill', zh: '小山', emoji: '⛰️', category: 'nature', stage: 3 },
  { id: 's3-nature-lake', en: 'lake', zh: '湖泊', emoji: '🏞️', category: 'nature', stage: 3 },
  { id: 's3-nature-leaf', en: 'leaf', zh: '树叶', emoji: '🍃', category: 'nature', stage: 3 },
  { id: 's3-nature-fruit', en: 'fruit', zh: '水果', emoji: '🍒', category: 'nature', stage: 3 },
  { id: 's3-nature-vegetable', en: 'vegetable', zh: '蔬菜', emoji: '🥦', category: 'nature', stage: 3 },
  { id: 's3-nature-sky', en: 'sky', zh: '天空', emoji: '🌤️', category: 'nature', stage: 3 },

  // 🧣 衣物
  { id: 's3-clothes-shirt', en: 'shirt', zh: '衬衫', emoji: '👔', category: 'clothes', stage: 3 },
  { id: 's3-clothes-coat', en: 'coat', zh: '外套', emoji: '🧥', category: 'clothes', stage: 3 },
  { id: 's3-clothes-dress', en: 'dress', zh: '裙子', emoji: '👗', category: 'clothes', stage: 3 },
  { id: 's3-clothes-sock', en: 'sock', zh: '袜子', emoji: '🧦', category: 'clothes', stage: 3 },
  { id: 's3-clothes-pants', en: 'pants', zh: '裤子', emoji: '👖', category: 'clothes', stage: 3 },
  { id: 's3-clothes-cap', en: 'cap', zh: '鸭舌帽', emoji: '🧢', category: 'clothes', stage: 3 },
  { id: 's3-clothes-glove', en: 'glove', zh: '手套', emoji: '🧤', category: 'clothes', stage: 3 },
  { id: 's3-clothes-scarf', en: 'scarf', zh: '围巾', emoji: '🧣', category: 'clothes', stage: 3 },
  { id: 's3-clothes-shorts', en: 'shorts', zh: '短裤', emoji: '🩳', category: 'clothes', stage: 3 },
  { id: 's3-clothes-hat2', en: 'hat', zh: '草帽', emoji: '👒', category: 'clothes', stage: 3 },
  { id: 's3-clothes-sweater', en: 'sweater', zh: '毛衣', emoji: '🧶', category: 'clothes', stage: 3 },
  { id: 's3-clothes-boot', en: 'boot', zh: '靴子', emoji: '🥾', category: 'clothes', stage: 3 },
  { id: 's3-clothes-skirt', en: 'skirt', zh: '短裙', emoji: '🩱', category: 'clothes', stage: 3 },
  { id: 's3-clothes-pajamas', en: 'pajamas', zh: '睡衣', emoji: '🛌', category: 'clothes', stage: 3 },

  // 🥰 情绪形容词
  { id: 's3-emotions-happy', en: 'happy', zh: '开心', emoji: '😊', category: 'emotions', stage: 3 },
  { id: 's3-emotions-sad', en: 'sad', zh: '难过', emoji: '😢', category: 'emotions', stage: 3 },
  { id: 's3-emotions-angry', en: 'angry', zh: '生气', emoji: '😠', category: 'emotions', stage: 3 },
  { id: 's3-emotions-tired', en: 'tired', zh: '困了', emoji: '😪', category: 'emotions', stage: 3 },
  { id: 's3-emotions-hungry', en: 'hungry', zh: '饿了', emoji: '😋', category: 'emotions', stage: 3 },
  { id: 's3-emotions-full', en: 'full', zh: '吃饱啦', emoji: '🤤', category: 'emotions', stage: 3 },
  { id: 's3-emotions-hot2', en: 'hot', zh: '热', emoji: '🥵', category: 'emotions', stage: 3 },
  { id: 's3-emotions-cold2', en: 'cold', zh: '冷', emoji: '🥶', category: 'emotions', stage: 3 },
  { id: 's3-emotions-big', en: 'big', zh: '大大的', emoji: '🐘', category: 'emotions', stage: 3 },
  { id: 's3-emotions-small', en: 'small', zh: '小小的', emoji: '🐭', category: 'emotions', stage: 3 },
  { id: 's3-emotions-long', en: 'long', zh: '长长的', emoji: '🦒', category: 'emotions', stage: 3 },
  { id: 's3-emotions-short', en: 'short', zh: '短短的', emoji: '🦔', category: 'emotions', stage: 3 },
  { id: 's3-emotions-fast', en: 'fast', zh: '快快的', emoji: '🏎️', category: 'emotions', stage: 3 },
  { id: 's3-emotions-slow', en: 'slow', zh: '慢慢的', emoji: '🐢', category: 'emotions', stage: 3 },
  { id: 's3-emotions-good', en: 'good', zh: '真棒', emoji: '👍', category: 'emotions', stage: 3 },

  // 🏃 动词&短语
  { id: 's3-verbs-dance', en: 'dance', zh: '跳舞', emoji: '💃', category: 'verbs', stage: 3 },
  { id: 's3-verbs-sing', en: 'sing', zh: '唱歌', emoji: '🎤', category: 'verbs', stage: 3 },
  { id: 's3-verbs-draw', en: 'draw', zh: '画画', emoji: '🖍️', category: 'verbs', stage: 3 },
  { id: 's3-verbs-help', en: 'help', zh: '帮忙', emoji: '🤝', category: 'verbs', stage: 3 },
  { id: 's3-verbs-look', en: 'look', zh: '看', emoji: '👀', category: 'verbs', stage: 3 },
  { id: 's3-verbs-see', en: 'see', zh: '看见', emoji: '🙈', category: 'verbs', stage: 3 },
  { id: 's3-verbs-hear', en: 'hear', zh: '听到', emoji: '👂', category: 'verbs', stage: 3 },
  { id: 's3-verbs-play', en: 'play', zh: '玩', emoji: '🎮', category: 'verbs', stage: 3 },
  { id: 's3-verbs-wash', en: 'wash', zh: '洗一洗', emoji: '🧼', category: 'verbs', stage: 3 },
  { id: 's3-verbs-clean', en: 'clean', zh: '打扫', emoji: '🧹', category: 'verbs', stage: 3 },
  { id: 's3-verbs-give', en: 'give', zh: '给', emoji: '🎁', category: 'verbs', stage: 3 },
  { id: 's3-verbs-take', en: 'take', zh: '拿', emoji: '🖐️', category: 'verbs', stage: 3 },
  { id: 's3-verbs-push', en: 'push', zh: '推', emoji: '🫸', category: 'verbs', stage: 3 },
  { id: 's3-verbs-pull', en: 'pull', zh: '拉', emoji: '🫷', category: 'verbs', stage: 3 },
  { id: 's3-verbs-find', en: 'find', zh: '找一找', emoji: '🔍', category: 'verbs', stage: 3 },
  { id: 's3-verbs-show', en: 'show', zh: '展示', emoji: '🙋', category: 'verbs', stage: 3 },
  { id: 's3-verbs-wait', en: 'wait', zh: '等一等', emoji: '⌛', category: 'verbs', stage: 3 },
  { id: 's3-verbs-smile', en: 'smile', zh: '微笑', emoji: '😀', category: 'verbs', stage: 3 },
  { id: 's3-verbs-cry', en: 'cry', zh: '哭', emoji: '😭', category: 'verbs', stage: 3 },
  { id: 's3-verbs-walk', en: 'walk', zh: '散步', emoji: '🚶', category: 'verbs', stage: 3 },

  /* ============ 阶段四：综合巩固期 ============ */

  // 🚌 交通工具
  { id: 's4-transport-bus', en: 'bus', zh: '公交车', emoji: '🚌', category: 'transport', stage: 4 },
  { id: 's4-transport-car2', en: 'car', zh: '小汽车', emoji: '🚙', category: 'transport', stage: 4 },
  { id: 's4-transport-train', en: 'train', zh: '火车', emoji: '🚆', category: 'transport', stage: 4 },
  { id: 's4-transport-bike', en: 'bike', zh: '自行车', emoji: '🚲', category: 'transport', stage: 4 },
  { id: 's4-transport-plane', en: 'plane', zh: '飞机', emoji: '✈️', category: 'transport', stage: 4 },
  { id: 's4-transport-ship', en: 'ship', zh: '轮船', emoji: '🚢', category: 'transport', stage: 4 },

  // 📍 方位词
  { id: 's4-position-in', en: 'in', zh: '在里面', emojis: ['🐻', '📦'], text: 'in', category: 'position', stage: 4 },
  { id: 's4-position-on', en: 'on', zh: '在上面', emojis: ['🐻', '🪑'], text: 'on', category: 'position', stage: 4 },
  { id: 's4-position-under', en: 'under', zh: '在下面', emojis: ['🐻', '🛏️'], text: 'under', category: 'position', stage: 4 },
]
