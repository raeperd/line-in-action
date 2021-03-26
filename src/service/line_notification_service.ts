import {HttpClient} from 'typed-rest-client/HttpClient'
import {stringify} from 'querystring'

export class NotificationService {
  client: HttpClient

  constructor() {
    this.client = new HttpClient('agent')
  }

  public sendNotification(notification: NotificationDTO): Promise<NotificationResultDTO> {
    const header = {
      Authorization: `Bearer ${notification.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.client
      .post(NOTIFY_SERVICE_URL, stringify({message: notification.message}), header)
      .then(response => response.readBody())
      .then(responseBody => JSON.parse(responseBody) as NotificationResultDTO)
  }
}

export type NotificationDTO = {
  token: string
  message: string
}

export type NotificationResultDTO = {
  status: number
  message: string
}

const NOTIFY_SERVICE_URL = 'https://notify-api.line.me/api/notify'
