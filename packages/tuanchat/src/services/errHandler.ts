interface TuanApiResponse {
  success?: boolean
  errCode?: number
  errMsg?: string
  data?: any
}

export const repDataHandler = (res: any) => {
  const response: TuanApiResponse = res.data
  if (response.errCode !== undefined) {
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
