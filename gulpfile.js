var gulp = require("gulp");
var typedoc = require("gulp-typedoc");

gulp.task("common:typedoc", function() {
    return gulp
        .src(["modules/@themost/common/*.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "./modules/@themost/common/out",

            // TypeDoc options (see typedoc docs)
            name: "@themost/common",
            plugins: ["my", "plugins"],
            ignoreCompilerErrors: false,
            version: true
        }))
        ;
});