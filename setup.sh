pushd ./code/view/nojank-app
npm install npm@latest
npm install
ng update
npm audit fix
popd
if [ -z "$NJNGH" ]
then
	echo "Please set up your environment variables, as outlined in the README.md document of this project."
else
	echo "It looks like you have set up your environment variables for this project, good.... gooood!"
fi

