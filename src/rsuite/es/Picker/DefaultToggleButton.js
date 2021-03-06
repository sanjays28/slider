import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Button from '../Button';
var DefaultToggleButton = React.forwardRef(function (props, ref) {
  return React.createElement(Button, _extends({
    componentClass: "a",
    ripple: false
  }, props, {
    ref: ref
  }));
});
DefaultToggleButton.displayName = 'DefaultToggleButton';
export default DefaultToggleButton;