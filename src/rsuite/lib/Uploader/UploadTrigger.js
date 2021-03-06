"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _utils = require("../utils");

var Button = function Button(props) {
  return React.createElement("button", (0, _extends2.default)({}, props, {
    type: "button"
  }));
};

var UploadTrigger =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(UploadTrigger, _React$Component);

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

      if ((0, _utils.isIE11)()) {
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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props8, ["name", "accept", "multiple", "disabled", "children", "classPrefix", "className", "componentClass"]);
    var unhandled = (0, _utils.getUnhandledProps)(UploadTrigger, rest);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('customize')] = children, _classNames[addPrefix('drag-over')] = this.state.dragOver, _classNames));
    var buttonProps = (0, _extends2.default)({}, unhandled, {
      className: addPrefix('btn'),
      onClick: this.handleClick,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragOver: this.handleDragOver,
      onDrop: this.handleDrop
    });
    var trigger = children ? React.cloneElement(React.Children.only(children), buttonProps) : React.createElement(Component, buttonProps, React.createElement(_FormattedMessage.default, {
      id: "upload"
    }), React.createElement(_Ripple.default, null));
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
  name: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  accept: _propTypes.default.string,
  onChange: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  componentClass: _propTypes.default.elementType,
  draggable: _propTypes.default.bool,
  onDragEnter: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDrop: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);

exports.default = _default;
module.exports = exports.default;