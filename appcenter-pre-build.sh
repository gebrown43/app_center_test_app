#!/usr/bin/env bash

APPNAME=`jq -r .name package.json` || exit 1;
readonly APPNAME  
RNVERSION=`cat package.json | jq '.dependencies["react-native"]'` || exit 2;
readonly RNVERSION
echo $RNVERSION
echo $APPNAME

curl -X PUT -d $RNVERSION \
https://version-tracker-app-default-rtdb.firebaseio.com/projects/$APPNAME/react-native-version.json