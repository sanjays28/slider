import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import classNames from 'classnames';
import { defaultClassPrefix } from '../utils/prefix';

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

  var styles = _extends({}, style, (_extends2 = {}, _extends2[startKey] = start + "%", _extends2[sizeKey] = end - start + "%", _extends2));

  return React.createElement("div", {
    style: styles,
    className: classNames(defaultClassPrefix('slider-progress-bar'), className)
  });
}

export default ProgressBar;