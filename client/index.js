var router = require('./router');
var React = require('react');
var ReactDOM = require('react-dom');
require('./less/index.less');

module.exports = function(node) {
  ReactDOM.render(router(), node);
};
