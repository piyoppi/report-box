# report-box-aws-sam

Sample for deploying report-box to AWS

## Build

Execute the following command to build.

```
./build.sh
```

## Start development server

```
sam local start-api --host 0.0.0.0 --port 8000 -n development.env.json
```

Default parameters are defined in `defvelopment.env.json`

## Deploy

```
sam deploy
sam deploy --guided  # first release
```

The parameters need to be set for the first release.

|Parameter name|Details|Example|
|---|---|---|
|FrontendOrigin|Origin of the frontend application|`https://forms.example.com`|
|ReportBucket|S3 Bucket name||
|SchemaStoreBaseUrl|JSON Schema request url|`https://schemas.example.com`|
|SignedParamsSecret|Secrets for verifying signed parameters||


## Delete applications

```
aws cloudformation delete-stack --stack-name  sam-test-json-app
```
