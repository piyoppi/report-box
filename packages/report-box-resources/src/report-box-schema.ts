import { JSONSchema7 } from 'json-schema';
import { ReportBoxOptions, ReportBoxOptionSettings } from './option-settings'

export interface ReportBoxJSONSchema extends JSONSchema7 {
  meyasubakoOptions?: ReportBoxOptions
}

export class ReportBoxSchema {
  protected _optionSettings: ReportBoxOptionSettings = new ReportBoxOptionSettings({})

  constructor(private _baseSchema: ReportBoxJSONSchema) {
    if(_baseSchema.meyasubakoOptions) {
      this._optionSettings.setParameters(_baseSchema.meyasubakoOptions)
    }
  }

  get itemSchema(): JSONSchema7 {
    let scrubbedJson = {...this._baseSchema}  
    delete scrubbedJson['meyasubakoOptions']

    return scrubbedJson
  }

  get optionalSettings() {
    return this._optionSettings
  }
}
