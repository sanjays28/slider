"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactToString = _interopRequireDefault(require("../utils/reactToString"));

var _domLib = require("dom-lib");

var _constants = require("../constants");

var _utils = require("../utils");

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TreeNode, _React$Component);

  function TreeNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.handleTreeToggle = function (event) {
      var _event$nativeEvent, _event$nativeEvent$st;

      var _this$props = _this.props,
          onTreeToggle = _this$props.onTreeToggle,
          nodeData = _this$props.nodeData; // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click

      event === null || event === void 0 ? void 0 : (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 ? void 0 : (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 ? void 0 : _event$nativeEvent$st.call(_event$nativeEvent);
      onTreeToggle === null || onTreeToggle === void 0 ? void 0 : onTreeToggle(nodeData);
    };

    _this.handleSelect = function (event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          disabled = _this$props2.disabled,
          nodeData = _this$props2.nodeData;

      if (disabled) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        if ((0, _domLib.hasClass)(event.target.parentNode, _this.addPrefix('expand-icon-wrapper'))) {
          return;
        }
      }

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(nodeData, event);
    };

    _this.handleDragStart = function (event) {
      var _this$props3 = _this.props,
          nodeData = _this$props3.nodeData,
          onDragStart = _this$props3.onDragStart;
      var dragNode = document.getElementById('drag-node');

      if (dragNode) {
        event.dataTransfer.setDragImage(dragNode, 0, 0);
      }

      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(nodeData, event);
    };

    _this.handleDragEnter = function (event) {
      var _this$props4 = _this.props,
          nodeData = _this$props4.nodeData,
          onDragEnter = _this$props4.onDragEnter;
      event.preventDefault();
      event.stopPropagation();
      onDragEnter === null || onDragEnter === void 0 ? void 0 : onDragEnter(nodeData, event);
    };

    _this.handleDragOver = function (event) {
      var _this$props5 = _this.props,
          nodeData = _this$props5.nodeData,
          onDragOver = _this$props5.onDragOver;
      event.preventDefault();
      event.stopPropagation();
      onDragOver === null || onDragOver === void 0 ? void 0 : onDragOver(nodeData, event);
    };

    _this.handleDragLeave = function (event) {
      var _this$props6 = _this.props,
          nodeData = _this$props6.nodeData,
          onDragLeave = _this$props6.onDragLeave;
      event.stopPropagation();
      onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave(nodeData, event);
    };

    _this.handleDragEnd = function (event) {
      var _this$props7 = _this.props,
          nodeData = _this$props7.nodeData,
          onDragEnd = _this$props7.onDragEnd;
      event.stopPropagation();
      onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(nodeData, event);
    };

    _this.handleDrop = function (event) {
      var _this$props8 = _this.props,
          nodeData = _this$props8.nodeData,
          onDrop = _this$props8.onDrop;
      event.preventDefault();
      event.stopPropagation();
      onDrop === null || onDrop === void 0 ? void 0 : onDrop(nodeData, event);
    };

    _this.renderIcon = function () {
      var _classNames;

      var _this$props9 = _this.props,
          expand = _this$props9.expand,
          onRenderTreeIcon = _this$props9.onRenderTreeIcon,
          hasChildren = _this$props9.hasChildren,
          nodeData = _this$props9.nodeData;
      var classes = (0, _classnames.default)(_this.addPrefix('expand-icon'), (_classNames = {}, _classNames[_this.addPrefix('expanded')] = !!expand, _classNames));
      var expandIcon = React.createElement("i", {
        className: classes
      });

      if (nodeData !== undefined && typeof onRenderTreeIcon === 'function') {
        var customIcon = onRenderTreeIcon(nodeData);
        expandIcon = customIcon !== null ? React.createElement("div", {
          className: _this.addPrefix('custom-icon')
        }, customIcon) : expandIcon;
      }

      return hasChildren ? React.createElement("div", {
        role: "button",
        tabIndex: -1,
        "data-ref": nodeData.refKey,
        className: _this.addPrefix('expand-icon-wrapper'),
        onClick: _this.handleTreeToggle
      }, expandIcon) : null;
    };

    _this.renderLabel = function () {
      var _classNames2;

      var _this$props10 = _this.props,
          nodeData = _this$props10.nodeData,
          onRenderTreeNode = _this$props10.onRenderTreeNode,
          label = _this$props10.label,
          layer = _this$props10.layer,
          dragging = _this$props10.dragging,
          dragOver = _this$props10.dragOver,
          dragOverTop = _this$props10.dragOverTop,
          dragOverBottom = _this$props10.dragOverBottom;
      var contentClasses = (0, _classnames.default)(_this.addPrefix('label-content'), (_classNames2 = {}, _classNames2[_this.addPrefix('dragging')] = dragging, _classNames2[_this.addPrefix('drag-over')] = dragOver, _classNames2[_this.addPrefix('drag-over-top')] = dragOverTop, _classNames2[_this.addPrefix('drag-over-bottom')] = dragOverBottom, _classNames2));
      return React.createElement("span", {
        className: _this.addPrefix('label'),
        title: _this.getTitle(),
        "data-layer": layer,
        "data-key": (nodeData === null || nodeData === void 0 ? void 0 : nodeData.refKey) || '',
        role: "button",
        tabIndex: -1,
        onClick: _this.handleSelect
      }, React.createElement("span", {
        className: contentClasses
      }, onRenderTreeNode ? onRenderTreeNode(nodeData) : label));
    };

    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.getTitle = function getTitle() {
    var label = this.props.label;

    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      var nodes = (0, _reactToString.default)(label);
      return nodes.join('');
    }
  };

  _proto.render = function render() {
    var _classNames3, _extends2;

    var _this$props11 = this.props,
        rtl = _this$props11.rtl,
        style = _this$props11.style,
        className = _this$props11.className,
        classPrefix = _this$props11.classPrefix,
        active = _this$props11.active,
        layer = _this$props11.layer,
        disabled = _this$props11.disabled,
        visible = _this$props11.visible,
        innerRef = _this$props11.innerRef,
        draggable = _this$props11.draggable;
    var classes = (0, _classnames.default)(className, classPrefix, (_classNames3 = {
      'text-muted': disabled
    }, _classNames3[this.addPrefix('disabled')] = disabled, _classNames3[this.addPrefix('active')] = active, _classNames3));
    var padding = layer * _constants.TREE_NODE_PADDING + _constants.TREE_NODE_ROOT_PADDING;
    var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2[rtl ? 'paddingRight' : 'paddingLeft'] = padding, _extends2));
    return visible ? React.createElement("div", {
      style: styles,
      className: classes,
      ref: innerRef,
      draggable: draggable,
      onDragStart: this.handleDragStart,
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop
    }, this.renderIcon(), this.renderLabel()) : null;
  };

  return TreeNode;
}(React.Component);

TreeNode.propTypes = {
  layer: _propTypes.default.number,
  value: _propTypes.default.any,
  label: _propTypes.default.any,
  expand: _propTypes.default.bool,
  active: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  nodeData: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  dragOver: _propTypes.default.bool,
  hasChildren: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  style: _propTypes.default.object,
  innerRef: _utils.refType,
  onTreeToggle: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onRenderTreeIcon: _propTypes.default.func,
  onRenderTreeNode: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragEnter: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDrop: _propTypes.default.func
};
TreeNode.defaultProps = {
  visible: true
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'tree-node'
})(TreeNode);

exports.default = _default;
module.exports = exports.default;