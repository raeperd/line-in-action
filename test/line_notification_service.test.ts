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
