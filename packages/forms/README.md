# report-box-forms

Provides a survey form based on JSON Schema.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Routing

- `/surveys/:schemaId` - A survey form based on a specified JSON Schema.

The specified JSON Schema is loaded from `${REACT_APP_SCHEMA_BASE_URL}/:schemaId`.
For example, When the `REACT_APP_SCHEMA_BASE_URL` environment variable is set to `https://example.com` and access `/surveys/test` , The schema url is `https://example.com/test`

## Environment Variables

You need to create a `.env` file before running the development server. The sample of `.env` file is `.env.develop`.

|Variable|Details|
|---|---|
|REACT_APP_BASE_URL|URL to submitted reports|
|REACT_APP_SCHEMA_BASE_URL|URL of schema store|
|REACT_APP_DEVELOPMENT_MODE|When the value is "true", the `SchemaStoreSample` will be used as the schema store|

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
