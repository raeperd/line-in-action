import {when} from 'jest-when'
import {getInput} from '@actions/core'

import {GitHubActionInputDTO, parseGitHubActionInput} from '../src/github_action_input_parser'

jest.mock('@actions/core')
const mockedGetInput = mockFunction(getInput)

export function mockFunction<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>
}

test('when parseInput expect getInput called with input arguments', () => {
  mockedGetInput.mockReturnValue('')

  parseGitHubActionInput()

  expect(mockedGetInput).toHaveBeenCalledWith('token')
  expect(mockedGetInput).toHaveBeenCalledWith('message')
  expect(mockedGetInput).toHaveBeenCalledWith('notificationDisabled')
})

test('when parseInput expect GitHubActionInputDTO', () => {
  const mockedDTO: GitHubActionInputDTO = {
    token: 'TOKEN',
    message: 'MESSAGE',
    notificationDisabled: true
  }

  mockedGetInput
    .mockReturnValueOnce(mockedDTO.token)
    .mockReturnValueOnce(mockedDTO.message)
    .mockReturnValueOnce('true')

  return parseGitHubActionInput().then(data => expect(data).toMatchObject(mockedDTO))
})

test('when optional values not passed expect undefined', () => {
  const mockedDTOWithoutOptionalFields: GitHubActionInputDTO = {
    token: 'TOKEN',
    message: 'MESSAGE',
    notificationDisabled: undefined,
    stickerPackageId: undefined,
    stickerId: undefined
  }

  mockedGetInput
    .mockReturnValueOnce(mockedDTOWithoutOptionalFields.token)
    .mockReturnValueOnce(mockedDTOWithoutOptionalFields.message)
    .mockReturnValue('')

  return parseGitHubActionInput().then(data =>
    expect(data).toStrictEqual(mockedDTOWithoutOptionalFields)
  )
})

test('when optional number passed with invalid expect undefined', () => {
  mockedGetInput.mockReturnValue('SOME_MESSAGE')

  return parseGitHubActionInput().then(data => {
    expect(data.notificationDisabled).toBe(undefined)
    expect(data.stickerId).toBe(undefined)
    expect(data.stickerPackageId).toBe(undefined)
  })
})

test('when number passed with valid expect number', () => {
  mockedGetInput.mockReturnValue('11538')

  return parseGitHubActionInput().then(data => {
    expect(data.stickerPackageId).toBe(11538)
    expect(data.stickerId).toBe(11538)
  })
})
