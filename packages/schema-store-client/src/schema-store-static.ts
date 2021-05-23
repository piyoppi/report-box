import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import axios from 'axios'
import { SchemaStore } from './schema-store'

export class SchemaStoreStatic extends SchemaStore {
  constructor(
    private _baseUrl: string
  ) {
    super()
  }

  getResourceUrl(id: string) {
    return `${this._baseUrl}/${id}`
  }

  async fetchSchema(id: string): Promise<ReportBoxSchema> {
    const url = this.getResourceUrl(id)
    const response = await axios.get(url)

    const json = response.data

    return new ReportBoxSchema(json)
  }
}
