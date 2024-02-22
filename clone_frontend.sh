#!/bin/sh
echo "cloning frontend to container"

REPOSRC=https://github.com/Autowinto/BSC2024-Dashboard.git
LOCALREPO=/usr/src/files

# We do it this way so that we can abstract if from just git later on
LOCALREPO_VC_DIR=$LOCALREPO/.git

if [ ! -d $LOCALREPO_VC_DIR ]
then
    git clone $REPOSRC $LOCALREPO
else
    cd $LOCALREPO
    git pull $REPOSRC
fi


# End