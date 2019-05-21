/**
 * Created by 健成 on 2016/1/9.
 */
var exec = require('child_process').exec;
var process = require('process');
var filePath = process.cwd();
exec('"D:/Program Files/WinRAR/WinRAR.exe"   x  '+filePath+'/node_modules.zip  '+filePath, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	console.log('unzip done');
});
