set -e
set -o pipefail
pushd ./code/view/nojank-app 
ng build --configuration production
rsync -r ./dist/nojank-app/* $USER@$NJSBH:/var/www/$NJSBD/html/
popd

