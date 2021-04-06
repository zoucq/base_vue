const fs = require('fs')
const exec = require('child_process').exec
const cmd = 'yarn install'


function run (error, stdout, stderr) {
    if (error) {
        console.log('Error: ', error, stdout, stderr)
        return
    }

    const shelljs = require('shelljs')
    const inquirer = require('inquirer')

    function getNextVersion (version) {
        const versionArr = version.split('.')
        if(versionArr.length) versionArr[versionArr.length - 1]++
        return versionArr.join('.')
    }

    async function start () {
        try {
            shelljs.echo('welcome to publish shell')

            // shelljs.cd('..')

            const p = shelljs.ls('package.json')
            // console.log(p)
            if (p.code !== 0) {
                shelljs.exit()
            }

            const pkg = require('./package.json')

            // 输入发布环境
            const { env } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'env',
                    message: '请输入你要发布的环境:',
                    default: 'dev'
                }
            ])

            let currentBranch = shelljs.exec(`git branch | grep "*"`)
            currentBranch = currentBranch && currentBranch.slice(1).trim()
            // master分支只能发布release
            if (env === 'release' && currentBranch !== 'master') {
                shelljs.echo('release发布需为master分支！')
                shelljs.exit()
            } else if (env !== 'release' && currentBranch === 'master'){
                shelljs.echo('master分支只能发布release！')
                shelljs.exit()
            }

            // 输入版本号
            const { version: nextVersion } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'version',
                    message: `请输入版本(当前版本: ${pkg.version}):`,
                    default: getNextVersion(pkg.version)
                }
            ])

            // 输入commit
            const { commit } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'commit',
                    message: '请输入git commit log:',
                    default: `Update: ${env}/${nextVersion}`
                }
            ])

            // 是否push
            const { isPush } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'isPush',
                    message: '是否push?',
                    default: false
                }
            ])

            // 修改pkg version
            shelljs.echo(`edit package.json version`)
            fs.writeFileSync('./package.json', JSON.stringify({
                ...pkg,
                version: nextVersion
            }, null, 4))
            shelljs.echo(`edit package.json version success`)

            // git提交 打tag
            shelljs.echo(`start add commit tag...`)
            shelljs.exec('git add . -A')
            shelljs.exec(`git commit -m "${commit}"`)
            shelljs.exec(`git tag -a ${env}/${nextVersion} -m "${env}/${nextVersion}"`)

            // 确认push后，执行push tag
            if (isPush) {
                shelljs.exec('git push --tags')
            }
        } catch (error) {
            shelljs.echo(`Error: ${JSON.stringify(error)}`)
            shelljs.exit()
        }
    }

    start()
}

exec(cmd, run)


