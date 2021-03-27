import {stringify} from 'querystring'
import fetch from 'node-fetch'

export class NotificationService {
  public sendNotification(notification: NotificationDTO): Promise<NotificationResultDTO> {
    const header = this.headersFromNotificationDTO(notification)
    return fetch('https://notify-api.line.me/api/notify', {
      headers: header,
      method: 'POST',
      body: stringify(notification as LineNotifictaionDTO)
    }).then(response => (response.json() as unknown) as NotificationResultDTO)
  }

  private headersFromNotificationDTO(notification: NotificationDTO) {
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
