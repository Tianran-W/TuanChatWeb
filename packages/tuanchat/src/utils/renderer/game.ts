import { terreApis } from '@/services'

export async function getGameList() {
  const res = (await terreApis.manageGameControllerGetGameList()).data
  return res.map((item) => {
    return item.name
  })
}

export async function editScene(game: string, scene: string, content: string) {
  const path = `games/${game}/game/scene/${scene}.txt`
  return (await terreApis.manageGameControllerEditTextFile({ path: path, textFile: content })).data
}

export async function createPreview(groupId: number) {
  return (
    await terreApis.manageGameControllerCreateGame({
      gameName: `preview_${groupId}`,
      templateName: 'WebGAL_Template'
    })
  ).data
}
