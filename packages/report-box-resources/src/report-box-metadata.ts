import { ReportBoxVerifiedReport } from './report-box-verified-report'

export type ReportBoxMetaData = {
  metaDataVersion: number,
  schemaId: string,
  createdAtUtc: string
}

export class ReportBoxMetaDataGenerator {
  constructor(
    private _schemaId: string
  ) {
  }

  get currentMetaDataVersion() {
    return 1
  }

  serialize(): ReportBoxMetaData {
    const date = new Date()
    return {
      metaDataVersion: 1,
      schemaId: this._schemaId,
      createdAtUtc: date.toISOString()
    }
  }

  build(report: ReportBoxVerifiedReport) {
    return {
      ...report.serializeForSave(),
      reportBoxMeta: {
        ...this.serialize()
      }
    }
  }
}
