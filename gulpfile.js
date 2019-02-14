const gulp 				    =	require('gulp'),
			browserSync     = require('browser-sync').create(),
			tinyPng         = require('gulp-tinypng'),
			sass            = require('gulp-sass'),
			plumber         = require('gulp-plumber'),
			postCSS         = require('gulp-postcss'),
			autoprefixer    = require('autoprefixer'), // plugin postCSS
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
			include         = require('posthtml-include'), // plugin postHTML
			cheerio         = require('gulp-cheerio'),
			svgstore        = require('gulp-svgstore'),
			history		    = require('connect-history-api-fallback')
      proxyMiddleware = require('http-proxy-middleware'),
      svgMIN          = require('gulp-svgmin'),
      replace          = require('gulp-replace'),
      svgSprite        = require('gulp-svg-sprite');


/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxyMiddleware('/api', {
	target: 'http://lays-movie.dev.itcg.ua',
	changeOrigin: true, // for vhosted sites, changes host header to match to target's host
	logLevel: 'debug'
})


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		},
		port: 9000,
		middleware: [ history({
			  	index: '/index.html'
			}),
			jsonPlaceholderProxy
		]
	});

	gulp.watch('src/**/*.html', gulp.series('html') );
	gulp.watch('src/scss/**/*.scss', gulp.series('style') );
	gulp.watch('src/js/main.js', gulp.series('script') );
	gulp.watch('src/js/plugins/*.js', gulp.series('plugins:js') );
	gulp.watch(['src/img/**/*.{png,jpg,svg}', '!src/img/**/icon-*.svg'], gulp.series('images') );
	gulp.watch(['src/img/**/icon-*.svg'], gulp.series('sprite') );
});

gulp.task('html', () => {
	return gulp.src('src/*.html', {base: 'src'})
		.pipe( postHTML([include()]) )
		.pipe( gulp.dest('build') )
		.pipe( browserSync.stream() );
});

gulp.task('plugins:js', () => {
	return gulp.src('src/js/plugins/*.js', {base: 'src/js/plugins'})
		.pipe( babel() )
		.pipe( concat('plugins.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( uglify() )
		.pipe( rename('plugins-min.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( browserSync.stream() );
});

gulp.task('script', () => {
	return gulp.src('src/js/main.js', {base: 'src/js'})
		.pipe( babel() )
		.pipe( gulp.dest('build/js') )
		.pipe( uglify() )
		.pipe( rename('main-min.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( browserSync.stream() );
});

gulp.task('script:megogo', () => {
	return gulp.src('src/js/megogo.js', {base: 'src/js'})
		.pipe( babel() )
		.pipe( gulp.dest('build/js') )
		.pipe( uglify() )
		.pipe( rename('megogo-min.js') )
		.pipe( gulp.dest('build/js') )
		.pipe( browserSync.stream() );
});

gulp.task('del', () => {
	return del(['build/css', 'build/fonts', 'build/js', 'build/*.html']);
});

gulp.task('style', () => {
	return gulp.src('src/scss/style.scss', {base: 'src/scss'})
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
	return gulp.src('src/img/**/icon-*.svg', {base: 'src/img'})
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
				},
				parserOptions: { xmlMode: true }
		}))
		.pipe( rename('sprite.svg') )
		.pipe( gulp.dest('build/img') )
		.pipe(browserSync.stream());
});

gulp.task("clean-images", function() {
  return del("build/img/**/*.{png,jpg,svg,webp}");
});

gulp.task('images', () => {
	return gulp.src('src/img/**/*.{png,jpg,svg,jpeg,ico}', {base: 'src/img/'})
		.pipe( changed('build/img') )
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 3}),
			// imagemin.svgo({})
		]))
		.pipe( gulp.dest('build/img') )
		.pipe(browserSync.stream());
});

gulp.task('copy', () => {
	return gulp.src(['src/*.html', 'src/fonts/**/*.{woff,woff2}', 'src/*.pdf'], {base: 'src'})
		.pipe( gulp.dest('build') )
});

gulp.task('tinypng', function() {
	return gulp.src('src/img/**/*.{jpg,png}')
		.pipe( tinyPng('WYFtJYfxrL1VNKh6RmRnhZcV0shrHvpY') )
		.pipe( gulp.dest('build/img') );
});

gulp.task('sprite:svg', function() {
  return gulp.src('./src/img/sprite/*.svg', {base: 'src/img/sprite/'})
    .pipe(svgMIN({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest('./build/img/sprite'));
});


gulp.task('build', gulp.series('del', 'copy', 'sprite', 'images', gulp.parallel('html', 'style', 'script', 'plugins:js', 'script:megogo')) );

gulp.task('dev', gulp.series('build', 'server') );
