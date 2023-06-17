set -e
set -o pipefail
./clean.sh
./setup.sh
./deploysb.sh
./deployng.sh
echo $NJSBP | ssh -tt $USER@$NJSBH "sudo reboot 0"

