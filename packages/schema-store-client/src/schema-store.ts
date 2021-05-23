import { JSONSchema7 } from 'json-schema';
import { ReportBoxSchema } from '@piyoppi/report-box-resources'

export class SchemaStore {
  fetchSchema(id: string): Promise<ReportBoxSchema> {
    return Promise.resolve(new ReportBoxSchema({}))
  }
}
