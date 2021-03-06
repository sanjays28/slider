import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _pick from "lodash/pick";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import BaseModal from './BaseModal';
import Bounce from '../Animation/Bounce';
import { on, getHeight } from 'dom-lib';
import { prefix, defaultProps, createChainedFunction } from '../utils';
import ModalDialog, { modalDialogPropTypes } from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { SIZE } from '../constants';
import ModalContext from './ModalContext';
import mergeRefs from '../utils/mergeRefs';
var BACKDROP_TRANSITION_DURATION = 150;

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  // for test
  function Modal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.dialogElement = void 0;
    _this.modalRef = void 0;
    _this.windowResizeListener = null;
    _this.contentElement = null;

    _this.getBodyStyles = function () {
      return _this.state.bodyStyles;
    };

    _this.bindDialogRef = function (ref) {
      _this.dialogElement = ref;
    };

    _this.handleShow = function () {
      var dialogElement = _this.dialogElement;

      _this.updateModalStyles(dialogElement);

      _this.contentElement = dialogElement.querySelector("." + _this.addPrefix('content'));
      _this.windowResizeListener = on(window, 'resize', _this.handleResize);
      bindElementResize(_this.contentElement, _this.handleResize);
    };

    _this.handleShowing = function () {
      _this.updateModalStyles(_this.dialogElement);
    };

    _this.handleHide = function () {
      _this.destroyEvent();
    };

    _this.handleDialogClick = function (event) {
      var _this$props, _this$props$onHide;

      if (event.target !== event.currentTarget) {
        return;
      }

      (_this$props = _this.props) === null || _this$props === void 0 ? void 0 : (_this$props$onHide = _this$props.onHide) === null || _this$props$onHide === void 0 ? void 0 : _this$props$onHide.call(_this$props, event);
    };

    _this.handleResize = function () {
      _this.updateModalStyles(_this.dialogElement);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.state = {
      bodyStyles: {}
    };
    _this.modalRef = React.createRef();
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.destroyEvent();
  };

  _proto.getBodyStylesByDialog = function getBodyStylesByDialog(dialogElement) {
    var _this$props2 = this.props,
        overflow = _this$props2.overflow,
        drawer = _this$props2.drawer;
    var node = dialogElement || this.dialogElement;
    var scrollHeight = node ? node.scrollHeight : 0;

    if (!overflow) {
      return {};
    }

    var bodyStyles = {
      overflow: 'auto'
    };

    if (node) {
      // default margin
      var headerHeight = 46;
      var footerHeight = 46;
      var contentHeight = 30;
      var headerDOM = node.querySelector("." + this.addPrefix('header'));
      var footerDOM = node.querySelector("." + this.addPrefix('footer'));
      var contentDOM = node.querySelector("." + this.addPrefix('content'));
      headerHeight = headerDOM ? getHeight(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? getHeight(footerDOM) + headerHeight : headerHeight;
      contentHeight = contentDOM ? getHeight(contentDOM) + contentHeight : contentHeight;

      if (drawer) {
        bodyStyles.height = contentHeight - (headerHeight + footerHeight);
      } else {
        /**
         * Header height + Footer height + Dialog margin
         */
        var excludeHeight = headerHeight + footerHeight + 60;
        var bodyHeight = getHeight(window) - excludeHeight;
        var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    return bodyStyles;
  };

  _proto.destroyEvent = function destroyEvent() {
    var _this$windowResizeLis, _this$windowResizeLis2;

    (_this$windowResizeLis = this.windowResizeListener) === null || _this$windowResizeLis === void 0 ? void 0 : (_this$windowResizeLis2 = _this$windowResizeLis.off) === null || _this$windowResizeLis2 === void 0 ? void 0 : _this$windowResizeLis2.call(_this$windowResizeLis);

    if (this.contentElement) {
      unbindElementResize(this.contentElement);
    }
  };

  _proto.updateModalStyles = function updateModalStyles(dialogElement) {
    this.setState({
      bodyStyles: this.getBodyStylesByDialog(dialogElement)
    });
  };

  _proto.render = function render() {
    var _classNames,
        _classNames2,
        _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        children = _this$props3.children,
        dialogClassName = _this$props3.dialogClassName,
        backdropClassName = _this$props3.backdropClassName,
        dialogStyle = _this$props3.dialogStyle,
        animation = _this$props3.animation,
        classPrefix = _this$props3.classPrefix,
        show = _this$props3.show,
        size = _this$props3.size,
        full = _this$props3.full,
        dialogComponentClass = _this$props3.dialogComponentClass,
        animationProps = _this$props3.animationProps,
        animationTimeout = _this$props3.animationTimeout,
        onHide = _this$props3.onHide,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["className", "children", "dialogClassName", "backdropClassName", "dialogStyle", "animation", "classPrefix", "show", "size", "full", "dialogComponentClass", "animationProps", "animationTimeout", "onHide"]);

    var inClass = {
      in: show && !animation
    };
    var Dialog = dialogComponentClass;
    var classes = classNames(this.addPrefix(size), className, (_classNames = {}, _classNames[this.addPrefix('full')] = full, _classNames));
    return React.createElement(ModalContext.Provider, {
      value: {
        onModalHide: onHide,
        getBodyStyles: this.getBodyStyles
      }
    }, React.createElement(BaseModal, _extends({}, rest, {
      ref: this.modalRef,
      show: show,
      onHide: onHide,
      className: this.addPrefix('wrapper'),
      onEntered: createChainedFunction(this.handleShow, this.props.onEntered),
      onEntering: createChainedFunction(this.handleShowing, this.props.onEntering),
      onExited: createChainedFunction(this.handleHide, this.props.onExited),
      backdropClassName: classNames(this.addPrefix('backdrop'), backdropClassName, inClass),
      containerClassName: classNames(this.addPrefix('open'), (_classNames2 = {}, _classNames2[this.addPrefix('has-backdrop')] = rest.backdrop, _classNames2)),
      transition: animation ? animation : undefined,
      animationProps: animationProps,
      dialogTransitionTimeout: animationTimeout,
      backdropTransitionTimeout: BACKDROP_TRANSITION_DURATION
    }), function (transitionProps, ref) {
      var transitionClassName = transitionProps.className,
          transitionRest = _objectWithoutPropertiesLoose(transitionProps, ["className"]);

      return React.createElement(Dialog, _extends({}, transitionRest, _pick(rest, Object.keys(modalDialogPropTypes)), {
        classPrefix: classPrefix,
        className: classNames(classes, transitionClassName),
        dialogClassName: dialogClassName,
        dialogStyle: dialogStyle,
        onClick: rest.backdrop === true ? _this2.handleDialogClick : null,
        dialogRef: mergeRefs(_this2.bindDialogRef, ref)
      }), children);
    }));
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  classPrefix: PropTypes.string,
  size: PropTypes.oneOf(SIZE),
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onRendered: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  dialogClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  backdropStyle: PropTypes.object,
  show: PropTypes.bool,
  full: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboard: PropTypes.bool,
  transition: PropTypes.elementType,
  dialogTransitionTimeout: PropTypes.number,
  backdropTransitionTimeout: PropTypes.number,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  overflow: PropTypes.bool,
  drawer: PropTypes.bool,
  dialogComponentClass: PropTypes.elementType,
  animation: PropTypes.any,
  animationProps: PropTypes.object,
  animationTimeout: PropTypes.number,
  onEscapeKeyUp: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};
Modal.defaultProps = {
  size: 'sm',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  animation: Bounce,
  animationTimeout: 300,
  dialogComponentClass: ModalDialog,
  overflow: true
};
var EnhancedModal = defaultProps({
  classPrefix: 'modal'
})(Modal);
setStatic('Body', ModalBody)(EnhancedModal);
setStatic('Header', ModalHeader)(EnhancedModal);
setStatic('Title', ModalTitle)(EnhancedModal);
setStatic('Footer', ModalFooter)(EnhancedModal);
setStatic('Dialog', ModalDialog)(EnhancedModal);
export default EnhancedModal;