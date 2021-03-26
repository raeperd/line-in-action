import * as core from '@actions/core'
import {NotificationDTO, NotificationService} from './service/line_notification_service'

const service = new NotificationService()

async function run(): Promise<void> {
  const notification: NotificationDTO = {
    token: core.getInput('token'),
    message: `Action run by ${process.env.GITHUB_ACTOR}`
  }
  try {
    const response = await service.sendNotification(notification)
    if (response.status != 200) {
      core.setFailed(`${response.message} with ${notification.token}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
