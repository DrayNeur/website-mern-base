const path = require('path');
const fs = require('fs');
var idanticache = (Math.random() + 1).toString(36).substring(7);


module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'app.'+idanticache+'.js',
    path: path.resolve(__dirname, 'build', 'public', 'js'),
  },
};

fs.writeFileSync(path.join(__dirname, 'index.html'), fs.readFileSync(path.join(__dirname, 'index.html')).toString().replace('%idanticache%', idanticache));
