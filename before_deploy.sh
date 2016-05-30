shopt -s extglob
rm -rf .vscode
rm .editorconfig
rm .jshintrc

rm -rf !(dist)

cp -ar ./dist/. ./
rm -rf dist
