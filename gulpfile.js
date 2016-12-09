const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', () => {
    console.log("Watching Task");
    transpile();
    return watch('./src/Request.js', transpile);
});

function transpile() {
    gulp.src('./src/Request.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('libs'));
}
