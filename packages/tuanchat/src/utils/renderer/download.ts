import axios from 'axios'
import { saveAs } from 'file-saver'

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
