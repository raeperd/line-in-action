import {setFailed} from '@actions/core'
import {parseGitHubActionInput} from './github_action_input_parser'
import {LINENotifyService} from './line_notify_service'

const service = new LINENotifyService()

function run() {
  parseGitHubActionInput()
    .then(actionInput => service.sendNotification(actionInput))
    .then(response => {
      if (response.status != 200) {
        setFailed(`Send Notification Failed ${response.message} with ${response.status}`)
      }
    })
    .catch(error => setFailed(error))
}

run()
