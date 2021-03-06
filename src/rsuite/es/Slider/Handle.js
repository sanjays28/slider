import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import classNames from 'classnames';
import { DOMMouseMoveTracker, addStyle, getWidth } from 'dom-lib';
import Tooltip from '../Tooltip';
import { prefix, defaultProps } from '../utils';

var Handle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Handle, _React$Component);

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
      return prefix(_this.props.classPrefix)(name);
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
    return this.mouseMoveTracker || new DOMMouseMoveTracker(this.handleDragMove, this.handleDragEnd, document.body);
  };

  _proto.setTooltipPosition = function setTooltipPosition() {
    var tooltip = this.props.tooltip;
    var tooltipElement = this.tooltipRef.current;

    if (tooltip && tooltipElement) {
      var width = getWidth(tooltipElement);
      addStyle(tooltipElement, 'left', "-" + width / 2 + "px");
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

    var styles = _extends({}, style, (_extends2 = {}, _extends2[direction] = position + "%", _extends2));

    var handleClasses = classNames(this.addPrefix('handle'), className, {
      active: active
    });
    return React.createElement("div", {
      className: handleClasses,
      role: "presentation",
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      style: styles
    }, tooltip && React.createElement(Tooltip, {
      htmlElementRef: this.tooltipRef,
      className: classNames(this.addPrefix('tooltip'), 'placement-top')
    }, renderTooltip ? renderTooltip(value) : value), children);
  };

  return Handle;
}(React.Component);

export default defaultProps({
  classPrefix: 'slider'
})(Handle);