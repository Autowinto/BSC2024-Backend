#!/bin/sh
chmod +x ./run_and_deploy.sh
apt-get update
apt-get install bash -y
apt-get install git -y
npm install -g pnpm
pnpm install

echo "Prisma Generate";
pnpm db:deploy;

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