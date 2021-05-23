import { SchemaStoreStatic, SchemaStoreSample } from '@piyoppi/report-box-schema-store-client'
import { config } from './../config'

export function createStore() {
  if (config.developmentMode) {
    return new SchemaStoreSample()
  }

  return new SchemaStoreStatic(config.schemaBaseUrl)
}
