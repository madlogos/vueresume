#!/usr/bin/env sh

# pause if error
set -e

# build
npm run build --modern

# cd to build output
cd dist

# deploy to my own domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# deploy to https://<USERNAME>.github.io
# git push -f git@github.com:madlogos/madlogos.github.io.git master

# deploy to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:madlogos/vueresume.git master:gh-pages

cd -