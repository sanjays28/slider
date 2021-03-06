"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _prefix = require("../utils/prefix");

function ProgressBar(props) {
  var _extends2;

  var vertical = props.vertical,
      rtl = props.rtl,
      _props$end = props.end,
      end = _props$end === void 0 ? 0 : _props$end,
      _props$start = props.start,
      start = _props$start === void 0 ? 0 : _props$start,
      style = props.style,
      className = props.className;
  var sizeKey = vertical ? 'height' : 'width';
  var dirKey = rtl ? 'right' : 'left';
  var startKey = vertical ? 'top' : dirKey;
  var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2[startKey] = start + "%", _extends2[sizeKey] = end - start + "%", _extends2));
  return React.createElement("div", {
    style: styles,
    className: (0, _classnames.default)((0, _prefix.defaultClassPrefix)('slider-progress-bar'), className)
  });
}

var _default = ProgressBar;
exports.default = _default;
module.exports = exports.default;