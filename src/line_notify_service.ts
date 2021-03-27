import fetch from 'node-fetch'

import {LINEMessage} from './line_message'

export class LINENotifyService {
  public sendNotification(message: LINEMessage): Promise<ResultDTO> {
    const header = this.headerFromMessage(message)
    return fetch('https://notify-api.line.me/api/notify', {
      headers: header,
      method: 'POST',
      body: message.toURLSearchParams()
    }).then(response => (response.json() as unknown) as ResultDTO)
  }

  private headerFromMessage(message: LINEMessage) {
    return {
      Authorization: `Bearer ${message.getToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

export type ResultDTO = {
  status: number
  message: string
}
