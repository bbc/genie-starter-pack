#!/usr/bin/env bash
set -e

nvm install 10.0.0
npm install --force
nvm install 13.14.0

npm run build
cp -r themes output/themes
cp -r debug output/debug
