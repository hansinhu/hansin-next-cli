var gulp = require('gulp');
var pxtorem = require('gulp-pxtorem');
var less = require('gulp-less');
var minifycss = require('gulp-clean-css');
var watch = require('gulp-watch');
var gzip = require('gulp-gzip');

var pxtoremOptions = {
    replace: true,
    rootValue: 75,
    propList: ['*']
};

var postcssOptions = {
    map: true
};

/**mobile-default**/
gulp.task('mobile-default', function() {
    gulp.src('./static/css/skin/mobile-default/home.less')
        .pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('./static/css/skin/mobile-default/'));
});

/**showcase**/
gulp.task('mobile-less', function() {
    gulp.src('./static/css/skin/mobile-init/*.less')
        .pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('./static/css/skin/mobile-init'));
});


//less to css
gulp.task('lesstocsspc', function() {
    return gulp.src('./static/css/skin/pc-default/index.less').pipe(less()).pipe(minifycss()).pipe(gulp.dest('./static/css/skin/pc-default/'));
});

gulp.task('lesstocssmo', function() {
    return gulp.src('./static/css/skin/mobile-default/index.less').pipe(less()).pipe(minifycss()).pipe(gulp.dest('./static/css/skin/mobile-default/'));
});


gulp.task('color-p1', function() {
    return gulp.src('./static/css/skin/pc-skin-1/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-1/'));
});
gulp.task('color-p2', function() {
    return gulp.src('./static/css/skin/pc-skin-2/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-2/'));
});
gulp.task('color-p3', function() {
    return gulp.src('./static/css/skin/pc-skin-3/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-3/'));
});
gulp.task('color-p4', function() {
    return gulp.src('./static/css/skin/pc-skin-women-clothing/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-women-clothing/'));
});
gulp.task('color-p5', function() {
    return gulp.src('./static/css/skin/pc-skin-jewelry/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-jewelry/'));
});
gulp.task('color-p6', function() {
    return gulp.src('./static/css/skin/pc-skin-baby/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-baby/'));
});
gulp.task('color-p7', function() {
    return gulp.src('./static/css/skin/pc-skin-toy/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-toy/'));
});
gulp.task('color-p8', function() {
    return gulp.src('./static/css/skin/pc-skin-hardware/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/pc-skin-hardware/'));
});



gulp.task('color-m6', function() {
    return gulp.src('./static/css/skin/mobile-skin-1/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-1/'));
});
gulp.task('color-m7', function() {
    return gulp.src('./static/css/skin/mobile-skin-2/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-2/'));
});
gulp.task('color-m8', function() {
    return gulp.src('./static/css/skin/mobile-skin-3/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-3/'));
});
gulp.task('color-m9', function() {
    return gulp.src('./static/css/skin/mobile-skin-women-clothing/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-women-clothing/'));
});
gulp.task('color-m10', function() {
    return gulp.src('./static/css/skin/mobile-skin-jewelry/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-jewelry/'));
});
gulp.task('color-m11', function() {
    return gulp.src('./static/css/skin/mobile-skin-baby/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-baby/'));
});
gulp.task('color-m12', function() {
    return gulp.src('./static/css/skin/mobile-skin-toy/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-toy/'));
});
gulp.task('color-m13', function() {
    return gulp.src('./static/css/skin/mobile-skin-hardware/cover-color.less').pipe(less()).pipe(gulp.dest('./static/css/skin/mobile-skin-hardware/'));
});


gulp.task('productPage', function() {
    return gulp.src('./static/css/pc/productPage.less').pipe(less()).pipe(gulp.dest('./static/css/pc/'));
});

gulp.task('watch', function() {
    gulp.watch('./static/css/skin/**/*.less', [
        'lesstocsspc',
        'lesstocssmo',
        // 'color-p1',
        // 'color-p2',
        // 'color-p3',
        // 'color-p4',
        // 'color-p5',
        //'color-p6',
        //'color-p7',
        'color-p8',
        // 'color-m6',
        // 'color-m7',
        // 'color-m8',
        // 'color-m9',
        // 'color-m10',
        //'color-m11',
        //'color-m12',
        'color-m13',
    ]);
})

gulp.task('gzip', function() {
    gulp.src('./.next/app.js')
        .pipe(gzip())
        .pipe(gulp.dest('./.next'));
});

gulp.task('default', [
    //'mobile-default',
    //'mobile-less',
    'watch',
]);