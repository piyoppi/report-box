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

jest.mock('axios', () => {
  return {
    get: jest.fn().mockResolvedValue({data: itemSchema})
  }
})
import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import { SchemaStoreStatic } from '../src/schema-store-static'
import axios from 'axios'

const baseUrl = 'https://schema.example.com'
const id = 'abc123'

describe('getResourceUrl', () => {
  test('Should return resource url', () => {
    const store = new SchemaStoreStatic(baseUrl)

    expect(store.getResourceUrl(id)).toEqual('https://schema.example.com/abc123')
  })
})

describe('fetchSchema', () => {
  test('Should return ReportBoxSchema', async () => {
    const store = new SchemaStoreStatic(baseUrl)

    const schema = await store.fetchSchema(id)
    const expected = new ReportBoxSchema(itemSchema)

    expect(axios.get).toHaveBeenCalledWith('https://schema.example.com/abc123')
    expect(schema).toEqual(expected)
  })
})
