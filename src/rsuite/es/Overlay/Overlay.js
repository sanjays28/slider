import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseOverlay from './BaseOverlay';
import Fade from '../Animation/Fade';
import refType from '../utils/refType';

var Overlay = function Overlay(_ref) {
  var _ref$animation = _ref.animation,
      animation = _ref$animation === void 0 ? true : _ref$animation,
      children = _ref.children,
      _ref$transition = _ref.transition,
      transition = _ref$transition === void 0 ? Fade : _ref$transition,
      rest = _objectWithoutPropertiesLoose(_ref, ["animation", "children", "transition"]);

  var child = children;

  if (!animation) {
    transition = undefined;
  }

  if (!transition) {
    child = React.Children.only(child);
    child = React.cloneElement(child, {
      className: classNames('in', child.props.className)
    });
  }

  return React.createElement(BaseOverlay, _extends({}, rest, {
    transition: transition
  }), child);
};

Overlay.propTypes = {
  animation: PropTypes.bool,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onRendered: PropTypes.func,
  className: PropTypes.string,
  containerPadding: PropTypes.number,
  placement: PropTypes.string,
  shouldUpdatePosition: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  show: PropTypes.bool,
  rootClose: PropTypes.bool,
  transition: PropTypes.elementType,
  positionRef: refType,
  target: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};
export default Overlay;