import * as core from '@actions/core'
import {parseGitHubActionInput} from './github_action_input_parser'
import {LINENotifyService} from './line_notify_service'

const service = new LINENotifyService()

function run() {
  parseGitHubActionInput()
    .then(actionInput =>
      service.sendNotification(actionInput).then(response => {
        if (response.status != 200) {
          core.error(`Server response: ${response.status} with ${response.message}`)
          core.setFailed(`Send Notification Failed.`)
        }
      })
    )
    .catch(error => core.setFailed(error))
}

run()
