import {LINEMessage, LINEMessageVO} from '../src/line_message'
import {LINENotifyService} from '../src/line_notify_service'

const service = new LINENotifyService()

test('when send with invalid token expect failed', async () => {
  const messageVO: LINEMessageVO = {
    token: 'invalid token',
    message: 'some message',
    notificationDisabled: 'true'
  }
  const message = new LINEMessage(messageVO)
  expect((await service.sendNotification(message)).status).not.toBe(200)
})
