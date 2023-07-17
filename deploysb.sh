set -e
set -o pipefail
scp ./code/ctl/build/libs/ctl.jar $NJUSR@$NJHOS:/home/$NJUSR/
