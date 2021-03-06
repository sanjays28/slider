import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _remove from "lodash/remove";
import _clone from "lodash/clone";
import _isUndefined from "lodash/isUndefined";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import Transition from '../Animation/Transition';
import shallowEqual from '../utils/shallowEqual';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import { prefix, defaultProps, getUnhandledProps, createContext } from '../utils';
export var SidenavContext = createContext(null);

var Sidenav =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Sidenav, _React$Component);

  function Sidenav(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getOpenKeys = function () {
      var openKeys = _this.props.openKeys;

      if (_isUndefined(openKeys)) {
        return _this.state.openKeys;
      }

      return openKeys;
    };

    _this.handleSelect = function (eventKey, event) {
      var _this$props$onSelect, _this$props;

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, eventKey, event);
    };

    _this.handleOpenChange = function (eventKey, event) {
      var _this$props$onOpenCha, _this$props2;

      var find = function find(key) {
        return shallowEqual(key, eventKey);
      };

      var openKeys = _clone(_this.getOpenKeys()) || [];

      if (openKeys.some(find)) {
        _remove(openKeys, find);
      } else {
        openKeys.push(eventKey);
      }

      _this.setState({
        openKeys: openKeys
      });

      (_this$props$onOpenCha = (_this$props2 = _this.props).onOpenChange) === null || _this$props$onOpenCha === void 0 ? void 0 : _this$props$onOpenCha.call(_this$props2, openKeys, event);
    };

    _this.state = {
      openKeys: props.defaultOpenKeys || []
    };
    return _this;
  }

  var _proto = Sidenav.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        classPrefix = _this$props3.classPrefix,
        appearance = _this$props3.appearance,
        expanded = _this$props3.expanded,
        activeKey = _this$props3.activeKey,
        Component = _this$props3.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props3, ["className", "classPrefix", "appearance", "expanded", "activeKey", "componentClass"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, addPrefix(appearance), className);
    var unhandled = getUnhandledProps(Sidenav, props);
    return React.createElement(SidenavContext.Provider, {
      value: {
        expanded: expanded,
        activeKey: activeKey,
        sidenav: true,
        openKeys: this.getOpenKeys(),
        onOpenChange: this.handleOpenChange,
        onSelect: this.handleSelect
      }
    }, React.createElement(Transition, {
      in: expanded,
      timeout: 300,
      exitedClassName: addPrefix('collapse-out'),
      exitingClassName: addPrefix(['collapse-out', 'collapsing']),
      enteredClassName: addPrefix('collapse-in'),
      enteringClassName: addPrefix(['collapse-in', 'collapsing'])
    }, function (props, ref) {
      var className = props.className,
          rest = _objectWithoutPropertiesLoose(props, ["className"]);

      return React.createElement(Component, _extends({}, rest, unhandled, {
        ref: ref,
        className: classNames(classes, className),
        role: "navigation"
      }));
    }));
  };

  return Sidenav;
}(React.Component);

Sidenav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
  defaultOpenKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onOpenChange: PropTypes.func,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func,
  componentClass: PropTypes.elementType
};
Sidenav.defaultProps = {
  appearance: 'default',
  expanded: true
};
var EnhancedSidenav = defaultProps({
  classPrefix: 'sidenav',
  componentClass: 'div'
})(Sidenav);
setStatic('Header', SidenavHeader)(EnhancedSidenav);
setStatic('Body', SidenavBody)(EnhancedSidenav);
setStatic('Toggle', SidenavToggle)(EnhancedSidenav);
export default EnhancedSidenav;