const SchemaStore = require('../lib/@piyoppi/report-box-schema-store-client/dist/node/main.js') // using @piyoppi/report-box-schema-store-client
const Resources = require('../lib/@piyoppi/report-box-resources/dist/main.js')           // using @piyoppi/report-box-resources
const mockedResources = Resources

const jsonSchema = {
  "title": "Visitor survey",
  "type": "object",
  "required": ["q1", "q2"],
  "properties": {
    "q1": {"type": "string", "title": "Question1"},
    "q2": {"type": "string", "title": "Question2"}
  }
}

const defaultEventParameters = {
  pathParameters: {
    schemaId: 1
  },
  body: JSON.stringify({
    'q1': 'foo',
    'q2': 'bar'
  })
}

function registerFetchSchemaMock() {
  jest.doMock('../lib/@piyoppi/report-box-schema-store-client/dist/node/main.js', () => {
    return {
      SchemaStoreStatic: jest.fn().mockImplementation(() => {
        return {
          fetchSchema: jest.fn().mockResolvedValue(new mockedResources.ReportBoxSchema(jsonSchema))
        }
      })
    }
  })
}

function registerFetchSchemaFailureMock() {
  jest.doMock('../lib/@piyoppi/report-box-schema-store-client/dist/node/main.js', () => {
    return {
      SchemaStoreStatic: jest.fn().mockImplementation(() => {
        return {
          fetchSchema: jest.fn().mockRejectedValue({})
        }
      })
    }
  })
}

function registerAwsMock() {
  jest.doMock('aws-sdk', () => {
    return {
      S3: jest.fn().mockImplementation(() => ({
        upload: (_, callback) => callback(null, {})
      }))
    }
  })
}

describe('postReportLambdaHandler', () => {
  beforeEach(() => {
    jest.resetModules();
  })

  test('Status code is 422 when invalid parameters are given', async () => {
    registerAwsMock()
    registerFetchSchemaMock()
    const app = require('../report.js')
    const parameters = {
      ...defaultEventParameters,
      body: JSON.stringify({
        'q1': 'foo'
      })
    }

    const result = await app.postReportLambdaHandler(parameters, null)

    expect(result.statusCode).toEqual(422)
  })

  test('Status code is 201 when valid parameters are given', async () => {
    registerAwsMock()
    registerFetchSchemaMock()
    const app = require('../report.js')
    const result = await app.postReportLambdaHandler(defaultEventParameters, null)

    expect(result.statusCode).toEqual(201)
  })

  test('Status code is 500 when fetching schema is failure', async () => {
    registerFetchSchemaFailureMock()
    const app = require('../report.js')

    const result = await app.postReportLambdaHandler(defaultEventParameters, null)
    expect(result.statusCode).toEqual(500)
  })
})
