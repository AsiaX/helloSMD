var gulp = require("gulp");
//1 依赖服务
var webserver = require("gulp-webserver");

//2 依赖sass
var sass = require("gulp-sass");

//3 图片压缩
var imagemin = require("gulp-imagemin");

//4 js模块化  named  webpack

//复制html
var htmlfiles = ['src/html/**/*'];
gulp.task('copy-html',function(){
	gulp.src(htmlfiles)
	.pipe(gulp.dest("app/prd/html"));
})

//解析sass
var sassfiles = ['src/css/**/*.scss'];
gulp.task('copy-sass',function(){
	gulp.src(sassfiles)
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("app/prd/css"));
})

//拷贝图片
var imageflies = ['src/img/**/*'];
gulp.task('copy-img',function(){
	gulp.src(imageflies)
	.pipe(imagemin())
	.pipe(gulp.dest("app/prd/img"));
})

//拷贝js
var jsfiles = ['src/js/**/*'];
gulp.task('copy-js',function(){
	gulp.src(jsfiles)
	.pipe(gulp.dest("app/prd/js"));
})

gulp.task('watch',function(){
	gulp.watch(htmlfiles,['copy-html']);
	gulp.watch(sassfiles,['copy-sass']);
	gulp.watch(imageflies,['copy-img']);
	gulp.watch(jsfiles,['copy-js']);
})

gulp.task('server',function(){
	gulp.src("./")
	.pipe(webserver({
		livereload: true,
		directoryListing:{
			enable: true,
			path: './'
		},
		port: '88',
		host: 'localhost'
	}))
})

gulp.task("copy-all",['copy-html','copy-img','copy-sass'])

gulp.task('default',['copy-all','watch','server']);