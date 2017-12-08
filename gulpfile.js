const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task("pug", () => {
  const LOCALS = {};

  gulp
    .src("./pug/*.pug")
    .pipe(
      pug({
        locals: LOCALS
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("sass", () => {
  gulp
    .src("./css/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["> 5%", "last 2 versions", "Firefox >= 20"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./css/"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("default", ["pug", "sass"], () => {
  browserSync({
    server: "./",
    port: 3000,
    open: false
  });
  gulp.watch("./pug/*.pug", ["pug"]);
  gulp.watch("./css/*.scss", ["sass"]);
});
