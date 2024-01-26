#!/usr/bin/env bash
set -e

npm install --force

npm run build
cp -r themes output/themes
cp -r debug output/debug
mkdir output/lib
cp -r node_modules/genie/lib/basisu output/lib/basisu



