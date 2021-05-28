import { UISchemaGenerator } from './uiSchemaGenerator'
import { JSONSchema7 } from 'json-schema'

const schemaMultipleSelector = {
  "title": "Test survey",
  "type": "object",
  "properties": {
    "known": {
      "type": "array",
      "title": "multiple selector",
      "items": {
        "type": "string",
        "enum": [
          "a",
          "b",
          "c",
          "d"
        ]
      }
    }
  }
} as JSONSchema7

const schemaLongText = {
  "title": "Test survey",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "title": "question",
      "maxLength": 20
    }
  }
} as JSONSchema7

const schemaShortText = {
  "title": "Test survey",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "title": "question",
      "maxLength": 19 
    }
  }
} as JSONSchema7

describe('generate', () => {
  test('Should return a schema including checkboxes', () => {
    const generator = new UISchemaGenerator(schemaMultipleSelector)

    expect(generator.generate()).toEqual({
      'known': {
        'ui:widget': 'checkboxes'
      }
    })
  })

  test('Should return a schema including textarea', () => {
    const generator = new UISchemaGenerator(schemaLongText)

    expect(generator.generate()).toEqual({
      'text': {
        'ui:widget': 'textarea'
      }
    })
  })

  test('Should return a empty schema', () => {
    const generator = new UISchemaGenerator(schemaShortText)

    expect(generator.generate()).toEqual({})
  })
})
