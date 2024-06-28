import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';
import { IpService } from './ip.service';
import { AdminGuard } from '../../../guard/admin.guard';
import  { exec }  from 'child_process' ;
import execa from 'execa'
import GitInstance from './git'


// const execa = require('execa')
@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {
  }
  @Get()
  async getHello(@Req() request: Request){
    const git:any = new GitInstance()
    try {
      const a = await git.clone("https://github.com/MonsterXiong/dosomething.git")
      console.log(a);
      
    } catch (error) {
      console.log(error);
      
    }
    return 'hello world';
  }

  @Get('getIp')
  @UseGuards(AdminGuard)
  getIp(@Req() request: Request){
    const userIp = request['userIp']; // 从请求对象中获取 IP 地址属性
    return userIp;
  }

  @Get('nginx')
  @UseGuards(AdminGuard)
  restartNginx(@Req() request: Request){
    const userIp = request['userIp']; // 从请求对象中获取 IP 地址属性
    const command = 'nginx.exe -s reload'; // 要执行的命令
    const cwd = 'E://temp//nginx-1.22.01//nginx-1.22.0'; // 指定的工作目录

    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command execution error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Command execution stderr: ${stderr}`);
        return;
      }
      console.log(`Command executed successfully: ${stdout}`);
      return userIp;

    });
  }
  @Get('nginx1')
  @UseGuards(AdminGuard)
  async restartNginx1(@Req() request: Request){
    const userIp = request['userIp']; // 从请求对象中获取 IP 地址属性

    try {
      const command = 'nginx.exe';
      const args = ['-s', 'reload'];
      const cwd = `E:\temp\nginx-1.22.01\nginx-1.22.0`; // 指定的工作目录
      const { stdout } = await execa(command, args, { cwd });
      console.log('Command executed successfully:', stdout);
      return userIp
    } catch (error) {
      console.error('Command execution error:', error.message);
    }
  }
}
