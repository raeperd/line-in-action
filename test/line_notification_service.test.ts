import * as line from '../src/service/line_notification_service'

const service = new line.NotificationService()

test('when send with invalid token expect failed', async () => {
  const notification = {
    token: 'invalid token',
    message: 'some message'
  }
  expect((await service.sendNotification(notification)).status).not.toBe(200)
})
