import { ReportBoxMetaDataGenerator } from '../src/report-box-metadata'
import { ReportBoxVerifiedReport } from '../src/report-box-verified-report'

describe('serialize', () => {
  test('Should return serialized data', () => {
    const generator = new ReportBoxMetaDataGenerator('abc123')

    expect(generator.serialize()).toEqual({
      metaDataVersion: 1,
      schemaId: 'abc123',
      createdAtUtc: expect.any(String)
    })
  })
})

describe('build', () => {
  test('Should return a report object with metadatas', () => {
    const generator = new ReportBoxMetaDataGenerator('abc123')
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerified()

    expect(generator.build(verifiedReport)).toEqual({
      foo: 'bar',
      reportBoxMeta: {
        metaDataVersion: 1,
        schemaId: 'abc123',
        createdAtUtc: expect.any(String)
      }
    })
  })
})
