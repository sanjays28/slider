import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var Footer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Footer, _React$Component);

  function Footer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Footer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return Footer;
}(React.Component);

Footer.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
export default defaultProps({
  classPrefix: 'footer'
})(Footer);