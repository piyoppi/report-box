import { ReportBoxReport } from '../src/report-box-report'

const signedParameters = 'signed-params'
const inputted = {
  question1: 'foo',
  question2: 'bar'
}

describe('setSignedParameters', () => {
  test('Should set signed parameters', () => {
    const report = new ReportBoxReport()
    const signedParameters = 'signed-params'
    report.setSignedParameters(signedParameters)

    expect(report.signedParameters).toEqual(signedParameters)
  })
})

describe('setInputtedParams', () => {
  test('Should set inputted parameters', () => {
    const report = new ReportBoxReport()
    report.setInputtedParams(inputted)

    expect(report.inputtedParams).toEqual(inputted)
  })
})

describe('hasSignedParameters', () => {
  test('Should return true when signed parameters is set', () => {
    const report = new ReportBoxReport()
    report.setSignedParameters(signedParameters)

    expect(report.hasSignedParameters).toEqual(true)
  })

  test('Should return false when signed parameters is not set', () => {
    const report = new ReportBoxReport()

    expect(report.hasSignedParameters).toEqual(false)
  })
})

describe('serialize', () => {
  test('Should return serialized parameters', () => {
    const report = new ReportBoxReport()
    report.setSignedParameters(signedParameters)
    report.setInputtedParams(inputted)

    expect(report.serialize()).toEqual({
      ...inputted,
      signedParameters
    })
  })

  test('Should return serialized with empty signedParameters when signedParameters is not set', () => {
    const report = new ReportBoxReport()

    expect(report.serialize()).toEqual({
      signedParameters: ''
    })
  })
})
