// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    browserSync = require('browser-sync').create(),
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
    if (node) node.kill()
    node = spawn('node', ['server.js'], { stdio: 'inherit' })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('browser-sync', ['server', 'watch'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["dist/*.*", "src/**/*.*", "server/**/*.*", "server.js"],
        port: 7000,
    });
});

/**
 * $ Build Angular project
 * description: build Angular project and watch the modification.
 */
gulp.task('build-dev', function(cb) {
    exec('ng build --watch --verbose', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('build', function(cb) {
    exec('ng build', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})


/**
 * $ Watch Server files
 * description: watch modification of server files. If there's a modification, launch task server.
 */
gulp.task('watch', function() {
    gulp.watch(['./server/**/*.js', './server.js'], function() {
        gulp.run('server')
    })
})

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['build', 'server']);

gulp.task('dev', ['build-dev', 'browser-sync']);

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})