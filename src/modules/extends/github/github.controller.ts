import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import axios from 'axios'
import { ApiTags } from '@nestjs/swagger';
import Github from './utils/Github'
const path = require('path')
const download = require('download-git-repo')
const userHomeDir = require("os").homedir();
const fse = require('fs-extra')

const userHomePath = path.resolve(userHomeDir, '.workflow-space')

const simpleGit = require('simple-git')


// const http =axios.create({
//   baseURL:'https://api.github.com',
//   timeout:60000
// })
// http.defaults.headers.common['Authorization']='Bearer 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'
// http.defaults.headers.common['X-GitHub-Api-Version']='2022-11-28'


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
  constructor(private readonly githubService: GithubService) { }

  @Get(':repos')
  async getRepo(@Param('repos') repos: string,) {
    try {
      const gitServer = new Github();
      gitServer.setToken('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')
      const userInfo = await gitServer.getUser()
      const orgInfo = await gitServer.getOrg(userInfo.login);
      let repoInfo = await gitServer.getRepo(userInfo.login, repos)
      if (!repoInfo) {
        repoInfo = await gitServer.createRepo(repos)
      }
      const gitCloneUrl = repoInfo.clone_url
      const project_path = path.resolve(userHomePath, repos)
      fse.ensureDirSync(project_path);
      const gitInstance = simpleGit(project_path);
      await gitInstance.init().addRemote('origin', gitCloneUrl)
      await downloadCode('github:MonsterXiong/gffx-fe-template#master', project_path)
      // 代码生成
      await gitInstance.add("*");
      await gitInstance.commit("add readme.md");
      await gitInstance.push('origin', 'master');
      return {
        userInfo,
        orgInfo,
        repoInfo
      }

      // console.log(data);

      // return {
      //   userInfo,
      //   orgInfo,
      //   repoInfo
      // }
      // const data = await http.get('/user/repos')
      // console.log(data.data);
      // return data.data

    } catch (error) {
      console.log('error', error);

    }
    return 1
  }
}
