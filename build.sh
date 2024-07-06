#!/bin/bash

cd apps/server && npm install && npm run build
cd ../../apps/web && npm install && npm run build
