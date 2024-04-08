#!/bin/bash

npm run build

npm run migration:docker:run

npm run start:prod