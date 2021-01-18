const gulp = require("gulp");
const connect = require("gulp-connect");
const imagemin = require("gulp-imagemin");

function image(){
    return gulp
        .src("./src/img/*")
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true})
        ]))
        .pipe(gulp.dest("tmp/assets/img"))
        .pipe(connect.reload());
}
function buildIMAGE(){
    return gulp
        .src("./src/img/*")
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true})
        ]))
        .pipe(gulp.dest("dist/assets/img"));
}

function watchIMAGE(){
    return gulp
        .watch("./src/img/*", {
            ignoreInitial: false
        }, image);
}

module.exports = {
    watchIMAGE,
    buildIMAGE
}