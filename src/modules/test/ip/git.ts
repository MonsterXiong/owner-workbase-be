
const simpleGit = require('simple-git');
const path = require('path')
const fse = require('fs-extra')

class Git{
    localPath: any;
    simpleGit: any;
    static simpleGit: any;
    static localPath: any;
    constructor(){
        this.simpleGit = simpleGit()
        this.localPath = path.resolve(__dirname,'../../../../../temp');
        fse.ensureDirSync(this.localPath)
        fse.emptyDirSync(this.localPath)
    }
    clone(url){
        return this.simpleGit.clone(url,this.localPath)
    }
}
export default Git

