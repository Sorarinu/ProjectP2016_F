#!/usr/bin/env bash

#CircleCIからCSCの静的サーバーにファイル乗せるためだけのデプロイスクリプト

cd frontend
npm install
npm run build
cd ../
rm -rf project/*
cp frontend/dist/* project/

git add .
git commit -m "Update [ci skip]"
git push origin master
