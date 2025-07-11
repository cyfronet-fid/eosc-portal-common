module.exports = {
  mode: "development",
  resolve: {
    extensions: [".jsx", ".js", ".css", ".scss"],
    modules: ["node_modules"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules|\.git/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: {
                  node: "current"
                },
                modules: false
              }],
              ["@babel/preset-react", {
                runtime: "automatic",
                importSource: "preact"
              }]
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-transform-react-jsx", {
                runtime: "automatic",
                importSource: "preact"
              }]
            ]
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "[name].css"
        },
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};