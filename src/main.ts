import * as core from '@actions/core'
import {GitHubActionInputParser} from './github_action_input_parser'
import {NotificationDTO, NotificationService} from './service/line_notification_service'

const parser = new GitHubActionInputParser()
const service = new NotificationService()

async function run(): Promise<void> {
  const notification = parser.parseInput() as NotificationDTO
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
