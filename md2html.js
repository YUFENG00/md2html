/**
 * @file md2html
 * @author yufeng
 */

const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;

let src = '/Users/xxxx';
let dest = './xxx'
getFilePath(src);


function md2html(src, dest) {
    let fileContent = '';
    // 读入 Markdown 源文件
    fileContent = fs.readFileSync(src, 'utf8');
    // 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
    fileContent = markdown.toHTML(fileContent, 'Maruku');
    // 保存
    fs.writeFileSync(dest + '/' + rename(src), fileContent);
}

/**
 * 模板文件名 更改为自定义文件名
 *
 * @param {string} src 文件路径
 * @return {string} 新文件名
 */
function rename(src) {
    // 文件类型
    let srcArr = src.split('/');
    let len = srcArr.length;
    let nameArr = srcArr[len - 1].split('.');
    nameArr[1] = 'html';
    return nameArr.join('.');
}

function getFilePath(filePath){
    //根据文件路径读取文件，返回文件列表
    try {
        let files = fs.readdirSync(filePath);
        //遍历读取到的文件列表
        files.forEach(filename => {
            //获取当前文件的绝对路径
            var filedir = path.join(filePath,filename);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            let stats = fs.statSync(filedir)
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if(isFile){
                md2html(filedir, dest);
            }
            if(isDir){
                getFilePath(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
        });
    }
    catch(err) {
        console.log(err);
    }
}