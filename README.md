# Feel Coffee
How to set up and work with the application.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for deployment into dist directory
npm run build
```

## Branches
``` bash
feature => develop => staging => master
```

## Step 0
``` bash
git clone https://github.com/vbario/feel-coffee.git
```

## Code flow
``` bash
1. git checkout `develop`
2. git checkout -b `feature/${your_feature_identifier}`
3. make changes in feature branch
4. push the new branch:
    a. git add -A
    b. git commit -m "`Changes made`"
    c. git push origin `feature/${your_feature_identifier}`
5. open a pull request into `develop`

Pushing a simple bug fix?
- Prefix your branch name with `bugfix` instead of `feature`.

Also:
- Squash commits
- Delete the feature branch on merge
```