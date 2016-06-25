#Set your git user information
git config user.email "webcatdeveldeploytaskcat.com"
git config user.name "webcatdeveldeploy"

# $AZURE_REPO_URL needs to be set in your projects Variables section
# and include both username and password, e.g: https://username:password@site.scm.azurewebsites.net:443/site.git

# Clone Azure repository
git clone ${AZURE_REPO_URL} ~/azure

# change into the local azure directory
cd ~/azure

# delete local repository azure contents
rm -rf *

# Copy /dist folder contents (our application)
cp -rf ../dist/* .

git add -A
git commit --all --message "Build $TRAVIS_JOB_ID"

# Push changes to Azure
git push origin master
