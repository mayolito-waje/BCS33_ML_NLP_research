#!/bin/bash

rm -rf server/dist/
cd frontend/
pnpm build
mv dist/ ../server/