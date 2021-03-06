# ReportBox

[![tests](https://github.com/piyoppi/report-box/actions/workflows/tests.yml/badge.svg)](https://github.com/piyoppi/report-box/actions/workflows/tests.yml)

ReportBox is a simple library for creating surveys.

This library is under development.

## Packages

ReportBox is composed of several packages. 
These packages are included in the `/packages` directory.

- `@piyoppi/report-box-resources` - Definition of the common resources.
- `@piyoppi/report-box-report-client` - Module for submitting reports to the server.
- `@piyoppi/report-box-request-validator` - Module for verification of submitted reports.
- `@piyoppi/report-box-schema-store-client` - Module for getting the JSON schema from the server.

## Applications

These application are included in the `/packages` directory.

- `@piyoppi/report-box-forms` - Provides a survey form based on JSON Schema.
- `report-box-aws-sam` - AWS SAM and functions for validating submitted reports.
- `signed-parameters-sample` - Sample of an embedded form for submitting signed parameters.

## Getting Started

Install dependencies.

```
npm i
npx lerna bootstrap
```

Build packages.

```
npm run build
```

### Build and Deploy server-side application

This repository contains a server-side application for validating and storing reports.
For more details, please refer to [report-box-aws-sam README](./packages/report-box-aws-sam).

### Build and Deploy client-side application

`@piyoppi/report-box-forms` is provide a survey form based on JSON Schema.
For more details, please refer to [@piyoppi/report-box-forms README](./packages/forms).
