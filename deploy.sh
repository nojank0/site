set -e
set -o pipefail
./clean.sh
./setup.sh
./deploysb.sh
./deployng.sh

