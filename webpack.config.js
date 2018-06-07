const path = require('path')

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: {
      index: ['babel-polyfill', './src/index.js'],
      edit: ['babel-polyfill', './src/edit.js']
    },
    output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: '[name]-bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }]
    },
    devServer: {
      contentBase: [
        path.resolve(__dirname, 'public'),
        path.resolve(__dirname, 'public/styles') // add additional paths to watch
      ],
      publicPath: '/scripts/',
      watchContentBase: true
    },
    devtool: 'source-map'
  }
}