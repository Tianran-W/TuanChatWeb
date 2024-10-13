import type { ApiResultVoid } from './tuanchat/apis'

export const repDataHandler = (res: any) => {
  const response: ApiResultVoid = res.data
  if (response.errCode !== null && response.errCode !== undefined) {
    console.error(response)
    return Promise.reject(response)
  }
  if (!response.success) {
    return Promise.reject(response)
  }
  return Promise.resolve(res)
}

export const errHandler = (err: any) => {
  console.error(err)
}
