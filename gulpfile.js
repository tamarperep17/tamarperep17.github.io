const gulp = require('gulp');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const bs = require('browser-sync').create();

gulp.task('jekyll:build', function(done) {
    return spawn('jekyll', ['build'], {
        shell: true,
        stdio: 'inherit'
    }).on('close', done)
});

gulp.task('browser-sync', function () {
    bs.init({
        server: {
            baseDir: '_site'
        }
    })
});

gulp.task('jekyll:rebuild', gulp.series('jekyll:build'), function () {
    bs.reload();
});

gulp.task('watch', function () {
    gulp.watch('*.html', gulp.series('jekyll:build'));
});

gulp.task('serve', gulp.series('browser-sync', 'watch'));