import { GenerateService } from './../generate/generate.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from './github.service';
import axios from 'axios'
import { ApiTags } from '@nestjs/swagger';
import Github from './utils/Github'
import { ParamsDto } from '../generate/dto/param.dto';
import { genCode } from '../generate/utils/common';
import { FE_FRAMEWORK_DATA, FE_FRAMEWORK_TYPE } from '../generate/framework';
const path = require('path')
const download = require('download-git-repo')
const userHomeDir = require("os").homedir();
const fse = require('fs-extra')

const userHomePath = path.resolve(userHomeDir, '.workflow-space')

const simpleGit = require('simple-git')

function downloadCode(url, project_path) {
  return new Promise<void>((resolve, reject) => {
    download(url, project_path, async function (err) {
      console.log(err,'err');
      if (err) {
        return reject(err)
      }
      return resolve()
    })

  })
}


@ApiTags('github api')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService,private readonly generateService:GenerateService) { }

  @Post(':repos')
  async getRepo(@Param('repos') repos: string,@Body() param:ParamsDto) {
    try {
      const gitServer = new Github();
      await gitServer.setToken('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')
      const userInfo = await gitServer.getUser()
      // const orgInfo = await gitServer.getOrg(userInfo.login);
      let repoInfo = await gitServer.getRepo(userInfo.login, repos)
      if (!repoInfo) {
        // 第一次
        repoInfo = await gitServer.createRepo(repos)
      }
      const gitCloneUrl = repoInfo.clone_url
      const project_path = path.resolve(userHomePath, repos)
      fse.ensureDirSync(project_path);
      const gitInstance = simpleGit(project_path);
      if(!gitCloneUrl){
        console.log('gitCloneUrl',gitCloneUrl);
        return 'no gitCloneUrl'
      }
      // await downloadCode('github:MonsterXiong/txsj-fe-template#master', project_path)
      const {projectInfo} = FE_FRAMEWORK_DATA[FE_FRAMEWORK_TYPE.TXSJ]
      const {framework_code_url} = projectInfo
      await gitInstance.clone(framework_code_url,'.')
      await fse.removeSync(path.resolve(project_path,'.git'))
      // 代码生成
      const fileList = await this.generateService.genCode(param)
      await genCode(fileList)
       
      await gitInstance.init().addRemote('origin', gitCloneUrl)
      await gitInstance.add("*");
      await gitInstance.commit("add readme.md");
      await gitInstance.push('origin', 'master');
      return {
        userInfo,
        repoInfo
      }
    } catch (error) {
      console.log('error', error);
    }
    return 1
  }
}
