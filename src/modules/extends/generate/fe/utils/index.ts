const prettier = require('prettier');
const archiver = require('archiver');
const fs = require('fs');
const compressing = require('compressing');
const { nanoid } = require('nanoid');
const fse = require('fs-extra');
const path = require('path');

// 格式化路径符
function formatPath(str) {
  return str.replace(/\\/g, '/');
}

async function formatVueFile(content) {
  return await prettier.format(content, {
    parser: 'vue',
    printWidth: 120,
  });
}

// 获取写入的目录路径
// 匹配前缀template\\page\\crud\\以及\\xxx.ejs中间的内容
function getDirPath(tempPath, filePath) {
  const regex = new RegExp(`^${tempPath}(.*?)(?=/[^/]+\.ejs$)`);
  const match = filePath.match(regex);
  let dirPath = '.';
  if (match) {
    dirPath += match[1];
  }
  return dirPath;
}

function compress(source, target) {
  // 创建 archiver 实例
  const archive = archiver('zip', {
    zlib: { level: 9 }, // 设置压缩级别（可选）
  });
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(target);
    // 将输出流管道连接到 archiver
    archive.pipe(output);
    // 将源文件夹添加到压缩包
    archive.directory(source, false);
    // 完成压缩
    archive.finalize();
    // 监听完成事件
    output.on('close', () => {
      resolve(true);
    });
    // 监听错误事件
    archive.on('error', (error) => {
      reject(error);
    });
  });
}

async function uncompress(source, targetDir) {
  return await compressing.zip.uncompress(source, targetDir);
}

async function downloadCodeFile(dirPath, res) {
  const zipFilePath = path.join(dirPath, '../fe.zip');
  const flag = await compress(dirPath, zipFilePath);
  return new Promise((resolve, reject) => {
    // 下载
    if (flag) {
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="fe.zip"`,
      });
      // 创建可读流并发送给客户端
      const readStream = fs.createReadStream(zipFilePath);
      readStream.pipe(res);
      readStream.on('end', () => {
        // 移除压缩包
        fse.removeSync(zipFilePath, true);
        // 移除项目目录
        fse.removeSync(dirPath, true);
        resolve('操作成功');
      });
    } else {
      reject('操作失败');
    }
  });
}

export {
  downloadCodeFile,
  formatPath,
  getDirPath,
  formatVueFile,
  compress,
  uncompress,
};
