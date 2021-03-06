import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _isUndefined from "lodash/isUndefined";
import _get from "lodash/get";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withStyleProps, defaultProps, createChainedFunction, getUnhandledProps, refType } from '../utils';
import { FormPlaintextContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Input, _React$Component);

  function Input() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var _this$props$onChange, _this$props;

      var nextValue = _get(event, 'target.value');

      (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, nextValue, event);
    };

    _this.handleKeyDown = function (event) {
      var _this$props$onKeyDown, _this$props3;

      if (event.keyCode === 13) {
        var _this$props$onPressEn, _this$props2;

        (_this$props$onPressEn = (_this$props2 = _this.props).onPressEnter) === null || _this$props$onPressEn === void 0 ? void 0 : _this$props$onPressEn.call(_this$props2, event);
      }

      (_this$props$onKeyDown = (_this$props3 = _this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 ? void 0 : _this$props$onKeyDown.call(_this$props3, event);
    };

    return _this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        type = _this$props4.type,
        className = _this$props4.className,
        classPrefix = _this$props4.classPrefix,
        Component = _this$props4.componentClass,
        onFocus = _this$props4.onFocus,
        onBlur = _this$props4.onBlur,
        disabled = _this$props4.disabled,
        value = _this$props4.value,
        defaultValue = _this$props4.defaultValue,
        inputRef = _this$props4.inputRef,
        id = _this$props4.id,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["type", "className", "classPrefix", "componentClass", "onFocus", "onBlur", "disabled", "value", "defaultValue", "inputRef", "id"]);

    var classes = classNames(classPrefix, className);
    var unhandled = getUnhandledProps(Input, rest);
    var plaintextInput = React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), _isUndefined(value) ? defaultValue : value);
    var input = React.createElement(FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement(Component, _extends({}, unhandled, {
        ref: inputRef,
        type: type,
        id: id || controlId,
        value: value,
        defaultValue: defaultValue,
        disabled: disabled,
        onKeyDown: _this2.handleKeyDown,
        onFocus: createChainedFunction(onFocus, _get(_this2.context, 'onFocus')),
        onBlur: createChainedFunction(onBlur, _get(_this2.context, 'onBlur')),
        className: classes,
        onChange: _this2.handleChange
      }));
    });
    return React.createElement(FormPlaintextContext.Consumer, null, function (plaintext) {
      return plaintext ? plaintextInput : input;
    });
  };

  return Input;
}(React.Component);

Input.contextType = InputGroupContext;
Input.propTypes = {
  type: PropTypes.string,
  componentClass: PropTypes.elementType,
  id: PropTypes.string,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputRef: refType,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPressEnter: PropTypes.func
};
Input.defaultProps = {
  type: 'text'
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'input',
  componentClass: 'input'
}))(Input);