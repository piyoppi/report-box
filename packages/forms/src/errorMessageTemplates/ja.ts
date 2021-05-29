import { ErrorTransformerTemplates } from './../lib/errorTransformer'

export const jaErrorMessageTemplates: ErrorTransformerTemplates = params => ({
  'minLength': `${params.limit} 文字以上入力してください`,
  'maxLength': `${params.limit} 文字以内で入力してください`,
  'minItems': `${params.limit} つ以上選択してください`,
  'maxItems': `${params.limit} つまで選択できます`,
  'minimum': `${params.limit} 以上の数値を指定してください`,
  'maximum': `${params.limit} 以下の数値を指定してください`,
  'required': '必須項目です',
  'pattern': '入力内容が不正です'
})

