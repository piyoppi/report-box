import { JSONSchema7 } from 'json-schema';
import { ReportBoxOptions, ReportBoxOptionSettings } from './option-settings'

export interface ReportBoxJSONSchema extends JSONSchema7 {
  reportBoxOptions?: ReportBoxOptions
}

export class ReportBoxSchema {
  protected _optionSettings: ReportBoxOptionSettings = new ReportBoxOptionSettings({})

  constructor(private _baseSchema: ReportBoxJSONSchema) {
    if(_baseSchema.reportBoxOptions) {
      this._optionSettings.setParameters(_baseSchema.reportBoxOptions)
    }
  }

  get itemSchema(): JSONSchema7 {
    let scrubbedJson = {...this._baseSchema}  
    delete scrubbedJson['reportBoxOptions']

    return scrubbedJson
  }

  get optionalSettings() {
    return this._optionSettings
  }
}
