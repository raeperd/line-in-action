import {when} from 'jest-when'
import {getInput} from '@actions/core'

import {GitHubActionInputDTO, GitHubActionInputParser} from '../src/github_action_input_parser'

jest.mock('@actions/core')
const mockedGetInput = mockFunction(getInput)

export function mockFunction<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>
}

const parser = new GitHubActionInputParser()

test('when parseInput expect getInput called with input arguments', () => {
  mockedGetInput.mockReturnValue('')

  parser.parseInput()

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

  expect(parser.parseInput()).toMatchObject(mockedDTO)
})
