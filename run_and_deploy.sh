#!/bin/sh

echo "Building backend";
pnpm build;

echo "Prisma Generate";
pnpm prisma generate;

echo "Starting Server"
pnpm start

echo "Server Started";