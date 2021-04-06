#rm -r -f ./qm-publish-project
git clone https://gitlab.malmam.com/qm/qm-publish-project.git
sh ./qm-publish-project/build.sh
cp ./qm-publish-project/build.js ./build.js
node ./build.js
exit 1;
