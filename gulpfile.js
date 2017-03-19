var gulp	= require('gulp'),
	browserSync		= require('browser-sync').create(),
	sass            = require('gulp-sass'),
    cssnano         = require('gulp-cssnano'),
	autoprefixer    = require('gulp-autoprefixer'),
	rename          = require('gulp-rename'),
	notify          = require("gulp-notify"),
	svgSprite       = require('gulp-svg-sprite'),
	cheerio         = require('gulp-cheerio');
	ngrok           = require('ngrok');
	gutil           = require('gulp-util');

//BROWSER-SYNC OPTIONS
var bsOpts = {
	server: {
		baseDir: "app"
	},
	host: 'localhost',
	ghostMode: false,
	notify: false
};

gulp.task('browser-sync', function() {
	browserSync.init(bsOpts, function (err, browserSync) {
		ngrok.connect({
			name: 'topaloff',
			proto: 'http',
			addr: browserSync.options.get('port'),
			authtoken: 'g1Q8762gENrKZR6rMBr7_7nffWfp9ZXGzuMH9Kt1qa',
			//auth: 'breffi:test',
			region: 'eu'
		}, function (err, url) {
			gutil.log('[ngrok]', ' => ', gutil.colors.magenta.underline(url))
		});
	});
});


gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass().on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('build-svg', function () {
	return gulp.src('svg_workshop/sprite-input/*.svg')
	//REMOVES STYLES FROM SVG
	/*
	.pipe(cheerio({
	run: function ($) {
	$('[fill]').removeAttr('fill');
	$('[style]').removeAttr('style');
	},
	parserOptions: { xmlMode: true }
	}))
	*/

	//BUILD-SPRITE
	.pipe(svgSprite({
		shape: {
			dimension: {
				maxWidth    : 100,
				maxHeight   : 100
			}
		},
		mode: {
			symbol: {
				prefix: 'svg-%s',
				example: true
			}
		}
	}))
	.pipe(gulp.dest("svg_workshop/sprite-output"));
});


gulp.task('watch', ['scss', 'browser-sync'], function () {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/js/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('default', ['watch']);