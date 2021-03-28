import {getInput} from '@actions/core'

const TOKEN = 'token'
const MESSAGE = 'message'
const NOTIFICATION_DISABLED = 'notificationDisabled'

export function parseGitHubActionInput(): Promise<GitHubActionInputDTO> {
  return new Promise<GitHubActionInputDTO>(resolve => {
    resolve({
      token: getInput(TOKEN),
      message: getInput(MESSAGE),
      notificationDisabled: getInput(NOTIFICATION_DISABLED).toLowerCase() === 'true'
    })
  })
}

export type GitHubActionInputDTO = {
  token: string
  message: string
  notificationDisabled: boolean
}
