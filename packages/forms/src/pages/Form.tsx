import React, {useEffect, useState} from 'react'
import Form from '@rjsf/material-ui'
import './Form.css';
import { config } from './../config'
import { createStore } from './../lib/storeGenerator'
import { ReportClient, registerGetMessageHandler } from '@piyoppi/report-box-report-client'
import { ReportBoxSchema } from '@piyoppi/report-box-resources'
import {
  useParams,
  useHistory
} from 'react-router-dom'
import { Button, CircularProgress } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const client = new ReportClient(config.baseUrl)

export default function FormPage() {
  const classes = useStyles()
  const store = createStore()
  const { id }: { id: string } = useParams()
  const history = useHistory()
  const [schema, setSchema] = useState({})
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  useEffect(() => {
    store.fetchSchema(id).then((schema: ReportBoxSchema) => {
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
    try {
      await client.submit(id, e.formData)
      setSucceeded(true)
    } catch(_) {
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }

  const onError = () => setHasError(true)

  return (
    <article>
      { !succeeded &&
        <Form
          onSubmit={submit}
          schema={schema}
          showErrorList={false}
          transformErrors={config.errorTransformer}
          onError={onError}
        >
          <div className="submit-container">
            <Button size="large" disabled={loading} type="submit" variant="contained" color="primary">
              { loading && <CircularProgress size={24} className={classes.buttonProgress} /> } 送信
            </Button>
          </div>
        </Form>
      }
      { hasError && <Alert severity="error">入力内容に不備があります</Alert>}
      { succeeded && <Alert severity="success">投稿が完了しました</Alert>}
    </article>
  )
}
