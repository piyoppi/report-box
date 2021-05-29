import React, {useEffect, useState} from 'react'
import Form from '@rjsf/material-ui'
import { config } from './../config'
import { Button, CircularProgress } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { UISchemaGenerator } from '../lib/uiSchemaGenerator'
import { JSONSchema7 } from 'json-schema'
import { transformErrors } from '../lib/errorTransformer'

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type SurveyFormPropTypes = {
  onSubmit: (e: any) => void,
  onError: (e: any) => void,
  loading: boolean,
  schema: JSONSchema7
}

export const SurveyForm: React.FunctionComponent<SurveyFormPropTypes> = (props) => {
  const classes = useStyles()
  const [uiSchema, setUiSchema] = useState({})
  const [formData, setFormData] = useState({})

  const submit = async (e: any) => {
    props.onSubmit(e)
  }

  const onError = (e: any) => {
    props.onError(e)
  }

  const changed = (e: any) => {
    setFormData(e.formData)
  }

  useEffect(() => {
    const uiSchemaGenerator = new UISchemaGenerator(props.schema)
    setUiSchema(uiSchemaGenerator.generate())
  }, [props.schema])

  return (
    <Form
      onSubmit={submit}
      onChange={changed}
      schema={props.schema}
      uiSchema={uiSchema}
      formData={formData}
      showErrorList={false}
      transformErrors={(e) => transformErrors(e, config.errorMessageTemplates)}
      noHtml5Validate={true}
      onError={onError}
    >
      <div className="submit-container">
        <Button size="large" disabled={props.loading} type="submit" variant="contained" color="primary">
          { props.loading && <CircularProgress size={24} className={classes.buttonProgress} /> } 送信
        </Button>
      </div>
    </Form>
  )
}