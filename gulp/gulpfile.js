"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassLint = require("gulp-sass-lint");
var rename = require("gulp-rename");
var prefix = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();
var scripts = [
  "../assets/js/lib/headroom/headroom.min.js",
  "../assets/js/lib/scrollmagic/ScrollMagic.min.js",
  "../assets/js/app.js"
];

gulp.task("html", function() {
  return gulp
    .src("../*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("../docs"));
});

gulp.task("sass-lint", function() {
  return gulp
    .src("../assets/**/*.scss")
    .pipe(
      sassLint({
        configFile: ".scss-lint-config.yml"
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task("sass", ["sass-lint"], function() {
  return gulp
    .src("../assets/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["node_modules/superior-scss/src"]
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../docs/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return gulp
    .src(scripts)
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../docs/js"))
    .pipe(browserSync.stream());
});

gulp.task("serve", ["sass", "js"], function() {
  browserSync.init({
    server: "../docs",
    browser: "Google Chrome"
  });

  gulp.watch("../*.html", ["html"]);
  gulp.watch("../assets/scss/**/*.scss", ["sass"]);
  gulp.watch("../assets/js/**/*.js", ["js"]);
  gulp.watch("../*.html").on("change", browserSync.reload);
});

gulp.task("default", ["html", "sass", "js", "serve"]);