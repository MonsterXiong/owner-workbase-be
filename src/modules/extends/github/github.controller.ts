import { Body, Controller, Post } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Github from './utils/Github';
import { ProjectInfoDto } from '../generate/dto/param.dto';
import { genCode } from '../generate/utils/common';
import { FE_FRAMEWORK_DATA } from '../generate/framework';
import { GenService } from '../gen/gen.service';
import { getConfiguration } from '../../../config/configuration';
const path = require('path');
const download = require('download-git-repo');
const userHomeDir = require('os').homedir();
const fse = require('fs-extra');
const fs = require('fs');
const userHomePath = path.resolve(userHomeDir, '.workflow-space');

const simpleGit = require('simple-git');

function downloadCode(url, project_path) {
  return new Promise<void>((resolve, reject) => {
    download(url, project_path, async function (err) {
      console.log(err, 'err');
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

/**
 * @description 初始化gitServer
 * @returns
 */
async function initGitServer() {
  const gitServer = new Github();
  await gitServer.setToken(getConfiguration().gitToken);
  return gitServer;
}

/**
 * @description 获取仓库信息
 * @param gitServer
 * @param param
 * @returns
 */
async function getRepos(gitServer, param) {
  const { repoName } = param;
  const userInfo = await gitServer.getUser();
  // const orgInfo = await gitServer.getOrg(userInfo.login);
  let repoInfo = await gitServer.getRepo(userInfo.login, repoName);

  return repoInfo;
}

/**
 * @description 初始化仓库，初始的模板代码进行提交一次
 */
async function initRepo({
  gitInstance,
  gitServer,
  projectPath,
  frameworkType,
  repoName,
}) {
  // 初始化临时文件夹
  fse.emptyDirSync(projectPath);
  // 拉取模板代码
  // await downloadCode('github:MonsterXiong/txsj-fe-template#master', project_path)
  const { projectInfo } = FE_FRAMEWORK_DATA[frameworkType];
  const { framework_code_url } = projectInfo;
  await gitInstance.clone(framework_code_url, '.');
  // 删除模板代码的.git文件夹
  await fse.removeSync(path.resolve(projectPath, '.git'));
  // 创建git仓库
  const repoInfo = await gitServer.createRepo(repoName);

  // 初始化git & remote 远程仓库源
  await initGitAndRemote(gitInstance, repoInfo);
  // 提交代码
  await gitPush(gitInstance, 'auto:初始化仓库');
}

async function gitPush(gitInstance, commitMessage) {
  await gitInstance.add('*');
  await gitInstance.commit(commitMessage);
  await gitInstance.push('origin', 'master');
}

// 检查代码冲突
async function checkConflicted(gitInstance) {
  const status = await gitInstance.status();
  if (status.conflicted.length > 0) {
    throw new Error("当前代码存在冲突，请手动处理合并后再试！");
  }
}

// 检查未提交情况
async function checkNotCommitted(gitInstance) {
  const status = await gitInstance.status();
  const { not_added, created, deleted, modified, renamed } = status
  return not_added.length || created.length || deleted.length || modified.length || renamed.length
}
async function checkCache({ projectPath, repoInfo }) {
  // 不满足缓存条件
  // 是否存在当前目录下的git文件
  if (!fse.pathExistsSync(path.resolve(projectPath, '.git'))) {
    return false
  }
  // false
  // 满足缓存条件
  return true;
}

async function initGitAndRemote(gitInstance, repoInfo) {
  const gitCloneUrl = getCloneUrlByRepoInfo(repoInfo);
  await gitInstance.init().addRemote('origin', gitCloneUrl);
}

async function gitPull(gitInstance) {
  gitInstance.pull('origin', 'master');
}

function getCloneUrlByRepoInfo(repoInfo) {
  return repoInfo.clone_url
}
async function createCache({ gitInstance, projectPath, repoInfo }) {
  // 确保文件夹为空
  fse.emptyDirSync(projectPath);
  // 克隆repo代码
  const gitCloneUrl = getCloneUrlByRepoInfo(repoInfo)
  await gitInstance.clone(gitCloneUrl, '.');
}



@ApiTags('github api')
@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly genService: GenService,
  ) { }

  @Post('gen')
  @ApiOperation({ summary: '代码生成整体流程' })
  async flow(@Body() projectInfo: ProjectInfoDto) {
    try {
      const { repoName, frameworkType, projectParma } = projectInfo;
      // 本地项目路径
      const projectPath = path.resolve(userHomePath, repoName);
      if (!fse.pathExistsSync(projectPath)) {
        fse.ensureDirSync(projectPath);
      }
      // 初始化github server
      const gitServer = await initGitServer();
      // 初始化git实例
      const gitInstance = simpleGit(projectPath);
      // 获取repoinfo
      let repoInfo = await getRepos(gitServer, projectInfo);
      if (!repoInfo) {
        repoInfo = await initRepo({ repoName, gitServer, projectPath, frameworkType, gitInstance });
      }


      if (await checkCache({ projectPath, repoInfo })) {
        // 拉取最新代码
        await gitPull(gitInstance);
      } else {
        await createCache({
          repoInfo,
          projectPath,
          gitInstance,
        });
      }
      // ---------------提交流程-------------
      // 生成开发分支
      // 生成代码

      const jsonData = fs.readFileSync('public/template/v3/mockJson.json','utf8')
      const code = await this.genService.getGenCode(JSON.parse(jsonData))

      projectParma.projectInfo.outputPath = projectPath.toString();

      const fileList = code.map(item => {
        return {
          ...item,
          filePath: path.resolve(projectParma.projectInfo.outputPath, item.filePath)
        }
      })
      await genCode(fileList);
      // TODO:检查stash区
      // 检查代码冲突
      await checkConflicted(gitInstance);
      // 检查未提交情况
      if (await checkNotCommitted(gitInstance)) {
        // 切换开发分支
        // 合并远程master分支和开发分支代码
        // 将开发分支推送到远程仓库
        // ---------------发布流程-------------
        //   打tag
        //   切换分支到master
        //   将代码合并到master
        //   将代码推送到远程master
        //   删除本地分支
        //   删除远程分支
        await gitPush(gitInstance, 'auto:生成代码')
      }
    } catch (error) {
      console.log(error, 'error');

    }
  }
}
