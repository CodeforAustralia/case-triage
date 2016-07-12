var webpack = require('webpack');

console.log(__dirname);

module.exports = {
  context: __dirname + '/public/js',
  entry: [
    'bootstrap-loader',
    './index.js'
  ],
  output: {
    path: __dirname + '/public/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: 'public'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "raw-loader"
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },

  resolve: {
    alias: {
      'npm': __dirname+'/node_modules'
    },
    extensions: ['', '.js'] // not sure what this does
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
