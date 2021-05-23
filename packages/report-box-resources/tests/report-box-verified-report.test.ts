import { ReportBoxVerifiedReport } from '../src/report-box-verified-report'

describe('setVerified', () => {
  test('Should set verified state', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerified()

    expect(verifiedReport.verified).toEqual(true)
  })

  test('Should throw an error when the report do not have inputted parameters', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    expect(() => verifiedReport.setVerified()).toThrow()
  })

  test('Should throw an error when the report is already verified', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerified()

    expect(() => verifiedReport.setVerified()).toThrow()
  })

  test('Should throw an error when the report is already rejected.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setRejected()

    expect(() => verifiedReport.setVerified()).toThrow()
  })
})

describe('setRejected', () => {
  test('Should set rejected state', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setRejected()

    expect(verifiedReport.rejected).toEqual(true)
    expect(verifiedReport.verified).toEqual(false)
  })

  test('Should throw an error when the report is already verified', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerified()

    expect(() => verifiedReport.setRejected()).toThrow()
  })
})

describe('setVerifiedDecodedSignedParameters', () => {
  test('Should throw an error when the report do not have signed parameters', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    expect(() => verifiedReport.setVerifiedDecodedSignedParameters({baz: 'hoge'})).toThrow()
  })

  test('Should throw an error when the report is already verified', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setSignedParameters('dummy')
    verifiedReport.setVerified()

    expect(() => verifiedReport.setVerifiedDecodedSignedParameters({baz: 'hoge'})).toThrow()
  })

  test('Should throw an error when the report is already rejected.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setSignedParameters('dummy')
    verifiedReport.setRejected()

    expect(() => verifiedReport.setVerifiedDecodedSignedParameters({baz: 'hoge'})).toThrow()
  })
})

describe('setInputtedParams', () => {
  test('Should set inputted parameters', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})

    expect(verifiedReport.inputtedParams).toEqual({foo: 'bar'})
  })

  test('Should throw an error when the report is already verified', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerified()

    expect(() => verifiedReport.setInputtedParams({foo: 'bar'})).toThrow()
  })

  test('Should throw an error when the report is already rejected.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setRejected()

    expect(() => verifiedReport.setInputtedParams({foo: 'bar'})).toThrow()
  })
})

describe('setSignedParameters', () => {
  test('Should set signedParameters', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setSignedParameters('signed-params')

    expect(verifiedReport.signedParameters).toEqual('signed-params')
  })

  test('Should throw an error when the report is already verified', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setSignedParameters('signed-params')
    verifiedReport.setVerified()

    expect(() => verifiedReport.setSignedParameters('dummy')).toThrow()
  })

  test('Should throw an error when the report is rejected.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setRejected()

    expect(() => verifiedReport.setSignedParameters('dummy')).toThrow()
  })
})

describe('serializeForSave', () => {
  test('Should return serialized value', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setSignedParameters('dummy')
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerifiedDecodedSignedParameters({baz: 'hoge'})
    verifiedReport.setVerified()

    expect(verifiedReport.serializeForSave()).toEqual({
      foo: 'bar',
      baz: 'hoge'
    })
  })

  test('Should throw an error when the report is not verified.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()

    verifiedReport.setSignedParameters('dummy')
    verifiedReport.setInputtedParams({foo: 'bar'})
    verifiedReport.setVerifiedDecodedSignedParameters({baz: 'hoge'})

    expect(() => verifiedReport.serializeForSave()).toThrow()
  })

  test('Should throw an error when the report is rejected.', () => {
    const verifiedReport = new ReportBoxVerifiedReport()
    verifiedReport.setRejected()

    expect(() => verifiedReport.serializeForSave()).toThrow()
  })
})

describe('fromReportRequestBody', () => {
  const signedParameters = 'signed-params'
  const inputted = {
    question1: 'foo',
    question2: 'bar'
  }

  test('Should set inputtedParams and signedParams', () => {
    const report = new ReportBoxVerifiedReport()

    report.fromReportRequestBody({
      ...inputted,
      signedParameters
    })

    expect(report.signedParameters).toEqual(signedParameters)
    expect(report.inputtedParams).toEqual(inputted)
  })

  test('Should set only inputtedParams when signedParameters is not given', () => {
    const report = new ReportBoxVerifiedReport()

    report.fromReportRequestBody(inputted)

    expect(report.signedParameters).toEqual('')
    expect(report.inputtedParams).toEqual(inputted)
  })

  test('Should throw an error when the report is rejected.', () => {
    const report = new ReportBoxVerifiedReport()
    report.setRejected()

    expect(() => report.fromReportRequestBody(inputted)).toThrow()
  })

  test('Should throw an error when the report is already valid.', () => {
    const report = new ReportBoxVerifiedReport()

    report.setInputtedParams({foo: 'bar'})
    report.setVerified()

    expect(() => report.fromReportRequestBody(inputted)).toThrow()
  })
})
