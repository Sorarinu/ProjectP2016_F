#!/usr/bin/env bash

#CircleCIからCSCの静的サーバーにファイル乗せるためだけのデプロイスクリプト

cd frontend
npm install
npm run setup
npm run build
cd ../
rm -rf project/*
cp frontend/dist/* project/

git add .
git commit -m "Update"
git push origin master
