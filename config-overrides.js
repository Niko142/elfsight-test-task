const { override, addBabelPlugin, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugin(['babel-plugin-styled-components']),
  addWebpackAlias({ '@assets': path.resolve(__dirname, 'src/assets') })
);
