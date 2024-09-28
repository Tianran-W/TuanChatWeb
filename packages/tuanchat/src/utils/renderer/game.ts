import { terreApis } from '@/services'

export async function getGameList() {
  const res = (await terreApis.manageGameControllerGetGameList()).data
  return res.map((item) => {
    return item.name
  })
}

export async function editScene(game: string, scene: string, content: string) {
  const path = `games/${game}/game/scene/${scene}.txt`
  await terreApis.manageGameControllerEditTextFile({ path: path, textFile: content })
}
