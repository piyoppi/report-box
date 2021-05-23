import { JSONSchema7 } from 'json-schema'
import { ReportBoxOptionsEmbed, ReportBoxOptionSettingsEmbed } from './embedded-options'

export type ReportBoxOptions = {
  signedParameters?: JSONSchema7,
  embedded?: ReportBoxOptionsEmbed
}

export class ReportBoxOptionSettings {
  private _embeddedOptions: null | ReportBoxOptionSettingsEmbed = null

  constructor(private _params: ReportBoxOptions) {
    this._setEmbeddedOptionsIfNeeded()
  }

  setParameters(params: ReportBoxOptions) {
    this._params = params
    this._setEmbeddedOptionsIfNeeded()
  }

  get requiredSignedParameters(): boolean {
    return !!this._params.signedParameters
  }

  get signedParametersSchema(): JSONSchema7 {
    if (!this._params.signedParameters) throw new Error('The option is not have SignedParameters')

    return this._params.signedParameters
  }

  get canConnectEmbeddingParent() {
    return !!this._embeddedOptions && this._embeddedOptions.canConnectEmbeddingParent
  }

  get embeddedOptions() : ReportBoxOptionSettingsEmbed {
    if (!this._embeddedOptions) throw new Error('Embedded option is not given')

    return this._embeddedOptions
  }

  private _setEmbeddedOptionsIfNeeded() {
    if (this._params.embedded) {
      this._embeddedOptions = new ReportBoxOptionSettingsEmbed(this._params.embedded)
    }
  }
}
