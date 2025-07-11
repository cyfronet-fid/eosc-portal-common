const { src, dest, series, parallel } = require("gulp");
const path = require("path");
const parser = require("yargs-parser");
const rename = require("gulp-rename");
const named = require("vinyl-named");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const { execa } = require("execa");
const { webpackConfig } = require("./webpack.helper");
const { validEnvArgv, validProductionArgv } = require("./validators");
const { COMPONENTS_PATHS } = require("../app");
const { STYLES_PATHS } = require("../app");
const { getSuffixBy } = require("./utils");

const rootPath = path.resolve(__dirname, "../");

exports.buildLib = (argv = []) => {
    const args = Array.isArray(argv) ? argv : process.argv.slice(2);
    const { production, env } = parser(args);

    const bundleEntries = COMPONENTS_PATHS.map((componentPath) => path.resolve(rootPath, componentPath));

    return series(
        parallel(validProductionArgv(production), validEnvArgv(env)),
        parallel(
            // UŻYJ SYSTEMOWEGO cp DO KOPIOWANIA BEZ PRZETWARZANIA
            async function moveAssets() {
                try {
                    await execa("mkdir", ["-p", "dist"], { cwd: rootPath });
                    await execa("cp", ["-r", "styles/assets", "dist/"], { cwd: rootPath });
                } catch (error) {
                    console.log("Assets copy failed:", error.message);
                }
            },
            series(replaceEnvConfig(env), transpileFiles(bundleEntries, production, env)),
            preprocessStyles(production, env)
        ),
        async function removeMisc() {
            const commands = [
                "find . -name '*.js' ! -name '*.min.js' -delete",
                "find . -name '*.js.map' ! -name '*.min.js.map' -delete",
                "find . -name '*[0-9]*.js' -delete",
            ];
            const cmdOptions = { shell: true, cwd: path.resolve(rootPath, "dist") };

            try {
                await Promise.all(commands.map(cmd => {
                    const [command, ...args] = cmd.split(' ');
                    return execa(command, args, cmdOptions).catch(() => {});
                }));
            } catch (error) {
                console.log("Some cleanup commands failed, but continuing...");
            }
        }
    );
};

// Reszta bez zmian...
const preprocessStyles = (production, env, browserSync = null) => {
    return parallel(
        series(
            function preprocessStylesToSeparateFiles() {
                return src(STYLES_PATHS.map((stylesPath) => path.resolve(rootPath, stylesPath)))
                    .pipe(webpackStream(webpackConfig(production), webpack))
                    .pipe(rename({ suffix: `.${getSuffixBy(env)}.min` }))
                    .pipe(dest(path.resolve(rootPath, "dist")));
            },
            function notifyBrowserSync(cb) {
                if (browserSync) {
                    browserSync.stream();
                }
                cb();
            }
        ),
        series(
            function preprocessStylesBundle() {
                return src(path.resolve(rootPath, "styles/index.scss"))
                    .pipe(webpackStream(webpackConfig(production), webpack))
                    .pipe(rename({ suffix: `.${getSuffixBy(env)}.min` }))
                    .pipe(dest(path.resolve(rootPath, "dist")));
            },
            function notifyBrowserSyncBundle(cb) {
                if (browserSync) {
                    browserSync.stream();
                }
                cb();
            }
        )
    );
};

exports.preprocessStyles = preprocessStyles;

function transpileFiles(paths, production, env, bundleName = "index") {
    function transpileFilesTask() {
        return (
            src(paths)
                .pipe(named((file) => `${_toName(file.path).replace(".interface", "")}.${getSuffixBy(env)}.min`))
                .pipe(webpackStream(webpackConfig(production), webpack))
                .pipe(dest(path.resolve(rootPath, "dist")))
        );
    }

    const importsFilePath = path.resolve(rootPath, "dist/app.js");
    function transpileBundle() {
        const imports = paths
            .map((path) => {
                const alias = _toName(path).replace(".interface", "").replace("-", "_");
                return `import {default as ${alias}} from "${path}"; ${alias};`;
            })
            .join("");
        require("fs").writeFileSync(importsFilePath, imports);

        return (
            src(importsFilePath)
                .pipe(webpackStream(webpackConfig(production), webpack))
                .pipe(rename({ basename: `${bundleName}.${getSuffixBy(env)}.min` }))
                .pipe(dest(path.resolve(rootPath, "dist")))
        );
    }

    return parallel(
        transpileFilesTask,
        series(transpileBundle, async function cleanupTempFile() {
            try {
                await execa("rm", ["-fR", importsFilePath], { stdio: "inherit" });
            } catch (error) {}
        })
    );
}

function _toName(path) {
    return path
        .replace(/^.*[\\\/]/, "")
        .replace(/\.[^/.]+$/, "")
        .replace(".component", "");
}

function replaceEnvConfig(env) {
    function replaceEnvConfigTask() {
        return src(path.resolve(rootPath, env))
            .pipe(rename("env.js"))
            .pipe(dest(path.resolve(rootPath, "env")));
    }

    return replaceEnvConfigTask;
}