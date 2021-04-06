# 本地存在不会重新clone，无法更新发布模板项目，这里直接删除目录
rm -r -f ./qm-publish-project
git clone https://gitlab.malmam.com/qm/qm-publish-project.git
cd ./qm-publish-project
sh ./build.sh
cd ..
# 拷贝项目文件到外层目录，解决运行环境问题，之后要删除
cp ./qm-publish-project/build.js ./build.js
node ./build.js
exit 1;
