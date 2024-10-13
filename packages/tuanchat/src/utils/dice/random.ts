import pinia from '@/stores'
import { useRoomStore, useRoleStore } from '@/stores'
import { chineseToPropertyMap } from '@/enums'

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
  const enAttr = chineseToPropertyMap.get(attr)

  const roleAbilityAsRecord = roleInfo as Record<string, number>
  const abilityDict = Object.entries(roleAbilityAsRecord).filter(([key]) => key !== 'roleId')
  const found = abilityDict.find(([key]) => key === enAttr)
  if (found) {
    return { success: true, result: rollDice(100, 1), attrValue: found[1] }
  }
  return { success: false, result: 0, attrValue: 0 }
}
