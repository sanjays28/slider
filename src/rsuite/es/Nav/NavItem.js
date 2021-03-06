import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import appendTooltip from '../utils/appendTooltip';
import { createChainedFunction, defaultProps, prefix, getUnhandledProps } from '../utils';

var NavItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavItem, _React$Component);

  function NavItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          eventKey = _this$props.eventKey;

      if (onSelect && !disabled) {
        onSelect(eventKey, event);
      }
    };

    return _this;
  }

  var _proto = NavItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        children = _this$props2.children,
        icon = _this$props2.icon,
        tabIndex = _this$props2.tabIndex,
        hasTooltip = _this$props2.hasTooltip,
        divider = _this$props2.divider,
        panel = _this$props2.panel,
        Component = _this$props2.componentClass,
        renderItem = _this$props2.renderItem,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["active", "disabled", "onClick", "className", "classPrefix", "style", "children", "icon", "tabIndex", "hasTooltip", "divider", "panel", "componentClass", "renderItem"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(NavItem, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames));

    if (divider) {
      return React.createElement("li", {
        role: "separator",
        style: style,
        className: classNames(addPrefix('divider'), className)
      });
    }

    if (panel) {
      return React.createElement("li", {
        style: style,
        className: classNames(addPrefix('panel'), className)
      }, children);
    }

    if (Component === SafeAnchor) {
      unhandled.disabled = disabled;
    }

    var item = React.createElement(Component, _extends({}, unhandled, {
      role: "button",
      tabIndex: tabIndex,
      className: addPrefix('content'),
      onClick: createChainedFunction(onClick, this.handleClick)
    }), icon, children, React.createElement(Ripple, null));

    if (renderItem) {
      item = renderItem(item);
    }

    return React.createElement("li", {
      className: classes,
      style: style
    }, hasTooltip ? appendTooltip({
      children: item,
      message: children,
      placement: 'right'
    }) : item);
  };

  return NavItem;
}(React.Component);

NavItem.displayName = 'NavItem';
NavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any,
  tabIndex: PropTypes.number,
  hasTooltip: PropTypes.bool,
  componentClass: PropTypes.elementType,
  renderItem: PropTypes.func
};
NavItem.defaultProps = {
  tabIndex: 0
};
export default defaultProps({
  classPrefix: 'nav-item',
  componentClass: SafeAnchor
})(NavItem);