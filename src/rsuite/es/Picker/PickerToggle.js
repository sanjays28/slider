import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _get from "lodash/get";
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { prefix, getUnhandledProps, defaultProps, createChainedFunction } from '../utils';
import DefaultToggleButton from './DefaultToggleButton';

var PickerToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PickerToggle, _React$Component);

  function PickerToggle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.toggleRef = void 0;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleClean = function (event) {
      var _this$props$onClean, _this$props;

      (_this$props$onClean = (_this$props = _this.props).onClean) === null || _this$props$onClean === void 0 ? void 0 : _this$props$onClean.call(_this$props, event);
      event.stopPropagation();

      _this.handleBlur();
    };

    _this.handleFocus = function () {
      _this.setState({
        active: true
      });
    };

    _this.handleBlur = function () {
      _this.setState({
        active: false
      });
    };

    _this.getToggleNode = function () {
      return _this.toggleRef.current;
    };

    _this.onFocus = function () {
      var _this$toggleRef, _this$toggleRef$curre;

      if (typeof ((_this$toggleRef = _this.toggleRef) === null || _this$toggleRef === void 0 ? void 0 : (_this$toggleRef$curre = _this$toggleRef.current) === null || _this$toggleRef$curre === void 0 ? void 0 : _this$toggleRef$curre.focus) === 'function') {
        _this.toggleRef.current.focus();
      }
    };

    _this.state = {
      active: false
    };
    _this.toggleRef = React.createRef();
    return _this;
  }

  var _proto = PickerToggle.prototype;

  _proto.renderToggleClean = function renderToggleClean() {
    return React.createElement("span", {
      className: this.addPrefix('clean'),
      role: "button",
      tabIndex: -1,
      onClick: this.handleClean
    }, "\u2715");
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        className = _this$props2.className,
        hasValue = _this$props2.hasValue,
        cleanable = _this$props2.cleanable,
        classPrefix = _this$props2.classPrefix,
        caret = _this$props2.caret,
        active = _this$props2.active,
        tabIndex = _this$props2.tabIndex,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["componentClass", "children", "className", "hasValue", "cleanable", "classPrefix", "caret", "active", "tabIndex"]);

    var classes = classNames(classPrefix, className, {
      active: active || this.state.active
    });
    var unhandled = getUnhandledProps(PickerToggle, rest);
    return React.createElement(Component, _extends({}, unhandled, {
      role: "combobox",
      tabIndex: tabIndex,
      className: classes,
      ref: this.toggleRef,
      onFocus: createChainedFunction(this.handleFocus, _get(unhandled, 'onFocus')),
      onBlur: createChainedFunction(this.handleBlur, _get(unhandled, 'onBlur'))
    }), React.createElement("span", {
      className: this.addPrefix(hasValue ? 'value' : 'placeholder')
    }, children), hasValue && cleanable && this.renderToggleClean(), caret && React.createElement("span", {
      className: this.addPrefix('caret')
    }));
  };

  return PickerToggle;
}(React.Component);

PickerToggle.propTypes = {
  classPrefix: PropTypes.string,
  hasValue: PropTypes.bool,
  cleanable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  caret: PropTypes.bool,
  componentClass: PropTypes.elementType,
  onClean: PropTypes.func,
  active: PropTypes.bool
};
PickerToggle.defaultProps = {
  componentClass: DefaultToggleButton,
  tabIndex: 0,
  caret: true
};
var enhance = defaultProps({
  classPrefix: 'picker-toggle'
});
export default enhance(PickerToggle);