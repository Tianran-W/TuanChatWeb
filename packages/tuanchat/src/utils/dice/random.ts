import pinia from '@/stores'
import { useRoomStore, useRoleStore } from '@/stores'
function getRandomNum(min: number, max: number): number {
  const range = max - min
  const rand = Math.random()
  return min + Math.round(rand * range)
}

export function rollDice(sides: number, count: number): number {
  let result = 0
  for (let i = 0; i < count; i++) {
    result += getRandomNum(1, sides)
  }
  return result
}

export function rollAttr(attr: string): { success: boolean; result: number; attrValue: number } {
  const roomStore = useRoomStore(pinia)
  const roleStore = useRoleStore(pinia)

  const roleId = roomStore.role?.roleId
  const roleInfo = roleStore.roleAbility.get(roleId!)
  const enAttr = getFieldName(attr)

  const roleAbilityAsRecord = roleInfo as Record<string, number>
  const abilityDict = Object.entries(roleAbilityAsRecord).filter(([key]) => key !== 'roleId')
  const found = abilityDict.find(([key]) => key === enAttr)
  if (found) {
    return { success: true, result: rollDice(100, 1), attrValue: found[1] }
  }
  return { success: false, result: 0, attrValue: 0 }
}

export function getFieldName(attribute: String) {
  switch (attribute) {
    case '力量':
      return 'strength'
    case '敏捷':
      return 'dexterity'
    case '意志':
      return 'willpower'
    case '体质':
      return 'constitution'
    case '外貌':
      return 'appearance'
    case '教育':
      return 'education'
    case '体型':
      return 'size'
    case '智力':
      return 'intelligence'
    case '灵感': // 假设灵感与intelligence是对应的
      return 'intelligence'
    case '幸运':
      return 'luck'
    case '运气': // 假设运气也是luck
      return 'luck'
    case '魔法': // 假设魔法值
      return 'magicPoints'
    case '体力': // 假设生命值
      return 'healthPoints'
    case '会计':
      return 'accounting'
    case '人类学':
      return 'anthropology'
    case '估价':
      return 'appraisal'
    case '考古学':
      return 'archaeology'
    case '表演':
      return 'acting'
    case '魅惑':
      return 'charm'
    case '攀爬':
      return 'climb'
    case '计算机使用':
      return 'computerUse'
    case '电脑':
      return 'computerUse'
    case '信誉':
      return 'creditRating'
    case '克苏鲁':
      return 'cthulhuMythos'
    case '乔装':
      return 'disguise'
    case '闪避':
      return 'dodge'
    case '驾驶':
      return 'drive'
    case '电气维修':
      return 'electricRepair'
    case '电子学':
      return 'electronics'
    case '话术':
      return 'fastTalk'
    case '斗殴':
      return 'fistfight'
    case '手枪':
      return 'firearms'
    case '急救':
      return 'firstAid'
    case '历史':
      return 'history'
    case '恐吓':
      return 'intimidate'
    case '跳跃':
      return 'jump'
    case '英语':
      return 'english'
    case '母语':
      return 'english'
    case '法律':
      return 'law'
    case '图书馆使用':
      return 'libraryUse'
    case '聆听':
      return 'listen'
    case '开锁':
      return 'locksmith'
    case '机械维修':
      return 'machineRepair'
    case '医学':
      return 'medicine'
    case '博物学':
      return 'naturalWorld'
    case '自然学':
      return 'naturalWorld'
    case '导航':
      return 'navigation'
    case '神秘学':
      return 'occult'
    case '操作重型机械':
      return 'drive'
    case '说服':
      return 'persuade'
    case '精神分析':
      return 'psychology'
    case '心理学':
      return 'psychology'
    case '骑术':
      return 'ride'
    case '药学':
      return 'pharmacy'
    case '妙手':
      return 'sleightOfHand'
    case '侦查':
      return 'investigation'
    case '潜行':
      return 'stealth'
    case '生存':
      return 'survival'
    case '游泳':
      return 'swim'
    case '投掷':
      return 'throwAbility'
    case '追踪':
      return 'track'
    case '驯兽':
      return 'demolition'
    case '潜水':
      return 'swim'
    case '爆破':
      return 'demolition'
    case '读唇':
      return 'lipReading'
    case '催眠':
      return 'hypnosis'
    case '炮术':
      return 'artillery'
    case '信用':
      return 'creditRating'
    case '信用评级': // 信用评级可能与信用一致
      return 'creditRating'
    case '克苏鲁神话':
      return 'cthulhuMythos'
    case '汽车': // 假设汽车与驾驶相同
      return 'drive'
    case '汽车驾驶':
      return 'drive'
    case '图书馆': // 图书馆使用
      return 'libraryUse'
    case '撬锁': // 锁匠
      return 'locksmith'
    case '锁匠':
      return 'locksmith'
    case '领航': // 导航
      return 'navigation'
    case '重型操作': // 重型操作可能属于驾驶
      return 'drive'
    case '重型机械': // 重型机械可能属于驾驶
      return 'drive'
    case '重型': // 重型可能对应于驾驶
      return 'drive'
    case 'str': // str 可能对应于力量
      return 'strength'
    case 'dex': // dex 可能对应于敏捷
      return 'dexterity'
    case 'pow': // pow 可能对应于意志
      return 'willpower'
    case 'con': // con 可能对应于体质
      return 'constitution'
    case 'app':
      return 'appearance'
    case 'edu': // edu 可能对应于教育
      return 'education'
    case 'siz': // siz 可能对应于体型
      return 'size'
    case 'int': // int 可能对应于智力
      return 'intelligence'
    case 'san': // san 可能对应于理智
      return 'sanity'
    case '理智': // 理智可能对应于sanity
      return 'sanity'
    case '理智值': // 理智值可能对应于sanity
      return 'sanity'
    case 'mp': // mp 可能对应于魔法值
      return 'magicPoints'
    case 'hp': // hp 可能对应于生命值
      return 'healthPoints'
    case 'cm': // cm 假设同体型可能对应
      return 'size'
    case '计算机':
      return 'computerUse'
    default:
      return null
  }
}
