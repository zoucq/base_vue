const shelljs = require('shelljs')

const fs = require('fs')
function isFileExisted() {
    return new Promise(function(resolve, reject) {
        fs.access('qm-publish-project', (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve('existed');
            }
        })
    })
}

(async() => {
    try {
        const res = await isFileExisted();
        console.log(res)
    } catch(error){
        console.log(error)
        shelljs.exec('git clone https://gitlab.malmam.com/qm/qm-publish-project.git')
    }

    // shelljs.cd('./qm-publish-project')
    // shelljs.exec('node ./build.js')

    // shelljs.exec('node ./qm-publish-project/build.js')

    // shelljs.cd('./qm-publish-project')
    // shelljs.exec('sh ./build.sh')

    shelljs.exec('sh ./qm-publish-project/build.sh')


})()


// shelljs.cd('./qm-publish-project')
// shelljs.exec('node ./build.js')

// shelljs.cp('-R','./qm-publish-project/build.js','./')


