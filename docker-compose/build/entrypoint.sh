#!/bin/bash
cd /code
if [ ! -d "/code/node_modules/" ]; then
	npm install
fi
npm start
