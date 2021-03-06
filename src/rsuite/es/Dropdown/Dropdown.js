import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _kebabCase from "lodash/kebabCase";
import _isUndefined from "lodash/isUndefined";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import RootCloseWrapper from '../Overlay/RootCloseWrapper';
import shallowEqual from '../utils/shallowEqual';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import { createChainedFunction, prefix, isOneOf, getUnhandledProps, defaultProps, placementPolyfill } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { PLACEMENT_8 } from '../constants';

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Dropdown, _React$Component);

  function Dropdown(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.toggle = function (isOpen) {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onToggle = _this$props.onToggle;
      var open = _isUndefined(isOpen) ? !_this.getOpen() : isOpen;
      var handleToggle = open ? onOpen : onClose;

      _this.setState({
        open: open
      });

      handleToggle === null || handleToggle === void 0 ? void 0 : handleToggle();
      onToggle === null || onToggle === void 0 ? void 0 : onToggle(open);
    };

    _this.handleClick = function (event) {
      event.preventDefault();

      if (_this.props.disabled) {
        return;
      }

      _this.toggle();
    };

    _this.handleOpenChange = function (event) {
      var _this$context, _this$context$onOpenC;

      var eventKey = _this.props.eventKey;
      (_this$context = _this.context) === null || _this$context === void 0 ? void 0 : (_this$context$onOpenC = _this$context.onOpenChange) === null || _this$context$onOpenC === void 0 ? void 0 : _this$context$onOpenC.call(_this$context, eventKey, event);
    };

    _this.handleToggleChange = function (eventKey, event) {
      var _this$context2, _this$context2$onOpen;

      (_this$context2 = _this.context) === null || _this$context2 === void 0 ? void 0 : (_this$context2$onOpen = _this$context2.onOpenChange) === null || _this$context2$onOpen === void 0 ? void 0 : _this$context2$onOpen.call(_this$context2, eventKey, event);
    };

    _this.handleMouseEnter = function () {
      if (!_this.props.disabled) {
        _this.toggle(true);
      }
    };

    _this.handleMouseLeave = function () {
      if (!_this.props.disabled) {
        _this.toggle(false);
      }
    };

    _this.handleSelect = function (eventKey, event) {
      var _this$props$onSelect, _this$props2;

      (_this$props$onSelect = (_this$props2 = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props2, eventKey, event);

      _this.toggle(false);
    };

    _this.state = {
      open: props.open
    };
    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.getOpen = function getOpen() {
    var open = this.props.open;

    if (_isUndefined(open)) {
      return this.state.open;
    }

    return open;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        title = _this$props3.title,
        children = _this$props3.children,
        className = _this$props3.className,
        menuStyle = _this$props3.menuStyle,
        disabled = _this$props3.disabled,
        renderTitle = _this$props3.renderTitle,
        classPrefix = _this$props3.classPrefix,
        placement = _this$props3.placement,
        activeKey = _this$props3.activeKey,
        tabIndex = _this$props3.tabIndex,
        toggleClassName = _this$props3.toggleClassName,
        trigger = _this$props3.trigger,
        icon = _this$props3.icon,
        onClick = _this$props3.onClick,
        onMouseEnter = _this$props3.onMouseEnter,
        onMouseLeave = _this$props3.onMouseLeave,
        onContextMenu = _this$props3.onContextMenu,
        eventKey = _this$props3.eventKey,
        Component = _this$props3.componentClass,
        toggleComponentClass = _this$props3.toggleComponentClass,
        noCaret = _this$props3.noCaret,
        style = _this$props3.style,
        showHeader = _this$props3.showHeader,
        props = _objectWithoutPropertiesLoose(_this$props3, ["title", "children", "className", "menuStyle", "disabled", "renderTitle", "classPrefix", "placement", "activeKey", "tabIndex", "toggleClassName", "trigger", "icon", "onClick", "onMouseEnter", "onMouseLeave", "onContextMenu", "eventKey", "componentClass", "toggleComponentClass", "noCaret", "style", "showHeader"]);

    var _ref = this.context || {},
        _ref$openKeys = _ref.openKeys,
        openKeys = _ref$openKeys === void 0 ? [] : _ref$openKeys,
        sidenav = _ref.sidenav,
        expanded = _ref.expanded;

    var menuExpanded = openKeys.some(function (key) {
      return shallowEqual(key, eventKey);
    });
    var addPrefix = prefix(classPrefix);
    var open = this.getOpen();
    var collapsible = sidenav && expanded;
    var unhandled = getUnhandledProps(Dropdown, props);

    var toggleProps = _extends({}, unhandled, {
      onClick: createChainedFunction(this.handleOpenChange, onClick),
      onContextMenu: onContextMenu
    });

    var dropdownProps = {
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    };
    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */

    if (!collapsible) {
      if (isOneOf('click', trigger)) {
        toggleProps.onClick = createChainedFunction(this.handleClick, toggleProps.onClick);
      }

      if (isOneOf('contextMenu', trigger)) {
        toggleProps.onContextMenu = createChainedFunction(this.handleClick, onContextMenu);
      }

      if (isOneOf('hover', trigger)) {
        dropdownProps.onMouseEnter = createChainedFunction(this.handleMouseEnter, onMouseEnter);
        dropdownProps.onMouseLeave = createChainedFunction(this.handleMouseLeave, onMouseLeave);
      }
    }

    var menuProps = {
      collapsible: collapsible,
      activeKey: activeKey,
      openKeys: openKeys,
      expanded: menuExpanded,
      style: menuStyle,
      onSelect: this.handleSelect,
      onToggle: this.handleToggleChange
    };
    var menu = React.createElement(DropdownMenu, menuProps, children);

    if (open) {
      menu = React.createElement(RootCloseWrapper, {
        onRootClose: this.toggle
      }, function (props, ref) {
        return React.createElement(DropdownMenu, _extends({}, props, menuProps, {
          htmlElementRef: ref
        }), showHeader && React.createElement("li", {
          className: addPrefix('header')
        }, title), children);
      });
    }

    var toggle = React.createElement(DropdownToggle, _extends({}, toggleProps, {
      noCaret: noCaret,
      tabIndex: tabIndex,
      className: toggleClassName,
      renderTitle: renderTitle,
      icon: icon,
      componentClass: toggleComponentClass
    }), title);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix("placement-" + _kebabCase(placementPolyfill(placement)))] = placement, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('no-caret')] = noCaret, _classNames[addPrefix('open')] = open, _classNames[addPrefix(menuExpanded ? 'expand' : 'collapse')] = sidenav, _classNames));
    return React.createElement(Component, _extends({}, dropdownProps, {
      style: style,
      className: classes,
      role: "menu"
    }), menu, toggle);
  };

  return Dropdown;
}(React.Component);

Dropdown.displayName = 'Dropdown';
Dropdown.contextType = SidenavContext;
Dropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover', 'contextMenu'])]),
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  componentClass: PropTypes.elementType,
  toggleComponentClass: PropTypes.elementType,
  noCaret: PropTypes.bool,
  showHeader: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func
};
Dropdown.defaultProps = {
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};
var EnhancedDropdown = defaultProps({
  componentClass: 'div',
  classPrefix: 'dropdown'
})(Dropdown);
setStatic('Item', DropdownMenuItem)(EnhancedDropdown);
setStatic('Menu', DropdownMenu)(EnhancedDropdown);
export default EnhancedDropdown;