const gulp 				    =	require('gulp'),
			browserSync     = require('browser-sync').create(),
			tinyPng         = require('gulp-tinypng'),
			sass            = require('gulp-sass'),
			plumber         = require('gulp-plumber'),
			postCSS         = require('gulp-postcss'),
			autoprefixer    = require('autoprefixer'),
			sassGlob        = require('gulp-sass-glob'),
			csso            = require('gulp-csso'),
			rename          = require('gulp-rename'),
			del             = require('del'),
			babel           = require('gulp-babel'),
			concat          = require('gulp-concat'),
			uglify          = require('gulp-uglify'),
			changed         = require('gulp-changed'),
			imagemin        = require('gulp-imagemin'),
			postHTML        = require('gulp-posthtml'),
			include         = require('posthtml-include'),
			cheerio         = require('gulp-cheerio'),
			svgstore        = require('gulp-svgstore'),
			githubPages     = require('gulp-gh-pages');


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		},
		port: 9000
	});

	gulp.watch('src/*.html', gulp.series('html') );
	gulp.watch('src/scss/**/*.scss', gulp.series('style') );
	gulp.watch('src/js/main.js', gulp.series('script') );
	gulp.watch('src/js/plugins/*.js', gulp.series('plugins:js') );
	gulp.watch(['src/img/**/*.{png,jpg,svg}', '!src/img/**/icon-*.svg'], gulp.series('images') );
	gulp.watch(['src/img/**/icon-*.svg'], gulp.series('sprite') );
	gulp.watch('src/img/**/*.svg', gulp.series('sprite') );
});

gulp.task('html', () => {
	return gulp.src('src/*.html', {base: 'src'})
		.pipe( postHTML([include()]) )
		.pipe( gulp.dest('build') )
		.pipe( browserSync.stream() );
});

gulp.task('deploy', () => {
	return gulp.src('build/**/*')
		.pipe( githubPages() )
});

gulp.task('plugins:js', () => {
	return gulp.src('src/js/plugins/*.js')
		.pipe( babel() )
		.pipe( concat('plugins.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( uglify() )
		.pipe( rename('plugins-min.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( browserSync.stream() );
});

gulp.task('script', () => {
	return gulp.src('src/js/main.js')
		.pipe( babel() )
		.pipe( gulp.dest('build/js') )
		.pipe( uglify() )
		.pipe( rename('main-min.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( browserSync.stream() );
});

gulp.task('del', () => {
	return del(['build']);
});

gulp.task('style', () => {
	return gulp.src('src/scss/style.scss')
		.pipe( plumber() )
		.pipe( sassGlob() )
		.pipe( sass() )
		.pipe( postCSS([autoprefixer()]) )
		.pipe( gulp.dest('build/css') )
		.pipe( csso() )
		.pipe( rename('style-min.css') )
		.pipe( gulp.dest('build/css') )
		.pipe(browserSync.stream());
});

gulp.task('sprite', () => {
	return gulp.src('src/img/**/icon-*.svg')
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(cheerio({
				run: function ($) {
						$('svg').attr('style',  'display:none');
				},
				parserOptions: { xmlMode: true }
		}))
		.pipe( rename('sprite.svg') )
		.pipe( gulp.dest('build/img') )
});

gulp.task('images', () => {
	return gulp.src('src/img/**/*.{png,jpg,svg}')
		.pipe( changed('build/img') )
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.svgo()
		]))
		.pipe( gulp.dest('build/img') );
});

gulp.task('copy', () => {
	return gulp.src(['src/fonts/**/*.{woff,woff2}'], {base: 'src'})
		.pipe( gulp.dest('build') )
});

gulp.task('tinypng', function() {
	return gulp.src('src/img/**/*.{jpg,png}')
		.pipe( tinyPng('WYFtJYfxrL1VNKh6RmRnhZcV0shrHvpY') )
		.pipe( gulp.dest('src/img') );
});

/* BUILD */
gulp.task('build', gulp.series('del', 'copy', 'images', 'sprite', gulp.parallel('html', 'style', 'script', 'plugins:js')) );

/* DEV */
gulp.task('dev', gulp.series('build', 'server') );