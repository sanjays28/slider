"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _domLib = require("dom-lib");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _utils = require("../utils");

var Handle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Handle, _React$Component);

  function Handle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.tooltipRef = void 0;
    _this.mouseMoveTracker = null;

    _this.releaseMouseMoves = function () {
      if (_this.mouseMoveTracker) {
        _this.mouseMoveTracker.releaseMouseMoves();

        _this.mouseMoveTracker = null;
      }
    };

    _this.handleDragMove = function (_deltaX, _deltaY, event) {
      var _this$props$onDragMov, _this$props;

      if (!_this.mouseMoveTracker || !_this.mouseMoveTracker.isDragging()) {
        return;
      }

      (_this$props$onDragMov = (_this$props = _this.props).onDragMove) === null || _this$props$onDragMov === void 0 ? void 0 : _this$props$onDragMov.call(_this$props, event);

      _this.setTooltipPosition();
    };

    _this.handleDragEnd = function (event) {
      var _this$props$onDragEnd, _this$props2;

      _this.releaseMouseMoves();

      _this.setState({
        active: false
      });

      (_this$props$onDragEnd = (_this$props2 = _this.props).onDragEnd) === null || _this$props$onDragEnd === void 0 ? void 0 : _this$props$onDragEnd.call(_this$props2, event);
    };

    _this.handleMouseDown = function (event) {
      var _this$props$onDragSta, _this$props3;

      if (_this.props.disabled) {
        return;
      }

      _this.mouseMoveTracker = _this.getMouseMoveTracker();

      _this.mouseMoveTracker.captureMouseMoves(event);

      _this.setState({
        active: true
      });

      (_this$props$onDragSta = (_this$props3 = _this.props).onDragStart) === null || _this$props$onDragSta === void 0 ? void 0 : _this$props$onDragSta.call(_this$props3, event);
    };

    _this.handleMouseEnter = function () {
      _this.setTooltipPosition();
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      active: false
    };
    _this.tooltipRef = React.createRef();
    return _this;
  }

  var _proto = Handle.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.releaseMouseMoves();
  };

  _proto.getMouseMoveTracker = function getMouseMoveTracker() {
    return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.handleDragMove, this.handleDragEnd, document.body);
  };

  _proto.setTooltipPosition = function setTooltipPosition() {
    var tooltip = this.props.tooltip;
    var tooltipElement = this.tooltipRef.current;

    if (tooltip && tooltipElement) {
      var width = (0, _domLib.getWidth)(tooltipElement);
      (0, _domLib.addStyle)(tooltipElement, 'left', "-" + width / 2 + "px");
    }
  };

  _proto.render = function render() {
    var _extends2;

    var _this$props4 = this.props,
        className = _this$props4.className,
        style = _this$props4.style,
        children = _this$props4.children,
        position = _this$props4.position,
        vertical = _this$props4.vertical,
        tooltip = _this$props4.tooltip,
        renderTooltip = _this$props4.renderTooltip,
        rtl = _this$props4.rtl,
        value = _this$props4.value;
    var active = this.state.active;
    var horizontalKey = rtl ? 'right' : 'left';
    var direction = vertical ? 'top' : horizontalKey;
    var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2[direction] = position + "%", _extends2));
    var handleClasses = (0, _classnames.default)(this.addPrefix('handle'), className, {
      active: active
    });
    return React.createElement("div", {
      className: handleClasses,
      role: "presentation",
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      style: styles
    }, tooltip && React.createElement(_Tooltip.default, {
      htmlElementRef: this.tooltipRef,
      className: (0, _classnames.default)(this.addPrefix('tooltip'), 'placement-top')
    }, renderTooltip ? renderTooltip(value) : value), children);
  };

  return Handle;
}(React.Component);

var _default = (0, _utils.defaultProps)({
  classPrefix: 'slider'
})(Handle);

exports.default = _default;
module.exports = exports.default;