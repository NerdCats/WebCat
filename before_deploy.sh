shopt -s extglob
rm -rf .vscode
rm .editorconfig
rm .jshintrc

rm -rf !(dist)

cp -r /dist .
rm -rf dist

rm -rf .git
rm .gitignore