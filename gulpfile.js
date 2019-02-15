var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
gulp.task("minSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css/"))

})
gulp.task("watch", function() {
    gulp.watch("./src/scss/*scss", gulp.series("minSass"))
})
gulp.task("dev", gulp.series("minSass", "watch"))