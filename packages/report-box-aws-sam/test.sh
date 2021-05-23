#!/bin/bash

mkdir -p functions/lib/@piyoppi/report-box-request-validator
mkdir -p functions/lib/@piyoppi/report-box-schema-store-client
mkdir -p functions/lib/@piyoppi/report-box-resources

cp -r ../request-validator/dist/ functions/lib/@piyoppi/report-box-request-validator
cp ../request-validator/package.json functions/lib/@piyoppi/report-box-request-validator/
cp -r ../schema-store-client/dist/ functions/lib/@piyoppi/report-box-schema-store-client
cp ../schema-store-client/package.json functions/lib/@piyoppi/report-box-schema-store-client/
cp -r ../report-box-resources/dist/ functions/lib/@piyoppi/report-box-resources
cp ../report-box-resources/package.json functions/lib/@piyoppi/report-box-resources/

cd functions/ && npm run test
