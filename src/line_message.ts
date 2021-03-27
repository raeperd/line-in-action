export class LINEMessage {
  contents: LINEMessageVO

  constructor(value: LINEMessageVO) {
    this.contents = value
  }
  getToken(): string {
    return this.contents.token
  }
  toURLSearchParams(): URLSearchParams {
    return new URLSearchParams(this.contents)
  }
}

export type LINEMessageVO = {
  token: string
  message: string
  notificationDisabled?: 'true' | 'false'
}
