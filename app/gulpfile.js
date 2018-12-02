var gulp  = require('gulp'),
loadPlugins  = require('gulp-load-plugins'),
liveReload   = require('gulp-livereload'),
plugins = loadPlugins();
// uglify = require('gulp-uglify');
var browserSync = require('browser-sync');




gulp.task('sync', function(){
    var files  = [
        'index.html'
    ];
    
    browserSync.init(files, {
        server: {
            baseDir: '../lala_challenge_console'
        }
    })
});

