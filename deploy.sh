set -e
set -o pipefail
./clean.sh
./setup.sh
./deploysb.sh
./deployng.sh
echo $NJPWD | ssh -tt $NJUSR@$NJHOS "sudo reboot 0"
