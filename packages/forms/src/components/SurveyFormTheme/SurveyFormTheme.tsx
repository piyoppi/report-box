import { Theme } from '@rjsf/material-ui'
import { FieldTemplateProps } from '@rjsf/core'
import * as styles from './SurveyFormTheme.module.css'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import List from '@material-ui/core/List'
import Chip from '@material-ui/core/Chip'
import ListItem from '@material-ui/core/ListItem'
import { config } from '../../config'

const FieldTemplate = ({
  id,
  children,
  displayLabel,
  required,
  rawErrors = [],
  rawHelp,
  rawDescription,
}: FieldTemplateProps) => {
  return (
    <FormControl
    fullWidth={true}
    error={rawErrors.length ? true : false}
    required={required}>
      <div className={styles.WidgetContainer}>
        {displayLabel && rawDescription ? (
          <div className={styles.Description}>
            {required ? <Chip className={styles.Required} size="small" label={config.parameterNames.required} /> : null}
            {rawDescription}
          </div>
        ) : (
          <div>
            {required ? <Chip className={styles.Required} size="small" label={config.parameterNames.required} /> : null}
          </div>
        )}
        {children}
        {rawErrors.length > 0 && (
          <List dense={true} disablePadding={true}>
            {rawErrors.map((error, i: number) => {
              return (
                <ListItem key={i} disableGutters={true}>
                  <FormHelperText id={id}>{error}</FormHelperText>
                </ListItem>
              )
            })}
          </List>
        )}
        {rawHelp && <FormHelperText id={id}>{rawHelp}</FormHelperText>}
      </div>
    </FormControl>
  )
}

export const SurveyFormTheme = {
  ...Theme,
  FieldTemplate
}
