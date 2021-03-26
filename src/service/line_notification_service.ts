import {HttpClient} from 'typed-rest-client/HttpClient'
import {IHeaders} from 'typed-rest-client/Interfaces'
import {stringify} from 'querystring'

export class NotificationService {
  client: HttpClient

  constructor() {
    this.client = new HttpClient('agent')
  }

  public sendNotification(notification: NotificationDTO): Promise<NotificationResultDTO> {
    const header = this.headersFromNotificationDTO(notification)
    return this.client
      .post(NOTIFY_SERVICE_URL, stringify(notification as LineNotifictaionDTO), header)
      .then(response => response.readBody())
      .then(responseBody => JSON.parse(responseBody) as NotificationResultDTO)
  }

  private headersFromNotificationDTO(notification: NotificationDTO): IHeaders {
    return {
      Authorization: `Bearer ${notification.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

export type NotificationResultDTO = {
  status: number
  message: string
}

export type NotificationDTO = LineNotifictaionDTO & {token: string}

type LineNotifictaionDTO = {
  message: string
  notificationDisabled: boolean
}

const NOTIFY_SERVICE_URL = 'https://notify-api.line.me/api/notify'
