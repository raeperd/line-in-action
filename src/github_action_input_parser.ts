import {getInput} from '@actions/core'

const TOKEN = 'token'
const MESSAGE = 'message'
const NOTIFICATION_DISABLED = 'notificationDisabled'

export class GitHubActionInputParser {
  public parseInput(): GitHubActionInputDTO {
    return {
      token: getInput(TOKEN),
      message: getInput(MESSAGE),
      notificationDisabled: getInput(NOTIFICATION_DISABLED).toLowerCase() === 'true'
    }
  }
}

export type GitHubActionInputDTO = {
  token: string
  message: string
  notificationDisabled: boolean
}
