import { uploadImage } from './fileOperator'
import { editScene, createPreview } from './game'

interface Game {
  name: string
  description: string
}

export class Renderer {
  lineNumber: number = 0
  game: Game = {
    name: 'Default Game',
    description: 'This is a default game'
  }
  textForRenderer = 'intro:你好|欢迎来到 WebGAL 的世界;'

  constructor(roomId: number) {
    this.lineNumber = 0
    this.game = {
      name: `preview_${roomId}`,
      description: `This is game preview of ${roomId}`
    }
    createPreview(roomId)
  }

  public addDialog(roleId: number, roleName: string, avatarId: number, text: string) {
    this.addLineToRenderer(`changeFigure:role_${roleId}_sprites_${avatarId}.png -left -next;`)
    this.addLineToRenderer(`${roleName}: ${text}`)
    this.lineNumber += 2
  }

  private async addLineToRenderer(line: string) {
    this.textForRenderer = `${this.textForRenderer}\n${line}`
    editScene(this.game.name, 'start', this.textForRenderer)
  }

  public async uploadSprites(url: string, spritesName: string) {
    const path = `games/${this.game.name}/game/figure/`
    return await uploadImage(url, path, `${spritesName}.png`)
  }
}
