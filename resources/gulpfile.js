/**
 * desc: gulp sample example
 *
 * @author: Ahluo
 * @date: 2016-09-26
 */

//user resources
var path = require('path');
var fs = require('fs');
var sep = path.sep;
var gulp = require('gulp');
var ahluo = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
//config
var config = require('./config.json');

//custom variables
var js_pattern = config.base.js_pattern;

var base_path = config.base.path;

var adminName = config.admin.name,
    userName = config.user.name;

var admin_path = config.admin.folderName,
    admin_file_name = config.admin.fileName;
var suffix = config.base.suffix;

var user_path = config.user.folderName,
    user_file_name = config.user.fileName;

var output_file_path = config.base.buildPath;

//admin 
gulp.task(adminName,function(cb){
	gulp.src(base_path + sep +  admin_path + sep + js_pattern)
		.pipe(ahluo.uglify())
		.pipe(ahluo.concat(admin_file_name))
		.pipe(gulp.dest(output_file_path + sep + admin_path));

});

//user
gulp.task(userName,function(cb){
	gulp.src(base_path + sep + user_path + sep + js_pattern)
		.pipe(ahluo.uglify())
		.pipe(ahluo.concat(user_file_name + sep + admin_path))
		.pipe(gulp.dest(output_file_path));
});

//operate all javascript
gulp.task('all',function(cb){
	var folders = getFolder(base_path);
	folders.map(function(folder){
		var fullPath = base_path + sep + folder + sep + js_pattern;
		gulp.src(fullPath)
			.pipe(ahluo.uglify())
			.pipe(ahluo.concat(folder + suffix))
			.pipe(gulp.dest(output_file_path + sep + folder))
		console.log('Ahluo Work File: ' + fullPath + ' ~ ' + output_file_path + sep + folder);
	});
});

//default task
gulp.task('default',[adminName,userName]);

//js hint
gulp.task('jshint',function(){
	gulp.src(admin_path)
		.pipe(jshint({undef:true}))
		.pipe(jshint.reporter('default'))
		.pipe(ahluo.notify({message:'check done!'}));
});

//get folder
function getFolder(dir){
      return fs.readdirSync(dir)
		.filter(function(file){
			return fs.statSync(path.join(dir,file)).isDirectory();
		});
}

//notify
function notify(message){
	ahluo.notify({message:"Ahluo Notify: " + message});
}
