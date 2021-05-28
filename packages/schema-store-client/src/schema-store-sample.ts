import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import { SchemaStore } from './schema-store'

export class SchemaStoreSample extends SchemaStore {
  async fetchSchema(id: string): Promise<ReportBoxSchema> {
    let json = {}

    switch(id) {
      default:
        json = {
          "title": "ウェブサイト訪問者アンケート",
          "type": "object",
          "required": ["known", "impression"],
          "properties": {
            "known": {
              "type": "array",
              "title": "このウェブサイトについてどこで知りましたか？",
              "items": {
                "type": "string",
                "enum": [
                  "インターネット",
                  "知人からの口コミ",
                  "記事",
                  "広告"
                ]
              },
              "uniqueItems": true
            },
            "good": {
              "title": "良い点を教えてください",
              "type": "string",
              "maxLength": 30
            },
            "bad": {
              "title": "悪い点を教えてください",
              "type": "string",
              "maxLength": 30
            },
            "impression": {"type": "string", "title": "このウェブサイトに関するご意見を入力してください"}
          },
          "reportBoxOptions": {
            "signedParameters": {
              "type": "object",
              "required": ["userId"],
              "properties": {
                "userId": {
                  "type": "string"
                }
              }
            },
            "embedded": {
              "parentOrigin": "http://localhost:3001"
            }
          }
        }
    }

    return new ReportBoxSchema(json)
  }
}
