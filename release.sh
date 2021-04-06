# 本地存在不会重新clone，无法更新发布模板项目，这里直接删除目录
#rm -r -f ./qm-publish-project
git clone https://gitlab.malmam.com/qm/qm-publish-project.git
sh ./qm-publish-project/build.sh
exit 1;
