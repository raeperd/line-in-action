import * as core from '@actions/core'

const TOKEN = 'token'
const MESSAGE = 'message'
const NOTIFICATION_DISABLED = 'notificationDisabled'
const STICKER_PACKAGE_ID = 'stickerPackageId'
const STICKER_ID = 'stickerId'

export function parseGitHubActionInput(): Promise<GitHubActionInputDTO> {
  return new Promise<GitHubActionInputDTO>(resolve => {
    resolve({
      token: core.getInput(TOKEN),
      message: core.getInput(MESSAGE),
      notificationDisabled: getInputBooleanOrUndefined(NOTIFICATION_DISABLED),
      stickerPackageId: getInputNumberOrUndefined(STICKER_PACKAGE_ID),
      stickerId: getInputNumberOrUndefined(STICKER_ID)
    })
  }).then(data => {
    core.info(`Parsed input message: ${data.message}`)
    core.info(`Parsed input notificationDisabled: ${data.notificationDisabled}`)
    core.info(`Parsed input stickerPackageId: ${data.stickerPackageId}`)
    core.info(`Parsed input stickerId: ${data.stickerId}`)
    return data
  })
}

function getInputBooleanOrUndefined(key: string): boolean | undefined {
  const maybeBoolean = core.getInput(key).toLowerCase()
  if (maybeBoolean === 'true' || maybeBoolean === 'false') {
    return maybeBoolean === 'true'
  } else {
    return undefined
  }
}

function getInputNumberOrUndefined(key: string): number | undefined {
  const maybeNumber = Number(core.getInput(key))
  if (maybeNumber) {
    return maybeNumber
  } else {
    return undefined
  }
}

export type GitHubActionInputDTO = {
  token: string
  message: string
  notificationDisabled?: boolean
  stickerPackageId?: number
  stickerId?: number
}
