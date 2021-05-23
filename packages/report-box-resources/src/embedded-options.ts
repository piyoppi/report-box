export type ReportBoxOptionsEmbed = {
  parentOrigin: string
}

export class ReportBoxOptionSettingsEmbed {
  constructor(private _params: ReportBoxOptionsEmbed) {
  }

  get parentOrigin() {
    if (!this._params.parentOrigin) throw new Error('parentOrigin is empty')

    return this._params.parentOrigin
  }

  get canConnectEmbeddingParent(): boolean {
    return !!this._params.parentOrigin
  }
}
