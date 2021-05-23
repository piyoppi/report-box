import { iframeGetMessageHandler } from '../src/iframe-get-message-handler'
import { ReportClient } from '../src/report-client'

const signedParameters = 'signed-parameters'
const message = {
  origin: 'http://localhost',
  data: signedParameters
}

describe('iframeGetMessageHandler', () => {
  test('Should set received datas to a client', () => {
    const client = new ReportClient('http://report.example.com')
    iframeGetMessageHandler('http://localhost', client, message as any)

    expect(client.report.signedParameters).toEqual(signedParameters)
  })

  test('Should throw an error when invalid origin is given', () => {
    const client = new ReportClient('http://report.example.com')

    expect(() => iframeGetMessageHandler('http://localhost', client, {...message, origin: 'http://invalid.example.com'} as any)).toThrow()
  })
})
