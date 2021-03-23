import * as core from '@actions/core'
import request from 'request'

const TARGET_URL = 'https://notify-api.line.me/api/notify'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    request.post(
      TARGET_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        form: {
          message: `Action run by ${process.env.GITHUB_ACTOR}`
        }
      },
      (error, resposne, body) => {
        core.debug(body)
      }
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
