#!/bin/bash

cd server/
uvicorn main:app --reload --host 0.0.0.0