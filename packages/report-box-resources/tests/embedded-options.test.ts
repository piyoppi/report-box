import { ReportBoxOptionSettingsEmbed } from '../src/embedded-options'

describe('parentOrigin', () => {
  test('Should return parentOrigin', () => {
    const settings = new ReportBoxOptionSettingsEmbed({parentOrigin: 'https://localhost'})

    expect(settings.parentOrigin).toEqual('https://localhost')
  })

  test('Should throw an error when parentOrigin is empty', () => {
    const settings = new ReportBoxOptionSettingsEmbed({parentOrigin: ''})

    expect(() => settings.parentOrigin).toThrow()
  })
})

describe('canConnectEmbeddingParent', () => {
  test('Should return true when a valid parentOrigin is given', () => {
    const settings = new ReportBoxOptionSettingsEmbed({parentOrigin: 'https://localhost'})

    expect(settings.canConnectEmbeddingParent).toEqual(true)
  })

  test('Should return false when parentOrigin is empty', () => {
    const settings = new ReportBoxOptionSettingsEmbed({parentOrigin: ''})

    expect(settings.canConnectEmbeddingParent).toEqual(false)
  })
})
