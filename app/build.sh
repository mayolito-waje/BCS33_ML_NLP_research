#!/usr/bin/env bash

cd frontend
pnpm build
rm -r ../server/dist
mv dist ../server/