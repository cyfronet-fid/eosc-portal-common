const { series } = require("gulp");
const { execa } = require("execa");
const { updateS3BucketPolicy } = require("./deployment/update-s3-policies");
const { serve } = require("./deployment/serve.helper");
const { buildLib } = require("./deployment/lib-build.helper");

// Build task
async function build() {
    const args = process.argv.slice(2);
    if (!args.includes('--env')) {
        args.push('--env', 'env/env.production.js');
    }

    // buildLib returns function gulp.series()
    const buildTask = buildLib(args);
    return new Promise((resolve, reject) => {
        buildTask((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// Serve task
function serveTask() {
    return serve();
}

// Remove dist directory
async function removeDist() {
    try {
        await execa("rm", ["-fR", "dist"], { stdio: "inherit" });
    } catch (error) {
        console.log("Directory already removed or doesn't exist");
    }
}

// Update S3 policies task
function updateS3Policies() {
    return updateS3BucketPolicy();
}

// Export tasks
exports.build = build;
exports.serve = serveTask;
exports.remove_dist = removeDist;
exports.updateS3Policies = updateS3Policies;
exports['update-s3-policies'] = updateS3Policies;
exports.default = series(removeDist, build);