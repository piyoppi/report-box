import { ReportBoxReportValidator } from '../src/report-validator'
import { ReportBoxSchema, ReportBoxVerifiedReport } from '@piyoppi/report-box-resources'
import { JSONSchema7 } from 'json-schema'
const jwt = require('jsonwebtoken')

const baseJson = {
  "title": "Test",
  "type": "object",
  "required": ["q1", "q2"],
  "properties": {
    "q1": {"type": "string", "title": "Question1"},
    "q2": {"type": "string", "title": "Question2"}
  },
  "meyasubakoOptions": {
    "signedParameters": {
      "type": "object",
      "required": ["userId"],
      "properties": {
        "userId": {
          "type": "string"
        }
      }
    },
    "allowIframeParentOrigin": "http://localhost:3001"
  }
} as JSONSchema7

const schema = new ReportBoxSchema(baseJson)
const secret = 'test-secret'
const signedParameters = jwt.sign({ params: { userId: '123' } }, secret)
const invalidSignedParameters = jwt.sign({ params: { foo: 'bar' } }, secret)

describe('validate', () => {
  test('Should return true when report is valid', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      q2: 'answer 2',
      signedParameters
    })
    const validator = new ReportBoxReportValidator(schema, report, secret)

    expect(validator.validate()).toEqual(true)
    expect(report.verified).toEqual(true)
    expect(report.rejected).toEqual(false)
  })

  test('Should return false when one of inputted parameter is missing', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      signedParameters
    })
    const validator = new ReportBoxReportValidator(schema, report, secret)

    expect(validator.validate()).toEqual(false)
    expect(report.verified).toEqual(false)
    expect(report.rejected).toEqual(true)
  })

  test('Should return false when extra parameter is given', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      q2: 'answer 2',
      q3: 'answer 3',
      signedParameters
    })
    const validator = new ReportBoxReportValidator(schema, report, secret)

    expect(validator.validate()).toEqual(false)
    expect(report.verified).toEqual(false)
    expect(report.rejected).toEqual(true)
  })

  test('Should return false when invalid secret is given', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      q2: 'answer 2',
      signedParameters
    })
    const validator = new ReportBoxReportValidator(schema, report, 'invalid-secret')

    expect(validator.validate()).toEqual(false)
    expect(report.verified).toEqual(false)
    expect(report.rejected).toEqual(true)
  })

  test('Should return false when signedParameters is invalid', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      q2: 'answer 2',
      invalidSignedParameters
    })
    const validator = new ReportBoxReportValidator(schema, report, secret)

    expect(validator.validate()).toEqual(false)
    expect(report.verified).toEqual(false)
    expect(report.rejected).toEqual(true)
  })

  test('Should return false when signed parameters is missing', () => {
    const report = new ReportBoxVerifiedReport()
    report.fromReportRequestBody({
      q1: 'answer 1',
      q2: 'answer 2'
    })
    const validator = new ReportBoxReportValidator(schema, report, secret)

    expect(validator.validate()).toEqual(false)
    expect(report.verified).toEqual(false)
    expect(report.rejected).toEqual(true)
  })
})
