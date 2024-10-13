import { InstructionEnum } from '@/enums'
import { rollDice, rollAttr } from '../dice'
import { tuanApis, type RoleAbilityTable } from '@/services'
import pinia from '@/stores'
import { useRoomStore } from '@/stores'
import { chineseToPropertyMap } from '@/enums'

export function parseInstruction(instruction: string): string {
  if (!instruction.startsWith('.') && !instruction.startsWith('。')) {
    return instruction
  }
  const tokens = instruction.split(' ')
  const instructionType = getInstructionType(tokens[0].replace(/。/g, '.'))
  switch (instructionType) {
    case InstructionEnum.DICE:
      return parseDice(tokens)
    default:
      return instruction
  }
}

function getInstructionType(instruction: string): InstructionEnum {
  if (/^.r/.test(instruction)) {
    return InstructionEnum.DICE
  }
  switch (instruction) {
    default:
      return InstructionEnum.UNKNOWN
  }
}

function parseDice(tokens: string[]): string {
  const instruction = tokens.join(' ')

  const rollDefaultMatch = /^[。.]rd$/.exec(instruction)
  if (rollDefaultMatch) {
    return `骰出了${rollDice(100, 1)}点`
  }

  const rollMatch = /^[。.]r$/.exec(instruction)
  if (rollMatch) {
    return `骰出了${rollDice(100, 1)}点`
  }

  const rollMultipleMatch = /^[。.]r(\d+)d(\d+)$/.exec(instruction)
  if (rollMultipleMatch) {
    const count = parseInt(rollMultipleMatch[1], 10)
    const sides = parseInt(rollMultipleMatch[2], 10)
    return `骰出了${rollDice(sides, count)}点`
  }

  const checkAttributeMatch = /^[。.]rc\s+([\u4e00-\u9fa5a-zA-Z0-9]+)\s*$/.exec(instruction)
  if (checkAttributeMatch) {
    const res = rollAttr(checkAttributeMatch[1])
    console.log(res)
    if (res.success) {
      if (res.result <= 100 && res.result > 95) {
        return `大失败，${res.result}/${res.attrValue}`
      } else if (res.result <= 5 && res.result >= 1) {
        return `大成功，${res.result}/${res.attrValue}`
      } else if (res.result <= 95 && res.result > res.attrValue) {
        return `失败，${res.result}/${res.attrValue}`
      } else if (res.result <= res.attrValue && res.result > res.attrValue / 2) {
        return `成功，${res.result}/${res.attrValue}`
      } else if (res.result <= res.attrValue / 2 && res.result > res.attrValue / 5) {
        return `困难成功，${res.result}/${res.attrValue}`
      } else {
        return `极难成功，${res.result}/${res.attrValue}`
      }
    } else {
      return `属性检定失败，${checkAttributeMatch[1]}不在记录的属性中`
    }
  }

  const setAttributeMatch = /^.st\s+([\u4e00-\u9fa5a-zA-Z0-9]+)\s+(-?\d+)$/.exec(instruction)
  if (setAttributeMatch) {
    const attribute = setAttributeMatch[1]
    const keyName = chineseToPropertyMap.get(attribute)
    const value = parseInt(setAttributeMatch[2], 10)

    const roomStore = useRoomStore(pinia)
    const ra: RoleAbilityTable = {
      roleId: roomStore.role?.roleId,
      [keyName as string]: value
    }
    tuanApis.setRoleAbility(ra)
    return `设置${attribute}为${value}`
  }

  return `未知指令：${instruction}`
}
