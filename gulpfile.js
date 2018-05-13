// ---- ENVIRONMENT
process.env.DISABLE_NOTIFIER = true;

// ---- CONFIG
var config = {
  paths: {
    fonts: 'fonts/',
    scss: 'css/src/sass/',
    css: 'css/',
    js: 'js/',
    fontawesome: 'bower_components/fontawesome/',
    drupaltemplates: 'templates/',
    bootstrap: 'bower_components/bootstrap-sass/assets/'
  },
  browsersync: {
    baseDir: './',
    proxy: 'www.klunkmillan.com'
  },
  uglify: {
    mangle: false
  },
  cleantasks: [
    'clean-styles',
    'clean-scripts',
    'clean-fonts'
  ],
  defaulttasks: [
    'fonts',
    'styles',
    'scripts',
    'drush:cr'
  ],
  polyfills: [
    'bower_components/html5shiv/dist/html5shiv-printshiv.js'
  ],
  plugins: [],
  subtheme: "base"
};

config.paths.watchpaths = {
  templates: [
    config.paths.drupaltemplates + '**/*.html.twig',
    './base.theme',
  ],
  scss: [
    config.paths.scss + '**/*.scss',
  ],
  js: [
    config.paths.js + 'src/**/*.js'
  ]
};

// ---- DEPENDENCIES
var autoprefixer = require('autoprefixer'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  shell = require('gulp-shell'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  del = require('del');

// ---- HELPERS
function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}
function logMessage(message) {
  console.log(message);
}

// ---- TASKS
// _____Styles
gulp.task('styles', function () {
  return gulp.src(config.paths.scss + '**/*.scss')
    .pipe(sass({
      noCache: true,
      outputStyle: "nested"
    }))
    .on('error', errorHandler)
    .pipe(postcss([
      autoprefixer({
        browsers: ['> 1% in US', 'IE >= 9'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(config.paths.css))
    .pipe(notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }));
});

// _____Scripts
gulp.task('scripts', function () {
  return gulp.src([
    config.paths.js + 'src/*.js'
  ])
    .pipe(uglify(config.uglify))
    .on('error', errorHandler)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(config.paths.js))
    .pipe(notify({
      title: "JS Minified",
      message: "All JS files in the theme have been minified.",
      onLast: true
    }));
});

/*
gulp.task('polyfills', function () {
  return gulp.src(config.polyfills).pipe(gulp.dest(config.paths.js + 'src/polyfills/'));
});

gulp.task('plugins', function () {
  return gulp.src(config.plugins).pipe(gulp.dest(config.paths.js + 'src/plugins/'));
});
*/

// _____Fonts
gulp.task('fontawesome', function () {
  return gulp.src(config.paths.fontawesome + 'fonts/fontawesome-webfont.*')
    .pipe(gulp.dest(config.paths.fonts));
});
gulp.task('fonts', ['fontawesome']);


// _____Cache Clearing
gulp.task('drush:cr', function () {
  return gulp.src('', {read: false})
    .pipe(shell([
        'drush cr css-js',
        'drush cr advagg'
      ],
      {
        "ignoreErrors": true
      }))
    .on('error', errorHandler)
    .pipe(notify({
      title: "Caches cleared",
      message: "Drupal CSS/JS caches cleared.",
      onLast: true
    }));
});

// _____Cleanup
gulp.task('clean-styles', function () {
  return del([
    config.paths.css + '**/*.css'
  ]);
});
gulp.task('clean-scripts', function () {
  return del([
    config.paths.js + '*.js',
    '!' + config.paths.js + 'src/**/*.js'
  ]);
});
gulp.task('clean-fonts', function () {
  return del([
    config.paths.fonts + '*'
  ]);
});
gulp.task('clean', config.cleantasks);

// _____Watch
gulp.task('watch', function () {
  browserSync.init(config.browsersync);

  // watch for changes in sources
  gulp.watch(config.paths.watchpaths.scss, ['styles', 'drush:cr', browserSync.reload]);
  gulp.watch(config.paths.watchpaths.js, ['scripts', 'drush:cr', browserSync.reload]);
  gulp.watch(config.paths.watchpaths.templates, ['drush:cr', browserSync.reload]);
  // Print out friendly notice that something was added, deleted, or changed
  gulp.watch([config.paths.watchpaths.scss, config.paths.watchpaths.scss, config.paths.watchpaths.templates], logMessage);
});


// _____Default
gulp.task('default', config.defaulttasks);
