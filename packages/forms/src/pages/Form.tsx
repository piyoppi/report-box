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
    try {
      await client.submit(id, e.formData)

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
    setHasError(true)
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
        { hasError && <Alert severity="error">入力内容に不備があります</Alert>}
        { succeeded && <Alert severity="success">投稿が完了しました</Alert>}
      </article>
    </>
  )
}
