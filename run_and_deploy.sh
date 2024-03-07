#!/bin/sh
chmod +x ./run_and_deploy.sh
apt-get update
apt-get install bash -y
npm install -g pnpm
apt-get install git -y

echo "Prisma Generate";
pnpm prisma generate;

echo "The value of DEV_ENV is: $DEV_ENV"

if [ "$DEV_ENV" = "YES" ]
then
    echo "Starting Server in dev env"
    pnpm dev
else 
    echo "Building backend";
    pnpm build;
    echo Starting Server
    pnpm start
fi

echo "Server Started";