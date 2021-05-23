jest.mock('../src/iframe-get-message-handler')

import { iframeGetMessageHandler } from '../src/iframe-get-message-handler'
import { registerGetMessageHandler } from '../src/iframe-handler'
import { ReportClient } from '../src/report-client'

describe('registerGetMessageHandler', () => {
  let addEventListenerMock = null as any
  let eventHandler = null as any
  const iframeParentOrigin = 'http://iframe-parent.example.com'

  beforeEach(() => {
    addEventListenerMock = jest.fn().mockImplementation((_, handler) => {
      eventHandler = handler
    })

    Object.defineProperty(window, 'addEventListener', {
      writable: true,
      value: addEventListenerMock
    })
  })

  test('Should set event', () => {
    const client = new ReportClient('http://report.example.com')
    registerGetMessageHandler('http://iframe-parent.example.com', client)

    expect(addEventListenerMock).toHaveBeenCalled()
  })

  test('Should call iframeGetMessageHandler', () => {
    const client = new ReportClient('http://report.example.com')
    const eventVariable = {origin: iframeParentOrigin}
    registerGetMessageHandler(iframeParentOrigin, client)

    eventHandler(eventVariable)
    expect(iframeGetMessageHandler).toHaveBeenCalledWith(iframeParentOrigin, client, eventVariable)
  })
})
