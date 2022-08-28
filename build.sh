#!/bin/bash

mkdir -p dest
cp src/*.html dest
node_modules/.bin/tsc
