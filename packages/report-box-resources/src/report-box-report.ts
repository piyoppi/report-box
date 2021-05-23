export interface ReportBoxReportInterface {
  readonly signedParameters: string,
  readonly inputtedParams: string,
  readonly hasSignedParameters: boolean,
  setSignedParameters: (value: string) => void,
  setInputtedParams: (value: string) => void
}

export class ReportBoxReport implements ReportBoxReportInterface {
  private _signedParameters = ''
  private _inputtedParams: any = {}

  get signedParameters() {
    return this._signedParameters
  }

  get inputtedParams() {
    return this._inputtedParams
  }

  get hasSignedParameters() {
    return !!this._signedParameters
  }

  setSignedParameters(value: string) {
    this._signedParameters = value
  }

  setInputtedParams(value: any) {
    this._inputtedParams = value
  }

  serialize() {
    return {
      ...this._inputtedParams,
      signedParameters: this._signedParameters
    }
  }
}
