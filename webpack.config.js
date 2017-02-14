module.exports = {
  entry: './lib/main.jsx',
  devServer:{
    inline:true,
    progress:true,
    contentBase:'public',
    historyApiFallback: true
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
    loaders:[{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude:/node_modules/,
      include: `${__dirname}/lib`,
      query: {
        presets: ['es2015', 'react', 'stage-3']
      }
    },
    { test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
};
