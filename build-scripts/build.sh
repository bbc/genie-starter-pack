#!/usr/bin/env bash
set -e

npm install
npm run build
cp -r themes output/themes