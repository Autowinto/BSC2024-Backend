#!/bin/sh

echo "Building backend";
pnpm build;

echo "Starting Server"
pnpm start

sleep 3
echo "Generating swagger documentation HTML";
python3 swagger-to-html.py < documentation/swaggerDoc.yaml > ./public/doc.html;

echo "Server Started";