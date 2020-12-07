/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
  },
  devtool: false,
});
