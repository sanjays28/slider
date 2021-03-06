import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, defaultProps, prefix, isIE11 } from '../utils';

var Button = function Button(props) {
  return React.createElement("button", _extends({}, props, {
    type: "button"
  }));
};

var UploadTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(UploadTrigger, _React$Component);

  function UploadTrigger(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;

    _this.handleClick = function () {
      !_this.props.disabled && _this.inputRef.current.click();
    };

    _this.handleDragEnter = function (event) {
      var _this$props$onDragEnt, _this$props;

      if (_this.props.draggable) {
        event.preventDefault();

        _this.setState({
          dragOver: true
        });
      }

      (_this$props$onDragEnt = (_this$props = _this.props).onDragEnter) === null || _this$props$onDragEnt === void 0 ? void 0 : _this$props$onDragEnt.call(_this$props, event);
    };

    _this.handleDragLeave = function (event) {
      var _this$props$onDragLea, _this$props2;

      if (_this.props.draggable) {
        event.preventDefault();

        _this.setState({
          dragOver: false
        });
      }

      (_this$props$onDragLea = (_this$props2 = _this.props).onDragLeave) === null || _this$props$onDragLea === void 0 ? void 0 : _this$props$onDragLea.call(_this$props2, event);
    };

    _this.handleDragOver = function (event) {
      var _this$props$onDragOve, _this$props3;

      _this.props.draggable && event.preventDefault();
      (_this$props$onDragOve = (_this$props3 = _this.props).onDragOver) === null || _this$props$onDragOve === void 0 ? void 0 : _this$props$onDragOve.call(_this$props3, event);
    };

    _this.handleDrop = function (event) {
      var _this$props$onDrop, _this$props5;

      if (_this.props.draggable) {
        var _this$props$onChange, _this$props4;

        event.preventDefault();

        _this.setState({
          dragOver: false
        });

        (_this$props$onChange = (_this$props4 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props4, event);
      }

      (_this$props$onDrop = (_this$props5 = _this.props).onDrop) === null || _this$props$onDrop === void 0 ? void 0 : _this$props$onDrop.call(_this$props5, event);
    };

    _this.handleChange = function (event) {
      var _this$props$onChange3, _this$props7;

      if (isIE11()) {
        var _event$target, _event$target$files;

        /**
         * IE11 triggers onChange event of file input when element.value is assigned
         * https://github.com/facebook/react/issues/8793
         */
        if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : (_event$target$files = _event$target.files) === null || _event$target$files === void 0 ? void 0 : _event$target$files.length) > 0) {
          var _this$props$onChange2, _this$props6;

          (_this$props$onChange2 = (_this$props6 = _this.props).onChange) === null || _this$props$onChange2 === void 0 ? void 0 : _this$props$onChange2.call(_this$props6, event);
        }

        return;
      }

      (_this$props$onChange3 = (_this$props7 = _this.props).onChange) === null || _this$props$onChange3 === void 0 ? void 0 : _this$props$onChange3.call(_this$props7, event);
    };

    _this.inputRef = React.createRef();
    _this.state = {
      dragOver: false
    };
    return _this;
  }

  var _proto = UploadTrigger.prototype;

  _proto.getInputInstance = function getInputInstance() {
    return this.inputRef.current;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props8 = this.props,
        name = _this$props8.name,
        accept = _this$props8.accept,
        multiple = _this$props8.multiple,
        disabled = _this$props8.disabled,
        children = _this$props8.children,
        classPrefix = _this$props8.classPrefix,
        className = _this$props8.className,
        Component = _this$props8.componentClass,
        rest = _objectWithoutPropertiesLoose(_this$props8, ["name", "accept", "multiple", "disabled", "children", "classPrefix", "className", "componentClass"]);

    var unhandled = getUnhandledProps(UploadTrigger, rest);
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('customize')] = children, _classNames[addPrefix('drag-over')] = this.state.dragOver, _classNames));

    var buttonProps = _extends({}, unhandled, {
      className: addPrefix('btn'),
      onClick: this.handleClick,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop
    });

    var trigger = children ? React.cloneElement(React.Children.only(children), buttonProps) : React.createElement(Component, buttonProps, React.createElement(FormattedMessage, {
      id: "upload"
    }), React.createElement(Ripple, null));
    return React.createElement("div", {
      className: classes
    }, React.createElement("input", {
      type: "file",
      name: name,
      multiple: multiple,
      disabled: disabled,
      accept: accept,
      ref: this.inputRef,
      onChange: this.handleChange
    }), trigger);
  };

  return UploadTrigger;
}(React.Component);

UploadTrigger.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  componentClass: PropTypes.elementType,
  draggable: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func
};
export default defaultProps({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);