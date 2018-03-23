#!/usr/bin/env bash
set -e

npm install
npm run build
cp -r node_modules/genie/themes output/themes