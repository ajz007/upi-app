#!/bin/bash

mkdir -p src/features/qr/{routes,controllers,services,models,utils,__tests__}
mkdir -p src/features/payments/{routes,controllers,services,models,utils,__tests__}
mkdir -p src/features/balance/{routes,controllers,services,models,utils,__tests__}
mkdir -p src/features/history/{routes,controllers,services,models,utils,__tests__}
mkdir -p src/common/{middlewares,utils,constants}
mkdir -p config
mkdir -p tests

touch .env
touch server.js
touch src/app.js
echo "Folder structure created successfully!"
