const path = require("path");
const fs = require("fs");

const cssPath = path.join(__dirname, "dist/index.development.min.css");
const cssExists = fs.existsSync(cssPath);

module.exports = {
  components: "src/**/*.jsx",
  ignore: ["src/**/*.spec.{jsx,js}"],
  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, ".examples.md");
  },
  require: [
    ...(cssExists ? [cssPath] : []),
  ],
  styleguideDir: "dist/docs",
  webpackConfig: {
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                ["@babel/preset-react", {
                  runtime: "automatic",
                  importSource: "preact"
                }],
              ],
              plugins: [
                ["@babel/plugin-transform-react-jsx", {
                  runtime: "automatic",
                  importSource: "preact"
                }],
              ],
            },
          },
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
};