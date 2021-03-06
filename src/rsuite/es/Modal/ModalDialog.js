import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withStyleProps, defaultProps, prefix, refType } from '../utils';
import mergeRefs from '../utils/mergeRefs';
export var modalDialogPropTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  children: PropTypes.node,
  dialogRef: refType
};

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalDialog, _React$Component);

  function ModalDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.htmlElement = null;

    _this.bindHtmlRef = function (ref) {
      _this.htmlElement = ref;
    };

    return _this;
  }

  var _proto = ModalDialog.prototype;

  _proto.getHTMLElement = function getHTMLElement() {
    return this.htmlElement;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        children = _this$props.children,
        dialogClassName = _this$props.dialogClassName,
        dialogStyle = _this$props.dialogStyle,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        dialogRef = _this$props.dialogRef,
        props = _objectWithoutPropertiesLoose(_this$props, ["style", "children", "dialogClassName", "dialogStyle", "classPrefix", "className", "dialogRef"]);

    var modalStyle = _extends({
      display: 'block'
    }, style);

    var addPrefix = prefix(classPrefix);
    var dialogClasses = classNames(addPrefix('dialog'), dialogClassName);
    return React.createElement("div", _extends({}, props, {
      title: null,
      role: "dialog",
      ref: mergeRefs(this.bindHtmlRef, dialogRef),
      className: classNames(classPrefix, className),
      style: modalStyle
    }), React.createElement("div", {
      className: dialogClasses,
      style: dialogStyle
    }, React.createElement("div", {
      className: addPrefix('content')
    }, children)));
  };

  return ModalDialog;
}(React.Component);

ModalDialog.propTypes = modalDialogPropTypes;
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'modal'
}))(ModalDialog);