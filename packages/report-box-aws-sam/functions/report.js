const Validator = require('./lib/@piyoppi/report-box-request-validator')                        // using @piyoppi/report-box-request-validator
const SchemaStore = require('./lib/@piyoppi/report-box-schema-store-client/dist/node/main.js')  // using @piyoppi/report-box-schema-store-client
const Resources = require('./lib/@piyoppi/report-box-resources/dist/main.js')                   // using @piyoppi/report-box-resources

const AWS = require('aws-sdk')
const uuid = require('uuid')
const isDevelopmentMode = process.env.DEVELOPMENT === 'true'
const isSchemaStoreSample = process.env.SCHEMA_STORE_SAMPLE === 'true'
const headers = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN
}
s3 = new AWS.S3({apiVersion: '2006-03-01'})

exports.postReportLambdaHandler = async (event, context) => {
  const store = isSchemaStoreSample ?
    new SchemaStore.SchemaStoreSample() :
    new SchemaStore.SchemaStoreStatic(process.env.SCHEMA_STORE_BASE_URL)
  const signedParamsSecret = process.env.SIGNED_PARAMS_SECRET
  const schemaId = event.pathParameters.schemaId
  let schema = null

  try {
    schema = await store.fetchSchema(schemaId)
  } catch(e) {
    console.log("FetchSchemaError", e)
    return {
      headers,
      'statusCode': 500
    }
  }

  const body = JSON.parse(event.body)
  const report = new Resources.ReportBoxVerifiedReport()
  report.fromReportRequestBody(body)
  const validator = new Validator.ReportBoxReportValidator(schema, report, signedParamsSecret)
  const isValid = validator.validate()

  if (!isValid) {
    console.log("Error: Invalid request body")
    return {
      headers,
      'statusCode': 422
    }
  }

  if (isDevelopmentMode) return { headers, 'statusCode': 201 }

  const key = `${schemaId}/${new Date().toISOString()}_${uuid.v4()}`
  const metadataGenerator = new Resources.ReportBoxMetaDataGenerator(schemaId)

  const uploadResult = await new Promise((resolve, reject) => {
    s3.upload({Bucket: process.env.REPORT_BUCKET, Key: key, Body: JSON.stringify(metadataGenerator.build(report))}, function (err, data) {
      if (err) {
        console.log("S3UploadError", err)
        reject(err)
      } else if (data) {
        console.log("Upload Success", data.Location)
        resolve(data)
      } else {
        resolve(null)
      }
    })
  })

  return {
    headers,
    'statusCode': 201
  }
}
