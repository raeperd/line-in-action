import {LINEMessage, LINEMessageVO} from '../src/line_message'

test('when getToken expect return same', () => {
  const messageVO = {
    token: 'SOME_TOKEN',
    message: 'SOME_MESSAGE'
  }

  const message = new LINEMessage(messageVO)

  expect(message.getToken()).toBe(messageVO.token)
})

test('when toURLSearchParams expect searchParams all keys', () => {
  const messageVO: LINEMessageVO = {
    token: 'SOME_TOKEN',
    message: 'SOME_MESSAGE'
  }

  const searchParams = new LINEMessage(messageVO).toURLSearchParams()

  expect(searchParams.toString()).toBe(`token=${messageVO.token}&message=${messageVO.message}`)
})

test('when toURLSearchParams with optional field expect all keyd', () => {
  const messageVO: LINEMessageVO = {
    token: 'SOME_TOKEN',
    message: 'SOME_MESSAGE',
    notificationDisabled: 'true'
  }

  const searchParams = new LINEMessage(messageVO).toURLSearchParams()

  expect(searchParams.toString()).toBe(
    `token=${messageVO.token}&message=${messageVO.message}&notificationDisabled=${messageVO.notificationDisabled}`
  )
})
