const TerserPlugin = require("terser-webpack-plugin");
const webpackConfig = require("../webpack.config");

exports.webpackConfig = (production) => ({
  ...webpackConfig,
  devtool: production ? false : "source-map",
  mode: production ? "production" : "development",
  optimization: {
    minimize: production,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: "5",
          toplevel: true,
          compress: true,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
});
