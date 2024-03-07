#!/bin/sh
chmod +x ./run_and_deploy.sh
apt-get update
apt-get install bash -y
npm install -g yarn
apt-get install git -y
yarn install

echo "Prisma Generate";
yarn prisma generate;

echo "The value of DEV_ENV is: $DEV_ENV"

if [ "$DEV_ENV" = "YES" ]
then
    echo "Starting Server in dev env"
    yarn test
else 
    echo "Building backend";
    yarn build;
    echo Starting Server
    yarn start
fi


echo "Server Started";