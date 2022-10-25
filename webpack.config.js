const path = require(`path`);

module.exports = {
  mode: "development",
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true
  }
}
