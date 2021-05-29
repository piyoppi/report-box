import { AjvError } from "@rjsf/core"

export type ErrorTransformerTemplates = (params: any) => {[key: string]: string}

export function transformErrors(errors: Array<AjvError>, templates: ErrorTransformerTemplates): Array<AjvError> {
  return errors.map((error: AjvError) => {
    error.message = templates(error.params)[error.name] || error.message

    return error
  })
}
