set -e
set -o pipefail
pushd ./code/view/nojank-app 
ng build --configuration production
#rsync -r ./dist/nojank-app/* $NJNGU@$NJSBH:/var/www/$NJDMN/html/
scp -r ./dist/nojank-app/* $NJUSR@$NJHOS:/var/www/$NJDMN/html/
popd
