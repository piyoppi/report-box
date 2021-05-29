import { jaErrorMessageTemplates } from './errorMessageTemplates/ja'

export const config = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost',
  schemaBaseUrl: process.env.REACT_APP_SCHEMA_BASE_URL || 'http://localhost',
  developmentMode: process.env.REACT_APP_DEVELOPMENT_MODE === 'true' ?  true : false,
  errorMessageTemplates: jaErrorMessageTemplates
}