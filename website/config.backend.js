const path = require('path');

module.exports = {
  entry: './website.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
};