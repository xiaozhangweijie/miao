var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var server = require('gulp-webserver');
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var url = require('url');
var fs = require('fs');
var path = require('path');
var list = require("./data/data.json");
gulp.task("minSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(clean())
        .pipe(gulp.dest("./src/css/"))

})
gulp.task("server", function() {
    return gulp.src("./src")
        .pipe(server({
            post: 3000,
            open: true,
            livereload: true,
            fallback: "index.html",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/favicon.ico") {
                    res.end("");
                    return;
                } else if (pathname == "/api/list") { //接口
                    res.end(JSON.stringify({
                        code: 0,
                        data: list
                    }));
                } else {
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})
gulp.task("watch", function() {
    gulp.watch("./src/scss/*scss", gulp.series("minSass"))
})
gulp.task("dev", gulp.series("minSass", "server", "watch"))
gulp.task("uglify", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: "es2015"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
})
gulp.task("copyCss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(gulp.dest("./build/css"));
})
gulp.task("build", gulp.parallel("uglify", "copyCss"));