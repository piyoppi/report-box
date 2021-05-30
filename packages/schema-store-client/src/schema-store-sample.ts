import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import { SchemaStore } from './schema-store'

export class SchemaStoreSample extends SchemaStore {
  async fetchSchema(id: string): Promise<ReportBoxSchema> {
    let json = {}

    switch(id) {
      default:
        return new ReportBoxSchema({
          "title": "テストフォーム",
          "type": "object",
          "required": ["requiredText"],
          "properties": {
            "multipleWithlimit": {
              "type": "array",
              "title": "2つまで選択できるフォーム",
              "description": "2つまで選択してください",
              "items": {
                "type": "string",
                "enum": [
                  "A",
                  "B",
                  "C",
                  "D"
                ],
              },
              "maxItems": 2,
              "uniqueItems": true
            },
            "multipleWithUnderLimit": {
              "type": "array",
              "title": "3つ以上選択が必須なフォーム",
              "items": {
                "type": "string",
                "enum": [
                  "A",
                  "B",
                  "C",
                  "D"
                ],
              },
              "minItems": 3,
              "uniqueItems": true
            },
            "longtext": {
              "title": "30文字まで入力できるフォーム",
              "description": "30文字までの文字列を入力してください",
              "type": "string",
              "maxLength": 30
            },
            "shorttext": {
              "type": "string",
              "description": "5文字以上入力してください",
              "title": "5文字以上入力する必要があるフォーム",
              "minLength": 5
            },
            "requiredText": {
              "type": "string",
              "description": "テキストを入力してください",
              "title": "入力必須テキスト"
            },
            "specifiedPattern": {
              "type": "string",
              "title": "メールアドレス",
              "description": "普段お使いのメールアドレスを入力してください",
              /*ref: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address*/
              "pattern": "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            },
            "numberWithUnderLimit": {
              "type": "number",
              "title": "1以上5以下の数値",
              "minimum": 1,
              "maximum": 5
            },
            "useful": {
              "type": "number",
              "title": "選択フォーム",
              "description": "数値を選択してください",
              "enum": [
                1,
                2,
                3,
                4,
                5
              ]
            },
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
        })
    }
  }
}
