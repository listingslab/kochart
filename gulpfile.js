/////////////////////////////////////////////
/* Frontend gulp tasks. Keep an eye on
 * the front dev folder and copies everything to
 * the right place in symfony when anything
 * changes
 */

var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');

//////////////////////////////////////
/* Copy HTML template file */
gulp.task('copy_index_template', function() {
    // copy the index template to the symfony bundle
    gulp.src('./frontend/html/index.html.twig')
        .pipe(gulp.dest('./php/src/Listingslab/Bundle/Resources/views/Default/'));
});

//////////////////////////////////////
/* Clean and copy vendor folder */
gulp.task('vendor', function (){
    runSequence('clean_vendor','copy_vendor');
});
gulp.task('clean_vendor', function() {
    return gulp.src('./php/web/vendor/', {read: false})
        .pipe(clean());
});
gulp.task('copy_vendor', function() {
    gulp.src('./frontend/vendor/bootstrap/dist/*/**')
        .pipe(gulp.dest('./php/web/vendor/bootstrap'));
    gulp.src('./frontend/vendor/knockout/dist/*')
        .pipe(gulp.dest('./php/web/vendor/knockout'));
    gulp.src('./frontend/vendor/chart.js/dist/*')
        .pipe(gulp.dest('./php/web/vendor/chart.js'));
    gulp.src('./frontend/vendor/js-cookie/src/js.cookie.js')
        .pipe(gulp.dest('./php/web/vendor/js-cookie/'));
    return gulp.src('./frontend/vendor/jquery/dist/*')
        .pipe(gulp.dest('./php/web/vendor/jquery'));
});

//////////////////////////////////////
/* Clean and copy img folder */
gulp.task('img', function (){
    runSequence('clean_img','copy_img');
});
gulp.task('clean_img', function() {
    return gulp.src('./php/web/img/', {read: false})
        .pipe(clean());
});
gulp.task('copy_img', function() {
    return gulp.src('./frontend/img/*')
        .pipe(gulp.dest('./php/web/img/'));
});

//////////////////////////////////////
/* Clean and copy js folder */
gulp.task('js', function (){
    runSequence('clean_js','copy_js');
});
gulp.task('clean_js', function() {
    return gulp.src('./php/web/js/', {read: false})
        .pipe(clean());
});
gulp.task('copy_js', function() {
    return gulp.src('./frontend/js/*')
        .pipe(gulp.dest('./php/web/js/'));
});

//////////////////////////////////////
/* Clean and copy css folder */
gulp.task('css', function (){
    runSequence('clean_css','copy_css');
});
gulp.task('clean_css', function() {
    return gulp.src('./php/web/css/', {read: false})
        .pipe(clean());
});
gulp.task('copy_css', function() {
    return gulp.src('./frontend/css/*')
        .pipe(gulp.dest('./php/web/css/'));
});

//////////////////////////////////////
/* Copy README.md */
gulp.task('readme', function() {
    return gulp.src('./README.md')
        .pipe(rename("README.html"))
        .pipe(gulp.dest('./php/web/'));
});

//////////////////////////////////////
/* Default watch task */
gulp.task('watch', function() {
    gulp.watch ('frontend/html/index.html.twig', ['copy_index_template'] );
    gulp.watch ('frontend/vendor/**/*', ['vendor'] );
    gulp.watch ('frontend/img/**/*', ['img'] );
    gulp.watch ('frontend/css/**/*', ['css'] );
    gulp.watch ('frontend/js/**/*', ['js'] );
    gulp.watch ('README.md', ['readme'] );
});
gulp.task('default', ['watch']);