import {setFailed} from '@actions/core'
import {GitHubActionInputParser} from './github_action_input_parser'
import {LINEMessage, LINEMessageVO} from './line_message'
import {LINENotifyService} from './line_notify_service'

const parser = new GitHubActionInputParser()
const service = new LINENotifyService()

function run() {
  const githubActionInput = parser.parseInput()
  const messageVO: LINEMessageVO = {
    token: githubActionInput.token,
    message: githubActionInput.message,
    notificationDisabled: githubActionInput.notificationDisabled ? 'true' : 'false'
  }
  const message = new LINEMessage(messageVO)

  service
    .sendNotification(message)
    .then(response => {
      if (response.status != 200) {
        setFailed(`${response.message} with ${response.status}`)
      }
    })
    .catch(error => setFailed(error))
}

run()
