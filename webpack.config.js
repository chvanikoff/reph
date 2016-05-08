const env = process.env.MIX_ENV === "prod" ? "production" : "development";
const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Autoprefixer = require("autoprefixer");

const plugins = {
  production: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
  development: []
}

module.exports = {
  entry: [
    "./web/static/js/index.js",
    "./web/static/styles/index.less"
  ],
  output: {
    path: "./priv/static",
    filename: "js/app.js",
    publicPath: "/",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        plugins: ["transform-decorators-legacy"],
        presets: ["react", "es2015", "stage-2"],
      }
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style", "css?localIdentName=[hash:base64]!postcss!less")
    }, {
      test: /\.png$/,
      loader: "url?" + [
        "limit=100000",
        "mimetype=image/png"
      ].join("&"),
    }, {
      test: /\.gif$/,
      loader: "url?" + [
        "limit=100000",
        "mimetype=image/gif"
      ].join("&"),
    }, {
      test: /\.jpg$/,
      loader: "file?name=images/[name].[ext]",
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=application/font-woff",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.ttf$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=application/octet-stream",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.eot$/,
      loader: "url?" + [
        "limit=10000",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.svg$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=image/svg+xml",
        "name=images/[name].[ext]"
      ].join("&"),
    }],
  },
  postcss: [
    Autoprefixer({
      browsers: ["last 2 versions"]
    })
  ],
  resolve: {
    extensions: ["", ".js", ".less", ".css"],
    modulesDirectories: ["node_modules", __dirname + "/web/static/js"],
    alias: {
      styles: __dirname + "/web/static/styles"
    }
  },
  plugins: [
    // Important to keep React file size down
    new Webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env),
      },
    }),
    new Webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/app.css"),
    new CopyPlugin([{from: "./web/static/assets"}])
  ].concat(plugins[env])
};