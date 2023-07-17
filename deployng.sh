set -e
set -o pipefail
pushd ./code/view/nojank-app 
ng build --configuration production
#rsync -r ./dist/nojank-app/* $NJNGU@$NJSBH:/var/www/$NJSBD/html/
scp -r ./dist/nojank-app/* $NJNGU@$NJSBH:/var/www/$NJSBD/html/
popd
