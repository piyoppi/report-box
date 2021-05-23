import { ReportBoxSchema } from '../src/report-box-schema'
import { ReportBoxOptionSettings } from '../src/option-settings'
import { JSONSchema7 } from 'json-schema'

const itemSchema = {
  "title": "Visitor survey",
  "type": "object",
  "required": ["q1", "q2"],
  "properties": {
    "q1": {"type": "string", "title": "Question1"},
    "q2": {"type": "string", "title": "Question2"}
  }
} as JSONSchema7

const optionalSchema = {
  "meyasubakoOptions": {
    "signedParameters": {
      "type": "object",
      "required": ["userId"],
      "properties": {
        "userId": {
          "type": "string"
        }
      }
    } as JSONSchema7,
    "allowIframeParentOrigin": "http://localhost:3001"
  }
}

const baseJson = {
  ...itemSchema,
  ...optionalSchema
}

const schema = new ReportBoxSchema(baseJson)

describe('itemSchema', () => {
  test('Should return JSON Schema except for meyasubakoOptions', () => {
    expect(schema.itemSchema).toEqual(itemSchema)
  })
})

describe('optionalSettings', () => {
  test('Should return optionalSettings', () => {
    const expectedOptional = new ReportBoxOptionSettings(optionalSchema.meyasubakoOptions)
    expect(schema.optionalSettings).toEqual(expectedOptional)
  })
})
