#!/bin/sh

echo "Building backend";
pnpm build;

echo "Starting Server"
pnpm start

echo "Server Started";