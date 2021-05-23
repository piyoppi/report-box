import { postMessageToParent } from '../src/message-to-parent'

describe('postMessageToParent', () => {
  test('Should post message', () => {
    const postMessageMock = jest.fn()
    Object.defineProperty(window, 'parent', {
      writable: true,
      value: {
        postMessage: postMessageMock,
        origin: 'http://parent.example.com'
      }
    })

    postMessageToParent('readyToReceiveSignedParameters', 'http://parent.example.com')

    expect(postMessageMock).toBeCalledWith({event: 'readyToReceiveSignedParameters'}, 'http://parent.example.com')
  })
})
