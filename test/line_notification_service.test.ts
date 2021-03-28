import {GitHubActionInputDTO} from '../src/github_action_input_parser'
import {LINENotifyService} from '../src/line_notify_service'

const service = new LINENotifyService()

test('when send with invalid token expect failed', async () => {
  const message: GitHubActionInputDTO = {
    token: 'invalid token',
    message: 'some message',
    notificationDisabled: false
  }
  expect((await service.sendNotification(message)).status).not.toBe(200)
})

test('when queryStringWithoutToken expect stickerID valid', () => {
  const message: GitHubActionInputDTO = {
    token: 'TOKEN',
    message: 'SOME_MESSAGE',
    stickerPackageId: 100,
    stickerId: 500
  }

  expect(service.queryStringWithOutToken(message)).toBe(
    `message=${message.message}&stickerPackageId=${message.stickerPackageId}&stickerId=${message.stickerId}`
  )
})
