import fetch from 'node-fetch'

import {GitHubActionInputDTO} from './github_action_input_parser'

export class LINENotifyService {
  public sendNotification(actionInput: GitHubActionInputDTO): Promise<ResultDTO> {
    actionInput.message += ` ${getActionURL()}`
    return fetch('https://notify-api.line.me/api/notify', {
      headers: {
        Authorization: `Bearer ${actionInput.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: this.queryStringWithOutToken(actionInput)
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

function getActionURL(): string {
  return `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
}

export type ResultDTO = {
  status: number
  message: string
}
