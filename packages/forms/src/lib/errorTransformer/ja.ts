import { AjvError } from "@rjsf/core";

export function transformErrors(errors: Array<AjvError>) {
  return errors.map((error: AjvError) => {
    if (error.name === "minLength") {
      error.message = "長さが足りません"
    }
    return error
  });
}
