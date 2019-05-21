/**
 * Created by 健成 on 2016/1/9.
 */
// project 中子模块文件夹信息
var fileInfo = require('./project').subModule;
// 执行CMD命令时需把 / 转成 \ 否则会报无效开关的错误
execPath = fileInfo.replace(/\//ig, '\\');
// svn 设置的备份文件夹
var svnPath = require('./svnConfig').backupPath;
//var backupPath = require('./svnConfig').backupPath;
var backupPath = svnPath.replace(/\//ig, '\\');

var fs = require('fs');
var exec = require('child_process').exec;
var process = require('process');
//本项目文件路径
var filePath = process.cwd();
// 判断备份文件夹是都存在
var folder_exists = fs.existsSync('E:/SVN/backup/'+fileInfo);
//console.log(fs.existsSync('F:/testSVN/backup//')); // ----> true
if(folder_exists) {
	console.log('文件夹已经存在, 直接copy过去');
	// 如果已经有文件夹就 删除已有文件 然后copy过去   //todo 考虑如果以后文件夹过大, 那么就直接copy过去 不在删除了
	sendBackup();
}else{
	console.log('文件夹不存在, 先创建文件夹再copy过去')
	// 如果没有则先创建文件夹 然后再copy过去
	//'ljc/star/' ---> ['ljc', 'star', '']; star/ -- >['star', '']
	var arr = fileInfo.split('/');
	var pathStr = svnPath;
	var num = 0;
	cj(arr, 0, sendBackup);
}

function cj(arr, num, callback){
	//console.log(fs.existsSync(pathStr + arr[num]))
	if(!fs.existsSync(pathStr + arr[num])){
		console.log('start mkdir');
		fs.mkdir(pathStr + arr[num], function(err){
			if (err) {
				return console.error(err);
			}
			pathStr +=  arr[num]+'/';
			num++;
			console.log('第'+num+'级目录创建成功。');

			if(num == arr.length -1){
				callback();
				return;
			}
			cj(arr, num, sendBackup);
		});
	}else{
		pathStr +=  arr[num]+'/';
		console.log('第'+num+'级'+arr[num]+'目录已存在。往下创建');
		num++;
		if(num == arr.length -1){
				callback();
				return;
		}
		cj(arr, num, sendBackup);
	}
}


function sendBackup(){
	exec('DEL '+backupPath+ execPath+ ' /S/Q', function (error, stdout, stderr, stdin) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		//console.log(stdout);
		console.log('上次存档删除完毕, 开始时光传送');

		//xcopy f:\del\src  f:\testSVN\backup\ljc\star\ /e /y
		exec('xcopy '+ filePath + '\\src '+backupPath+execPath + ' /e /y', function (error, stdout, stderr, stdin) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			//console.log(stdout);
			console.log('copy, 时光传送结束');
		});
	});
}
