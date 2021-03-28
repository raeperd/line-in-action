import fetch from 'node-fetch'

import {GitHubActionInputDTO} from './github_action_input_parser'

export class LINENotifyService {
  public sendNotification(message: GitHubActionInputDTO): Promise<ResultDTO> {
    return fetch('https://notify-api.line.me/api/notify', {
      headers: {
        Authorization: `Bearer ${message.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: this.queryStringWithOutToken(message)
    }).then(response => (response.json() as unknown) as ResultDTO)
  }

  public queryStringWithOutToken(message: GitHubActionInputDTO): string {
    const messageAsRecord = message as Record<string, string | boolean | number>
    return Object.keys(messageAsRecord)
      .filter(key => key !== 'token')
      .filter(key => messageAsRecord[key] !== undefined)
      .map(key => `${key}=${messageAsRecord[key]}`)
      .join('&')
  }
}

export type ResultDTO = {
  status: number
  message: string
}
