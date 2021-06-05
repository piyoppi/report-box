# report-box-aws-sam

Sample for deploying report-box to AWS.

You need to install and setup sam-cli.

## Build

Execute the following command to build.

(You will need to run the build command `npm run build` in the root directory of this repository before running the following command.)

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
aws cloudformation delete-stack --stack-name {your-application-name}
```
