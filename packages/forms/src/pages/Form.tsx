import React, {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import './Form.css';
import { config } from './../config'
import { createStore } from './../lib/storeGenerator'
import { ReportClient, registerGetMessageHandler } from '@piyoppi/report-box-report-client'
import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import {
  useParams,
  useHistory
} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { SurveyForm } from '../components/SurveyForm'
import { JSONSchema7 } from 'json-schema'

const client = new ReportClient(config.baseUrl)
let reportBoxSchema: ReportBoxSchema | null = null

export default function FormPage() {
  const store = createStore()
  const { id }: { id: string } = useParams()
  const history = useHistory()
  const [schema, setSchema] = useState<JSONSchema7>({})
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasValidationError, setHasValidationError] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  useEffect(() => {
    store.fetchSchema(id).then((schema: ReportBoxSchema) => {
      reportBoxSchema = schema
      setSchema(schema.itemSchema)

      if (schema.optionalSettings.canConnectEmbeddingParent) {
        registerGetMessageHandler(schema.optionalSettings.embeddedOptions.parentOrigin, client)
      }
    }).catch(_ => {
      history.push('/not-found')
    })
  }, [])

  const submit = async (e: any) => {
    setLoading(true)
    setHasError(false)
    setHasValidationError(false)
    try {
      const response = await client.submit(id, e.formData)

      if (response.status !== 201) {
        setHasError(true)
        return
      }

      const callbackUrl = reportBoxSchema?.optionalSettings.callbackUrl
      if (callbackUrl) {
        window.location.href = callbackUrl
      } else {
        setSucceeded(true)
      }
    } catch(_) {
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }

  const onError = () => {
    setHasValidationError(true)
  }

  return (
    <>
      <Helmet>
        <title>{ schema.title || 'ReportBox' }</title>
      </Helmet>
      <article>
        { !succeeded &&
          <SurveyForm
            onSubmit={submit}
            schema={schema}
            onError={onError}
            loading={loading}
          />
        }
        { hasError && <Alert severity="error">エラーが発生しました（送信に失敗しました）</Alert>}
        { hasValidationError && <Alert severity="error">入力内容に不備があります</Alert>}
        { succeeded && <Alert severity="success">投稿が完了しました</Alert>}
      </article>
    </>
  )
}
