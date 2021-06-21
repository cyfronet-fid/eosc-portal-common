#!/bin/bash

has_changed_files=$(git status --porcelain --untracked-files=no | wc -l)

if [[ $has_changed_files -gt 0 ]]
then
  git add -A
  git commit -m "[TEMP]"
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Preparing package..."
git reset --hard "origin/$CURRENT_BRANCH"
npm run build

git checkout build
git reset --hard "origin/$CURRENT_BRANCH"
shopt -s extglob
git rm -fr .
git checkout "origin/$CURRENT_BRANCH" -- .gitignore index.html README.md styles/*.css
mv -f dist/* ./ && rm -fR dist

echo "Pushing new dist to build branch..."
git add *
git commit -m "[Build] v0.x.x"
git push origin --force

# Reverse last branch
git checkout "$CURRENT_BRANCH"
git reset --soft "origin/$CURRENT_BRANCH"