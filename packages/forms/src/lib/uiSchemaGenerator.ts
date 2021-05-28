import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

const uiSchemaMap = {
  'checkboxes': {'ui:widget': 'checkboxes'},
  'textarea': {'ui:widget': 'textarea'}
}

export class UISchemaGenerator {
  constructor(
    private _schema: JSONSchema7
  ) {
  }

  generate() {
    const properties = this._schema.properties
    if (!properties) return {}

    let generated: any = {}

    Object.keys(properties).forEach((key: string) => {
      const componentType = this.getComponentType(properties[key])
      if (!componentType) return

      generated[key] = uiSchemaMap[componentType]
    })

    return generated
  }

  getComponentType(property: JSONSchema7Definition) {
    return (this.testCheckBox(property) && 'checkboxes') ||
           (this.testTextArea(property) && 'textarea') ||
            ''
  }

  private testCheckBox(property: JSONSchema7Definition): boolean {
    if (
      typeof property === 'boolean' ||
      !property.items ||
      typeof property.items === 'boolean' ||
      Array.isArray(property.items)
    ) return false

    return property.type === 'array' && property.items.enum?.length !== 0
  }

  private testTextArea(property: JSONSchema7Definition): boolean {
    if (typeof property === 'boolean') return false

    return property.type === 'string' && !!property.maxLength && property.maxLength >= 20
  }
}
