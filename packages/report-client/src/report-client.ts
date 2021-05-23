import { ReportBoxReport } from '@piyoppi/report-box-resources'

export class ReportClient {
  private _report = new ReportBoxReport()

  constructor(
    private _baseUrl: string
  ) {
  }

  get report() {
    return this._report
  }

  getReportUrl(id: string) {
    return `${this._baseUrl}/surveys/${id}/report`
  }

  async submit(id: string, data: any) {
    const url = this.getReportUrl(id)
    this._report.setInputtedParams(data)
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this._report.serialize())
    })
  }
}
