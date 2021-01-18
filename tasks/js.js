const gulp = require("gulp");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

function js(){
    return gulp
        .src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("tmp/assets/js"))
        .pipe(connect.reload());
}
function buildJS(){
    return gulp
        .src("src/js/**/*.js")
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(gulp.dest("dist/assets/js"));
}

function watchJS(){
    return gulp
        .watch("./src/js/**/*.js", {
            ignoreInitial: false
        }, js);
}

module.exports = {
    watchJS,
    buildJS
}