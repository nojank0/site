set -e
set -o pipefail
./buildsb.sh
scp ./code/ctl/build/libs/ctl.jar $USER@$NJSBH:/home/$USER/

