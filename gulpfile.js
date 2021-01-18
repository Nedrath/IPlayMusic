const connect = require("gulp-connect");
const {watchHTML, buildHTML} = require("./tasks/html");
const {watchSCSS, buildSCSS} = require("./tasks/scss");
const {watchJS, buildJS} = require("./tasks/js");
const {watchIMAGE, buildIMAGE} = require("./tasks/images");
const {watchMEDIA, buildMEDIA} = require("./tasks/media");

function dev(done){
    watchHTML();
    watchSCSS();
    watchJS();
    watchIMAGE();
    watchMEDIA();
    connect.server({
        livereload: true, 
        root: "tmp"
    });
    done();
}

function build(done){
    buildHTML();
    buildSCSS();
    buildJS();
    buildIMAGE();
    buildMEDIA();
    done();
}
exports.default = dev;
exports.build = build;