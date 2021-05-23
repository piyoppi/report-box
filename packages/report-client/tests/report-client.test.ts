import { ReportClient } from '../src/report-client'

const baseUrl = 'http://report.example.com'
const id = 'abc'
const data = {
  foo: 'bar'
}

let fetchMock = null as any

beforeEach(() => {
  fetchMock = jest.fn().mockImplementation(() => {
    return Promise.resolve()
  })

  Object.defineProperty(window, 'fetch', {
    writable: true,
    value: fetchMock
  })
})

describe('getReportUrl', () => {
  test('Should return report url', () => {
    const client = new ReportClient(baseUrl)

    expect(client.getReportUrl(id)).toEqual(`${baseUrl}/surveys/${id}/report`)
  })
})

describe('submit', () => {
  test('Should submit a report', () => {
    const client = new ReportClient(baseUrl)
    client.submit(id, data)

    expect(fetchMock).toHaveBeenCalledWith(client.getReportUrl(id), expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client.report.serialize())
    }))
  })
})
