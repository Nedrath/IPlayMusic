const gulp = require("gulp");
const connect = require("gulp-connect");

function media(){
    return gulp
        .src("./src/media/*")
        .pipe(gulp.dest("tmp/assets/media"))
        .pipe(connect.reload());
}
function buildMEDIA(){
    return gulp
        .src("./src/media/*")
        .pipe(gulp.dest("dist/assets/media"));
}

function watchMEDIA(){
    return gulp
        .watch("./src/media/*", {
            ignoreInitial: false
        }, media);
}

module.exports = {
    watchMEDIA,
    buildMEDIA
}