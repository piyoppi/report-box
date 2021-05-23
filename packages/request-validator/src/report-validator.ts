import { ReportBoxSchema, ReportBoxVerifiedReport } from '@piyoppi/report-box-resources'

const Ajv = require("ajv")
const jwt = require('jsonwebtoken');

export class ReportBoxReportValidator {
  constructor(
    private _surveyParams: ReportBoxSchema,
    private _report: ReportBoxVerifiedReport,
    private _signedParametersSecretKey: string
  ) {
  }

  validate() {
    const valid = this._validateInputtedParams() && this._validateSignedParams()

    if (valid) {
      this._report.setVerified()
    } else {
      this._report.setRejected()
    }

    return valid
  }

  private _validateInputtedParams(): boolean {
    const schemaForValidateReport = {
      additionalProperties: false,
      ...this._surveyParams.itemSchema
    }
    const ajv = new Ajv()
    const validate = ajv.compile(schemaForValidateReport)
    const valid = validate(this._report.inputtedParams)

    return valid;
  }

  private _validateSignedParams(): boolean {
    if (!this._surveyParams.optionalSettings.requiredSignedParameters) return true

    try {
      const decoded = jwt.verify(this._report.signedParameters, this._signedParametersSecretKey)
      if (!decoded.params) return false

      const ajv = new Ajv()
      const validate = ajv.compile(this._surveyParams.optionalSettings.signedParametersSchema)
      const valid = validate(decoded.params)

      if (valid) {
        this._report.setVerifiedDecodedSignedParameters(decoded.params)
      } else {
        return false
      }
    } catch (e) {
      return false
    }

    return true
  }
}
