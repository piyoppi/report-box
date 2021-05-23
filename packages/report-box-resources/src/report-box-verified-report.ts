import { ReportBoxReportInterface } from './report-box-report'

export type ReportBoxVerificationState = 'none' | 'verified' | 'rejected'

export class ReportBoxVerifiedReport implements ReportBoxReportInterface {
  private _verifiedSignedParameters: any = {}
  private _verificationState: ReportBoxVerificationState = 'none'
  private _signedParameters = ''
  private _inputtedParams: any = {}

  get verified() {
    return this._verificationState === 'verified'
  }

  get rejected() {
    return this._verificationState === 'rejected'
  }

  get hasSignedParameters() {
    return !!this._signedParameters
  }

  get signedParameters() {
    return this._signedParameters
  }

  get inputtedParams() {
    return this._inputtedParams
  }

  setVerifiedDecodedSignedParameters(value: any) {
    if (!this.hasSignedParameters) throw new Error('The report do not have signed parameters.')
    this._shouldVerificationStateIsNone()

    this._verifiedSignedParameters = value
  }

  setInputtedParams(value: any) {
    this._shouldVerificationStateIsNone()

    this._inputtedParams = value
  }

  setSignedParameters(value: any) {
    this._shouldVerificationStateIsNone()

    this._signedParameters = value
  }

  setVerified() {
    if (Object.keys(this._inputtedParams).length === 0) throw new Error('The report do not have inputted parameters')
    this._shouldVerificationStateIsNone()

    this._verificationState = 'verified'
  }

  setRejected() {
    if (this.verified) throw new Error('This report is already verified')

    this._verificationState = 'rejected'
  }

  serializeForSave() {
    if (!this.verified) throw new Error('The report is not valid.')

    return {
      ...this._inputtedParams,
      ...this._verifiedSignedParameters
    }
  }

  fromReportRequestBody(reportParams: any) {
    this._shouldVerificationStateIsNone()

    if (reportParams.signedParameters) {
      this.setSignedParameters(reportParams.signedParameters)
    }

    let inputtedParams = {...reportParams}
    delete inputtedParams['signedParameters']

    this.setInputtedParams(inputtedParams)
  }

  private _shouldVerificationStateIsNone() {
    if (this.verified) throw new Error('This report is already verified.')
    if (this.rejected) throw new Error('This report is rejected.')
  }
}
