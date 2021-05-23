import { ReportBoxOptionSettings } from '../src/option-settings'
import { ReportBoxOptionSettingsEmbed } from '../src/embedded-options'
import { JSONSchema7 } from 'json-schema'

const parentOrigin = 'http://localhost'
const signedParameters = {
  "type": "object",
  "required": ["userId"],
  "properties": {
    "userId": {
      "type": "string"
    }
  }
} as JSONSchema7

describe('requiredSignedParameters', () => {
  test('Should return true when the option has a signedParameters', () => {
    const option = new ReportBoxOptionSettings({signedParameters})

    expect(option.requiredSignedParameters).toEqual(true)
  })

  test('Should return false when the option is not have a signedParameters', () => {
    const option = new ReportBoxOptionSettings({})

    expect(option.requiredSignedParameters).toEqual(false)
  })
})

describe('signedParametersSchema', () => {
  test('Should return schema when signedParameters is given', () => {
    const option = new ReportBoxOptionSettings({signedParameters})

    expect(option.signedParametersSchema).toEqual(signedParameters)
  })

  test('Should throw an error when signedParameters is not given', () => {
    const option = new ReportBoxOptionSettings({})

    expect(() => option.signedParametersSchema).toThrow()
  })
})

describe('canConnectEmbeddingParent', () => {
  test('Should return true when allowIframeParentOrigin is given', () => {
    const option = new ReportBoxOptionSettings({embedded: {parentOrigin}})

    expect(option.canConnectEmbeddingParent).toEqual(true)
  })

  test('Should return false when allowIframeParentOrigin is not given', () => {
    const option = new ReportBoxOptionSettings({})

    expect(option.canConnectEmbeddingParent).toEqual(false)
  })
})

describe('embeddedOptions', () => {
  test('Should return options', () => {
    const option = new ReportBoxOptionSettings({embedded: {parentOrigin}})
    const expected = new ReportBoxOptionSettingsEmbed({parentOrigin})

    expect(option.embeddedOptions).toEqual(expected)
  })

  test('Should throw an error when embedded parameters are not given', () => {
    const option = new ReportBoxOptionSettings({})

    expect(() => option.embeddedOptions).toThrow()
  })
})

describe('setParameters', () => {
  test('Should set the given parameters', () => {
    const option = new ReportBoxOptionSettings({})
    option.setParameters({embedded: {parentOrigin}, signedParameters})

    expect(option.signedParametersSchema).toEqual(signedParameters)
    expect(option.embeddedOptions.parentOrigin).toEqual(parentOrigin)
  })
})
