import axios from 'axios'
import { terreApis } from '@/services'
import { saveAs } from 'file-saver'

interface IFile {
  extName: string
  isDir: boolean
  name: string
  path: string
  pathFromBase?: string
}

export enum DebugCommand {
  // 跳转
  JUMP,
  // 同步自客户端
  SYNCFC,
  // 同步自编辑器
  SYNCFE,
  // 执行指令
  EXE_COMMAND,
  // 重新拉取模板样式文件
  REFETCH_TEMPLATE_FILES
}

export interface IDebugMessage {
  event: string
  data: {
    command: DebugCommand
    sceneMsg: {
      sentence: number
      scene: string
    }
    message: string
    stageSyncMsg: any
  }
}

interface GameInfo {
  name: string
  isDir: boolean
  extName: string
  path: string
}

export async function saveImageFromUrl(
  url: string,
  gamename: string,
  filename: string
): Promise<void> {
  try {
    // 发送GET请求获取图片
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'blob' // 重要，需要设置响应类型为blob
    })

    // 创建一个Blob对象
    const blob = new Blob([response.data], { type: 'image/png' })

    // 使用FileSaver保存图片
    saveAs(blob, `@/../../terre2/public/games/${gamename}/game/figure/${filename}`)
  } catch (error) {
    console.error('Error saving image:', error)
  }
}

export async function readDir(path: string) {
  const res = await terreApis.assetsControllerReadAssets(path)
  const data = res.data as unknown as object
  if ('dirInfo' in data && data.dirInfo) {
    const dirInfo = (data.dirInfo as IFile[]).map((item) => ({
      ...item,
      path: path + '/' + item.name
    }))
    const dirs = dirInfo.filter((item) => item.isDir)
    const files = dirInfo.filter((item) => !item.isDir).filter((e) => e.name !== '.gitkeep')
    dirs.sort((a, b) => a.name.localeCompare(b.name))
    files.sort((a, b) => a.name.localeCompare(b.name))
    return [...dirs, ...files]
  } else return []
}

export async function uploadImage(image: Blob | string, filepath: string, filename: string) {
  let blob: Blob
  if (image instanceof Blob) {
    blob = image
  } else {
    const data = (
      await axios({
        method: 'get',
        url: image,
        responseType: 'blob'
      })
    ).data
    blob = new Blob([data], { type: 'image/png' })
  }
  const file = new File([blob], filename)
  const formData = new FormData()
  formData.append('targetDirectory', filepath)
  formData.append('files', file)

  return (
    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/assets/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  ).data
}

export async function readTextFile(game: string, path: string): Promise<string> {
  const url = `http://localhost:3001/games/${game}/game/${path}`
  const data = (await axios.get(url)).data
  return data
}

export async function checkGameExist(game: string): Promise<boolean> {
  const gameList: GameInfo[] = (await terreApis.manageGameControllerGetGameList()).data
  return gameList.some((item) => item.name === game)
}

export function getAsycMsg(sceneName: string, lineNumber: number): IDebugMessage {
  return {
    event: 'message',
    data: {
      command: DebugCommand.JUMP,
      sceneMsg: {
        scene: sceneName,
        sentence: lineNumber
      },
      stageSyncMsg: {},
      message: 'Sync'
    }
  }
}
