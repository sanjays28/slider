import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _isNil from "lodash/isNil";
import _isFunction from "lodash/isFunction";
import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";
import _omit from "lodash/omit";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import _isArray from "lodash/isArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';
import shallowEqual from '../utils/shallowEqual';
import TreeNode from './TreeNode';
import { defaultProps, prefix, defaultClassPrefix, getUnhandledProps, createChainedFunction, mergeRefs } from '../utils';
import { flattenTree, getExpandWhenSearching, getNodeParents, shouldShowNodeByExpanded, getVirtualLisHeight, treeDeprecatedWarning, hasVisibleChildren, compareArray, getExpandAll, getExpandItemValues, getExpandState, getDragNodeKeys, calDropNodePosition, createUpdateTreeDataFunction } from '../utils/treeUtils';
import { PickerToggle, getToggleWrapperClassName, onMenuKeyDown, MenuWrapper, SearchBar, PickerToggleTrigger, createConcatChildrenFunction, shouldDisplay } from '../Picker';
import { TREE_NODE_DROP_POSITION } from '../constants';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes'; // default value for virtualized

var defaultHeight = 360;
var defaultWidth = 200;

var TreePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TreePicker, _React$Component);

  function TreePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuRef = void 0;
    _this.treeViewRef = void 0;
    _this.positionRef = void 0;
    _this.listRef = void 0;
    _this.triggerRef = void 0;
    _this.toggleRef = void 0;

    _this.getFocusableMenuItems = function () {
      var filterData = _this.state.filterData;
      var _this$props = _this.props,
          childrenKey = _this$props.childrenKey,
          _this$props$disabledI = _this$props.disabledItemValues,
          disabledItemValues = _this$props$disabledI === void 0 ? [] : _this$props$disabledI,
          valueKey = _this$props.valueKey;
      var items = [];

      var loop = function loop(nodes) {
        nodes.forEach(function (node) {
          var nodeData = _extends({}, node, {}, _this.nodes[node.refKey]);

          var disabled = disabledItemValues.some(function (disabledItem) {
            return shallowEqual(disabledItem, node[valueKey]);
          });

          if (!disabled) {
            items.push(node);
          }

          if (node[childrenKey] && getExpandState(nodeData, _this.props)) {
            loop(node[childrenKey]);
          }
        });
      };

      loop(filterData);
      return items;
    };

    _this.getElementByDataKey = function (dataKey) {
      var ele = _this.nodeRefs[dataKey];

      if (ele instanceof Element) {
        return ele.querySelector("." + _this.addTreePrefix('node-label'));
      }

      return null;
    };

    _this.nodes = {};
    _this.node = null;
    _this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 20
    });
    _this.nodeRefs = {};
    _this.dragNode = null;

    _this.bindNodeRefs = function (refKey, ref) {
      _this.nodeRefs[refKey] = ref;
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.addTreePrefix = function (name) {
      return prefix(defaultClassPrefix('tree'))(name);
    };

    _this.selectActiveItem = function (event) {
      var _this$getActiveItem = _this.getActiveItem(),
          nodeData = _this$getActiveItem.nodeData;

      _this.handleSelect(nodeData, event);
    };

    _this.focusNextItem = function () {
      var _node$focus;

      var _this$getItemsAndActi = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi.items,
          activeIndex = _this$getItemsAndActi.activeIndex;

      if (items.length === 0) {
        return;
      }

      var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

      var node = _this.getElementByDataKey(items[nextIndex].refKey);

      node === null || node === void 0 ? void 0 : (_node$focus = node.focus) === null || _node$focus === void 0 ? void 0 : _node$focus.call(node);
    };

    _this.focusPreviousItem = function () {
      var _node$focus2;

      var _this$getItemsAndActi2 = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi2.items,
          activeIndex = _this$getItemsAndActi2.activeIndex;

      if (items.length === 0) {
        return;
      }

      var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      prevIndex = prevIndex >= 0 ? prevIndex : 0;

      var node = _this.getElementByDataKey(items[prevIndex].refKey);

      node === null || node === void 0 ? void 0 : (_node$focus2 = node.focus) === null || _node$focus2 === void 0 ? void 0 : _node$focus2.call(node);
    };

    _this.handleCloseDropdown = function () {
      var _this$triggerRef$curr, _this$triggerRef$curr2;

      (_this$triggerRef$curr = _this.triggerRef.current) === null || _this$triggerRef$curr === void 0 ? void 0 : (_this$triggerRef$curr2 = _this$triggerRef$curr.hide) === null || _this$triggerRef$curr2 === void 0 ? void 0 : _this$triggerRef$curr2.call(_this$triggerRef$curr);
    };

    _this.handleOpenDropdown = function () {
      var _this$triggerRef$curr3, _this$triggerRef$curr4;

      (_this$triggerRef$curr3 = _this.triggerRef.current) === null || _this$triggerRef$curr3 === void 0 ? void 0 : (_this$triggerRef$curr4 = _this$triggerRef$curr3.show) === null || _this$triggerRef$curr4 === void 0 ? void 0 : _this$triggerRef$curr4.call(_this$triggerRef$curr3);
    };

    _this.open = function () {
      var _this$handleOpenDropd, _this2;

      (_this$handleOpenDropd = (_this2 = _this).handleOpenDropdown) === null || _this$handleOpenDropd === void 0 ? void 0 : _this$handleOpenDropd.call(_this2);
    };

    _this.close = function () {
      var _this$handleCloseDrop, _this3;

      (_this$handleCloseDrop = (_this3 = _this).handleCloseDropdown) === null || _this$handleCloseDrop === void 0 ? void 0 : _this$handleCloseDrop.call(_this3);
    };

    _this.handleToggleDropdown = function () {
      var active = _this.state.active;

      if (active) {
        _this.handleCloseDropdown();

        return;
      }

      _this.handleOpenDropdown();
    };

    _this.handleToggle = function (nodeData) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          childrenKey = _this$props2.childrenKey,
          onExpand = _this$props2.onExpand,
          expandItemValues = _this$props2.expandItemValues;

      var nextExpandItemValues = _this.toggleExpand(nodeData, !nodeData.expand);

      if (_isUndefined(expandItemValues)) {
        _this.unserializeLists('expand', nextExpandItemValues);

        _this.setState({
          expandItemValues: nextExpandItemValues
        });
      }

      onExpand === null || onExpand === void 0 ? void 0 : onExpand(nextExpandItemValues, nodeData, createConcatChildrenFunction(nodeData, nodeData[valueKey], {
        valueKey: valueKey,
        childrenKey: childrenKey
      }));
    };

    _this.handleSelect = function (nodeData, event) {
      var _this$toggleRef$curre;

      var _this$props3 = _this.props,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange,
          onSelect = _this$props3.onSelect,
          value = _this$props3.value;
      _this.node = nodeData;

      if (_isUndefined(value)) {
        _this.setState({
          activeNode: nodeData,
          selectedValue: nodeData[valueKey]
        });
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(nodeData[valueKey], event);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(nodeData, nodeData[valueKey], event);

      _this.handleCloseDropdown();

      (_this$toggleRef$curre = _this.toggleRef.current) === null || _this$toggleRef$curre === void 0 ? void 0 : _this$toggleRef$curre.onFocus();
    };

    _this.handleKeyDown = function (event) {
      onMenuKeyDown(event, {
        down: _this.focusNextItem,
        up: _this.focusPreviousItem,
        enter: _this.selectActiveItem,
        del: _this.handleClean
      });
    };

    _this.handleToggleKeyDown = function (event) {
      var _this$state = _this.state,
          activeNode = _this$state.activeNode,
          active = _this$state.active; // enter

      if ((!activeNode || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8) {
        _this.handleClean(event);
      }

      if (!_this.treeViewRef.current) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        var className = event.target.className;

        if (className.includes(_this.addPrefix('toggle')) || className.includes(_this.addPrefix('toggle-custom')) || className.includes(_this.addPrefix('search-bar-input'))) {
          onMenuKeyDown(event, {
            down: _this.focusNextItem
          });
        }
      }
    };

    _this.handleSearch = function (value, event) {
      var filterData = _this.state.filterData;
      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          searchKeyword = _this$props4.searchKeyword;

      if (_isUndefined(searchKeyword)) {
        _this.setState({
          searchKeyword: value,
          filterData: _this.getFilterData(filterData, value)
        });
      }

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
    };

    _this.handleClean = function (event) {
      var _this$props$onChange, _this$props5;

      _this.setState({
        activeNode: null,
        selectedValue: null
      });

      _this.node = null;
      (_this$props$onChange = (_this$props5 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props5, null, event);
    };

    _this.handleOnOpen = function () {
      var _this$props$onOpen, _this$props6;

      var activeNode = _this.state.activeNode;

      if (activeNode) {
        var _node$focus3;

        var node = _this.getElementByDataKey(activeNode.refKey);

        node === null || node === void 0 ? void 0 : (_node$focus3 = node.focus) === null || _node$focus3 === void 0 ? void 0 : _node$focus3.call(node);
      }

      (_this$props$onOpen = (_this$props6 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props6);

      _this.setState({
        active: true
      });
    };

    _this.handleOnClose = function () {
      var filterData = _this.state.filterData;
      var _this$props7 = _this.props,
          searchKeyword = _this$props7.searchKeyword,
          onClose = _this$props7.onClose;

      if (_isUndefined(searchKeyword)) {
        _this.setState({
          searchKeyword: '',
          filterData: _this.getFilterData(filterData, '')
        });
      }

      onClose === null || onClose === void 0 ? void 0 : onClose();

      _this.setState({
        active: false
      });
    };

    _this.handleDragStart = function (nodeData, event) {
      var _this$props8 = _this.props,
          valueKey = _this$props8.valueKey,
          childrenKey = _this$props8.childrenKey,
          onDragStart = _this$props8.onDragStart,
          draggable = _this$props8.draggable;

      if (draggable) {
        _this.setState({
          dragging: true,
          dragNodeKeys: getDragNodeKeys(nodeData, childrenKey, valueKey)
        });

        _this.dragNode = _this.nodes[nodeData.refKey];
        onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(nodeData, event);
      }
    };

    _this.handleDragEnter = function (nodeData, event) {
      var _this$state2 = _this.state,
          dragging = _this$state2.dragging,
          dragNodeKeys = _this$state2.dragNodeKeys;
      var _this$props9 = _this.props,
          valueKey = _this$props9.valueKey,
          onDragEnter = _this$props9.onDragEnter;

      if (dragNodeKeys.some(function (d) {
        return shallowEqual(d, nodeData[valueKey]);
      })) {
        return;
      }

      if (dragging && _this.dragNode) {
        var dropNodePosition = calDropNodePosition(event, _this.nodeRefs[nodeData.refKey]);

        _this.setState({
          dragOverNodeKey: nodeData[valueKey],
          dropNodePosition: dropNodePosition
        });
      }

      onDragEnter === null || onDragEnter === void 0 ? void 0 : onDragEnter(nodeData, event);
    };

    _this.handleDragOver = function (nodeData, event) {
      var _this$state3 = _this.state,
          dragNodeKeys = _this$state3.dragNodeKeys,
          dragOverNodeKey = _this$state3.dragOverNodeKey,
          dropNodePosition = _this$state3.dropNodePosition;
      var _this$props10 = _this.props,
          valueKey = _this$props10.valueKey,
          onDragOver = _this$props10.onDragOver;

      if (dragNodeKeys.some(function (d) {
        return shallowEqual(d, nodeData[valueKey]);
      })) {
        return;
      }

      if (_this.dragNode && shallowEqual(nodeData[valueKey], dragOverNodeKey)) {
        var lastDropNodePosition = calDropNodePosition(event, _this.nodeRefs[nodeData.refKey]);
        if (lastDropNodePosition === dropNodePosition) return;

        _this.setState({
          dropNodePosition: lastDropNodePosition
        });
      }

      onDragOver === null || onDragOver === void 0 ? void 0 : onDragOver(nodeData, event);
    };

    _this.handleDragLeave = function (nodeData, event) {
      var onDragLeave = _this.props.onDragLeave;
      onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave(nodeData, event);
    };

    _this.handleDragEnd = function (nodeData, event) {
      var onDragEnd = _this.props.onDragEnd;

      _this.setState({
        dragging: false,
        dragNodeKeys: [],
        dragOverNodeKey: null
      });

      onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(nodeData, event);
    };

    _this.handleDrop = function (nodeData, event) {
      var dragNodeKeys = _this.state.dragNodeKeys;
      var _this$props11 = _this.props,
          valueKey = _this$props11.valueKey,
          onDrop = _this$props11.onDrop;

      if (dragNodeKeys.some(function (d) {
        return shallowEqual(d, nodeData[valueKey]);
      })) {
        console.error('Cannot drag a node to itself and its children');
      } else {
        var dropData = _this.getDropData(nodeData);

        onDrop === null || onDrop === void 0 ? void 0 : onDrop(dropData, event);
      }

      _this.setState({
        dragging: false,
        dragNodeKeys: [],
        dragOverNodeKey: null,
        dropNodePosition: null
      });

      _this.dragNode = null;
    };

    _this.measureRowRenderer = function (nodes) {
      return function (_ref) {
        var key = _ref.key,
            index = _ref.index,
            style = _ref.style,
            parent = _ref.parent;
        var node = nodes[index];
        return React.createElement(CellMeasurer, {
          cache: _this.cache,
          columnIndex: 0,
          key: key,
          rowIndex: index,
          parent: parent
        }, function () {
          return _this.renderVirtualNode(node, {
            key: key,
            style: style
          });
        });
      };
    };

    var _value = props.value,
        data = props.data,
        _valueKey = props.valueKey,
        _props$searchKeyword = props.searchKeyword,
        _searchKeyword = _props$searchKeyword === void 0 ? '' : _props$searchKeyword;

    var nextData = [].concat(data);

    var _nextExpandItemValues = getExpandItemValues(props);

    _this.flattenNodes(nextData);

    _this.unserializeLists('expand', _nextExpandItemValues, props);

    _this.state = {
      data: data,
      value: _value,
      dragging: false,
      selectedValue: _this.getValue(props),
      expandAll: getExpandAll(props),
      filterData: _this.getFilterData(nextData, _searchKeyword, props),
      activeNode: _this.getActiveNode(_this.getValue(props), _valueKey),
      searchKeyword: _searchKeyword,
      expandItemValues: _this.serializeList('expand'),
      dragNodeKeys: [],
      dragOverNodeKey: null,
      dropNodePosition: null
    };
    _this.treeViewRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.listRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.toggleRef = React.createRef(); // for test

    _this.menuRef = React.createRef();
    treeDeprecatedWarning(props, ['expandAll']);
    return _this;
  }

  var _proto = TreePicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var activeNode = this.state.activeNode;
    this.focusNode(activeNode);
  };

  TreePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        expandAll = nextProps.expandAll,
        searchKeyword = nextProps.searchKeyword,
        expandItemValues = nextProps.expandItemValues;
    var nextState = {};

    if (_isArray(data) && _isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (!shallowEqual(value, prevState.value)) {
      nextState.value = value;
      nextState.selectedValue = value;
    }

    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if (!_isUndefined(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  };

  _proto.updateDataChange = function updateDataChange(prevState) {
    var _this$state4 = this.state,
        searchKeyword = _this$state4.searchKeyword,
        expandItemValues = _this$state4.expandItemValues;
    var data = this.props.data;

    if (prevState.data !== data) {
      var nextData = [].concat(data);
      this.flattenNodes(nextData);
      var filterData = this.getFilterData(nextData, searchKeyword);
      var activeNode = this.getActiveNode(this.getValue());
      this.focusNode(activeNode);
      this.unserializeLists('expand', expandItemValues);
      var newState = {};

      if (activeNode) {
        newState = {
          activeNode: activeNode
        };
      }

      this.setState(_extends({}, {
        data: nextData,
        filterData: filterData,
        expandItemValues: this.serializeList('expand')
      }, {}, newState));
    }
  };

  _proto.updateValueChange = function updateValueChange(prevState) {
    var _this$props12 = this.props,
        value = _this$props12.value,
        valueKey = _this$props12.valueKey;

    if (!shallowEqual(prevState.value, value)) {
      var activeNode = null;

      if (this.node === null) {
        activeNode = this.getActiveNode(value);
      }

      if (value !== null && this.node !== null) {
        activeNode = shallowEqual(this.node[valueKey], value) ? this.node : this.getActiveNode(value);
      }

      var nextState = {
        value: value,
        activeNode: activeNode
      };

      if (value === null) {
        nextState.activeNode = null;
        this.node = null;
      }

      if (activeNode !== null) {
        this.focusNode(activeNode);
      }

      this.setState(nextState);
    }
  };

  _proto.updateExpandItemValuesChange = function updateExpandItemValuesChange(prevState) {
    var expandItemValues = this.props.expandItemValues;

    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      this.unserializeLists('expand', expandItemValues);
      this.setState({
        expandItemValues: expandItemValues
      });
    }
  };

  _proto.updateSearchKeywordChange = function updateSearchKeywordChange(prevState) {
    var filterData = this.state.filterData;

    if (!_isUndefined(this.props.searchKeyword) && prevState.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(filterData, this.props.searchKeyword)
      });
    }
  };

  _proto.getValue = function getValue(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        value = _props.value,
        defaultValue = _props.defaultValue;
    return !_isUndefined(value) ? value : defaultValue;
  };

  _proto.getActiveNode = function getActiveNode(value, valueKey) {
    var _this4 = this;

    if (valueKey === void 0) {
      valueKey = this.props.valueKey;
    }

    var activeNode = null;

    if (!_isUndefined(value)) {
      Object.keys(this.nodes).forEach(function (refKey) {
        if (shallowEqual(_this4.nodes[refKey][valueKey], value)) {
          activeNode = _this4.nodes[refKey];
        }
      });
    }

    return activeNode;
  };

  _proto.getActiveElementOption = function getActiveElementOption(options, value) {
    var childrenKey = this.props.childrenKey;

    for (var i = 0; i < options.length; i += 1) {
      var _options$i$childrenKe;

      if (options[i].value === value) {
        return options[i];
      } else if ((_options$i$childrenKe = options[i][childrenKey]) === null || _options$i$childrenKe === void 0 ? void 0 : _options$i$childrenKe.length) {
        var active = this.getActiveElementOption(options[i][childrenKey], value);

        if (!_isEmpty(active)) {
          return active;
        }
      }
    }

    return {};
  };

  _proto.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeIndex = -1;
    items.forEach(function (item, index) {
      if (document.activeElement !== null) {
        if (item.refKey === document.activeElement.getAttribute('data-key')) {
          activeIndex = index;
        }
      }
    });
    return {
      items: items,
      activeIndex: activeIndex
    };
  };

  _proto.getActiveItem = function getActiveItem() {
    var nodeData = {};
    var activeItem = document.activeElement;

    if (activeItem !== null) {
      var _get2 = _get(activeItem, 'dataset'),
          key = _get2.key,
          layer = _get2.layer;

      var activeNode = this.nodes[key];

      if (activeNode) {
        nodeData = activeNode;
      }

      return {
        nodeData: nodeData,
        layer: layer
      };
    }

    return {};
  };

  _proto.getFilterData = function getFilterData(data, word, props) {
    if (word === void 0) {
      word = '';
    }

    var _ref2 = props || this.props,
        labelKey = _ref2.labelKey,
        childrenKey = _ref2.childrenKey,
        searchBy = _ref2.searchBy;

    var setVisible = function setVisible(nodes) {
      if (nodes === void 0) {
        nodes = [];
      }

      return nodes.forEach(function (item) {
        item.visible = searchBy ? searchBy(word, item[labelKey], item) : shouldDisplay(item[labelKey], word);

        if (_isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach(function (child) {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });
    };

    if (!_isUndefined(word)) {
      setVisible(data);
    }

    return data;
  };

  _proto.getFlattenTreeData = function getFlattenTreeData(nodes) {
    var _this5 = this;

    var expandItemValues = this.state.expandItemValues;
    var _this$props13 = this.props,
        childrenKey = _this$props13.childrenKey,
        valueKey = _this$props13.valueKey;
    return flattenTree(nodes, childrenKey, function (node) {
      var formatted = {};
      var curNode = _this5.nodes[node.refKey];
      var parentKeys = getNodeParents(curNode, 'parentNode', valueKey);

      if (curNode) {
        formatted = _extends({}, node, {
          expand: curNode.expand,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: shouldShowNodeByExpanded(expandItemValues, parentKeys)
        });
      }

      return formatted;
    });
  };

  _proto.getTreeNodeProps = function getTreeNodeProps(node, layer, index) {
    var _this$state5 = this.state,
        dragOverNodeKey = _this$state5.dragOverNodeKey,
        selectedValue = _this$state5.selectedValue,
        dropNodePosition = _this$state5.dropNodePosition;
    var dragNode = this.dragNode || {};
    var _this$props14 = this.props,
        locale = _this$props14.locale,
        valueKey = _this$props14.valueKey,
        labelKey = _this$props14.labelKey,
        draggable = _this$props14.draggable,
        childrenKey = _this$props14.childrenKey,
        _this$props14$disable = _this$props14.disabledItemValues,
        disabledItemValues = _this$props14$disable === void 0 ? [] : _this$props14$disable,
        renderTreeNode = _this$props14.renderTreeNode,
        renderTreeIcon = _this$props14.renderTreeIcon;
    return {
      rtl: locale.rtl,
      value: node[valueKey],
      label: node[labelKey],
      index: index,
      layer: layer,
      expand: node.expand,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      draggable: draggable,
      dragging: shallowEqual(node[valueKey], dragNode[valueKey]),
      children: node[childrenKey],
      nodeData: node,
      disabled: disabledItemValues.some(function (disabledItem) {
        return shallowEqual(disabledItem, node[valueKey]);
      }),
      dragOver: shallowEqual(node[valueKey], dragOverNodeKey) && dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER,
      dragOverTop: shallowEqual(node[valueKey], dragOverNodeKey) && dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      dragOverBottom: shallowEqual(node[valueKey], dragOverNodeKey) && dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM,
      onSelect: this.handleSelect,
      onDragStart: this.handleDragStart,
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
  }
  /**
   * 获取 onDrop 的回调数据
   */
  ;

  _proto.getDropData = function getDropData(nodeData) {
    var dropNodePosition = this.state.dropNodePosition;
    var _this$props15 = this.props,
        valueKey = _this$props15.valueKey,
        childrenKey = _this$props15.childrenKey;
    var options = {
      valueKey: valueKey,
      childrenKey: childrenKey
    };

    var dragNode = _omit(this.dragNode, 'parentNode');

    return {
      /** 拖拽节点 */
      dragNode: dragNode,

      /** 释放所在节点的父节点 */
      dropNode: nodeData,

      /** 拖拽节点的类型 */
      dropNodePosition: dropNodePosition,
      createUpdateDataFunction: createUpdateTreeDataFunction({
        /** 拖拽节点 */
        dragNode: dragNode,

        /** 释放所在节点的父节点 */
        dropNode: nodeData,

        /** 拖拽节点的类型 */
        dropNodePosition: dropNodePosition
      }, options)
    };
  };

  _proto.focusNode = function focusNode(activeNode) {
    var inline = this.props.inline;

    if (activeNode && inline) {
      var _node$focus4;

      var node = this.getElementByDataKey(activeNode.refKey);
      node === null || node === void 0 ? void 0 : (_node$focus4 = node.focus) === null || _node$focus4 === void 0 ? void 0 : _node$focus4.call(node);
    }
  };

  _proto.flattenNodes = function flattenNodes(nodes, props, ref, parentNode, layer) {
    var _this6 = this;

    if (ref === void 0) {
      ref = '0';
    }

    if (layer === void 0) {
      layer = 0;
    }

    var _ref3 = props || this.props,
        labelKey = _ref3.labelKey,
        valueKey = _ref3.valueKey,
        childrenKey = _ref3.childrenKey;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [];
    }

    nodes.map(function (node, index) {
      var _extends2;

      var refKey = ref + "-" + index;
      node.refKey = refKey;
      _this6.nodes[refKey] = _extends((_extends2 = {
        layer: layer
      }, _extends2[labelKey] = node[labelKey], _extends2[valueKey] = node[valueKey], _extends2.expand = getExpandState(node, props || _this6.props), _extends2.refKey = refKey, _extends2), node);

      if (parentNode) {
        _this6.nodes[refKey].parentNode = parentNode;
      }

      _this6.flattenNodes(node[childrenKey], props, refKey, _this6.nodes[refKey], layer + 1);
    });
  };

  _proto.serializeList = function serializeList(key, nodes) {
    if (nodes === void 0) {
      nodes = this.nodes;
    }

    var valueKey = this.props.valueKey;
    var list = [];
    Object.keys(nodes).forEach(function (refKey) {
      if (nodes[refKey][key]) {
        list.push(nodes[refKey][valueKey]);
      }
    });
    return list;
  };

  _proto.unserializeLists = function unserializeLists(key, value, props) {
    var _this7 = this;

    if (value === void 0) {
      value = [];
    }

    if (props === void 0) {
      props = this.props;
    }

    var _props2 = props,
        valueKey = _props2.valueKey;
    var expandAll = getExpandAll(props);
    Object.keys(this.nodes).forEach(function (refKey) {
      _this7.nodes[refKey][key] = false;

      if (value.length) {
        value.forEach(function (value) {
          if (shallowEqual(_this7.nodes[refKey][valueKey], value)) {
            _this7.nodes[refKey][key] = true;
          }
        });
      } else {
        _this7.nodes[refKey][key] = expandAll;
      }
    });
  };

  _proto.toggleExpand = function toggleExpand(node, isExpand) {
    var valueKey = this.props.valueKey;
    var expandItemValues = new Set(this.serializeList('expand'));

    if (isExpand) {
      expandItemValues.add(node[valueKey]);
    } else {
      expandItemValues.delete(node[valueKey]);
    }

    return Array.from(expandItemValues);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$props16 = this.props,
        _this$props16$height = _this$props16.height,
        height = _this$props16$height === void 0 ? defaultHeight : _this$props16$height,
        searchable = _this$props16.searchable,
        searchKeyword = _this$props16.searchKeyword,
        renderExtraFooter = _this$props16.renderExtraFooter,
        locale = _this$props16.locale,
        renderMenu = _this$props16.renderMenu,
        menuStyle = _this$props16.menuStyle,
        virtualized = _this$props16.virtualized,
        menuClassName = _this$props16.menuClassName,
        menuAutoWidth = _this$props16.menuAutoWidth;
    var keyword = !_isUndefined(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    var classes = classNames(menuClassName, this.addPrefix('tree-menu'));
    var styles = virtualized ? _extends({
      height: height
    }, menuStyle) : menuStyle;
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      ref: this.menuRef,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable ? React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      key: "searchBar",
      onChange: this.handleSearch,
      value: keyword
    }) : null, renderMenu ? renderMenu(this.renderTree()) : this.renderTree(), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.renderNode = function renderNode(node, index, layer) {
    var _this8 = this;

    var searchKeyword = this.state.searchKeyword;
    var _this$props17 = this.props,
        valueKey = _this$props17.valueKey,
        childrenKey = _this$props17.childrenKey;

    if (!node.visible) {
      return null;
    }

    var refKey = node.refKey;
    var expand = getExpandWhenSearching(searchKeyword, this.nodes[refKey].expand);
    var key = _isString(node[valueKey]) || _isNumber(node[valueKey]) ? node[valueKey] : refKey;
    var children = node[childrenKey]; // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点

    var visibleChildren = _isUndefined(searchKeyword) || searchKeyword.length === 0 ? !!children : hasVisibleChildren(node, childrenKey);

    var nodeProps = _extends({}, this.getTreeNodeProps(_extends({}, node, {
      expand: expand
    }), layer, index), {
      hasChildren: visibleChildren
    });

    if (nodeProps.hasChildren) {
      var _classNames;

      layer += 1; // 是否展开树节点且子节点不为空

      var openClass = this.addTreePrefix('open');
      var childrenClass = classNames(this.addTreePrefix('node-children'), (_classNames = {}, _classNames[openClass] = expand && visibleChildren, _classNames));
      var nodes = children || [];
      return React.createElement("div", {
        className: childrenClass,
        key: key
      }, React.createElement(TreeNode, _extends({}, nodeProps, {
        innerRef: this.bindNodeRefs.bind(this, refKey)
      })), React.createElement("div", {
        className: this.addTreePrefix('children')
      }, nodes.map(function (child, i) {
        return _this8.renderNode(child, i, layer);
      })));
    }

    return React.createElement(TreeNode, _extends({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, nodeProps));
  };

  _proto.renderVirtualNode = function renderVirtualNode(node, options) {
    var searchKeyword = this.state.searchKeyword;
    var childrenKey = this.props.childrenKey;
    var key = options.key,
        style = options.style;
    var layer = node.layer,
        refKey = node.refKey,
        showNode = node.showNode;
    var expand = getExpandWhenSearching(searchKeyword, this.nodes[refKey].expand);

    if (!node.visible) {
      return null;
    }

    var nodeProps = _extends({}, this.getTreeNodeProps(_extends({}, node, {
      expand: expand
    }), layer), {
      style: style,
      hasChildren: !!node[childrenKey]
    });

    return showNode && React.createElement(TreeNode, _extends({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, nodeProps));
  };

  _proto.renderTree = function renderTree() {
    var _classNames2,
        _this9 = this;

    var filterData = this.state.filterData;
    var _this$props18 = this.props,
        height = _this$props18.height,
        className = _this$props18.className,
        inline = _this$props18.inline,
        style = _this$props18.style,
        locale = _this$props18.locale,
        virtualized = _this$props18.virtualized,
        searchable = _this$props18.searchable;
    var layer = 0;
    var classes = classNames(defaultClassPrefix('tree'), (_classNames2 = {}, _classNames2[className] = inline, _classNames2));
    var nodes = [];

    if (!virtualized) {
      nodes = filterData.map(function (dataItem, index) {
        return _this9.renderNode(dataItem, index, layer);
      });

      if (!nodes.some(function (v) {
        return v !== null;
      })) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } else {
      nodes = this.getFlattenTreeData(filterData).filter(function (n) {
        return n.showNode && n.visible;
      });

      if (!nodes.length) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度


    var treeHeight = _isUndefined(height) && virtualized ? defaultHeight : height;
    var treeWidth = _isUndefined(style === null || style === void 0 ? void 0 : style.width) ? defaultWidth : style.width;
    var styles = inline ? _extends({
      height: treeHeight
    }, style) : {};
    var listHeight = getVirtualLisHeight(inline, searchable, treeHeight);
    return React.createElement(React.Fragment, null, React.createElement("div", {
      ref: this.treeViewRef,
      className: classes,
      style: styles,
      onKeyDown: this.handleKeyDown
    }, React.createElement("div", {
      className: this.addTreePrefix('nodes')
    }, virtualized ? React.createElement(AutoSizer, {
      defaultHeight: listHeight,
      defaultWidth: treeWidth
    }, function (_ref4) {
      var height = _ref4.height,
          width = _ref4.width;
      return React.createElement(List, {
        ref: _this9.listRef,
        width: width || treeWidth,
        height: height || listHeight,
        rowHeight: 38,
        rowCount: nodes.length,
        rowRenderer: _this9.measureRowRenderer(nodes)
      });
    }) : nodes)), this.renderDragNode());
  };

  _proto.renderDragNode = function renderDragNode() {
    var _this$props19 = this.props,
        labelKey = _this$props19.labelKey,
        draggable = _this$props19.draggable,
        renderDragNode = _this$props19.renderDragNode;
    var dragNode = this.dragNode || {};

    if (draggable) {
      var dragNodeContent = dragNode[labelKey];

      if (_isFunction(renderDragNode)) {
        dragNodeContent = renderDragNode(dragNode);
      }

      return React.createElement("span", {
        id: "drag-node",
        className: this.addTreePrefix('drag-node-mover')
      }, dragNodeContent);
    }

    return null;
  };

  _proto.render = function render() {
    var _this$props20 = this.props,
        inline = _this$props20.inline,
        locale = _this$props20.locale,
        disabled = _this$props20.disabled,
        toggleComponentClass = _this$props20.toggleComponentClass,
        placeholder = _this$props20.placeholder,
        cleanable = _this$props20.cleanable,
        renderValue = _this$props20.renderValue,
        labelKey = _this$props20.labelKey,
        onEntered = _this$props20.onEntered,
        onExited = _this$props20.onExited,
        onClean = _this$props20.onClean,
        style = _this$props20.style,
        positionRef = _this$props20.positionRef,
        rest = _objectWithoutPropertiesLoose(_this$props20, ["inline", "locale", "disabled", "toggleComponentClass", "placeholder", "cleanable", "renderValue", "labelKey", "onEntered", "onExited", "onClean", "style", "positionRef"]);

    var _this$state6 = this.state,
        selectedValue = _this$state6.selectedValue,
        activeNode = _this$state6.activeNode;

    var hasValidValue = !_isNil(activeNode) || !_isNil(selectedValue) && _isFunction(renderValue);

    var classes = getToggleWrapperClassName('tree', this.addPrefix, this.props, hasValidValue);
    var selectedElement = placeholder;
    var hasValue = !!activeNode;
    /**
     * if value is invalid and renderValue is undefined, then using placeholder.
     * if value is valid and renderValue is't undefined, then using renderValue()
     */

    if (!_isNil(selectedValue)) {
      if (hasValue) {
        selectedElement = activeNode[labelKey];
      }

      if (_isFunction(renderValue)) {
        var node = activeNode !== null && activeNode !== void 0 ? activeNode : {};
        selectedElement = renderValue(selectedValue, node, selectedElement);
      }
    }

    var unhandled = getUnhandledProps(TreePicker, rest);

    if (inline) {
      return this.renderTree();
    }

    return React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: mergeRefs(this.positionRef, positionRef),
      onEntered: createChainedFunction(this.handleOnOpen, onEntered),
      onExited: createChainedFunction(this.handleOnClose, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      ref: this.toggleRef,
      onKeyDown: this.handleToggleKeyDown,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      componentClass: toggleComponentClass,
      hasValue: hasValidValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return TreePicker;
}(React.Component);

TreePicker.propTypes = _extends({}, listPickerPropTypes, {
  height: PropTypes.number,
  inline: PropTypes.bool,
  draggable: PropTypes.bool,
  expandAll: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchable: PropTypes.bool,
  menuAutoWidth: PropTypes.bool,
  searchKeyword: PropTypes.string,
  defaultExpandAll: PropTypes.bool,
  expandItemValues: PropTypes.array,
  defaultExpandItemValues: PropTypes.array,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  renderMenu: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderTreeIcon: PropTypes.func,
  renderExtraFooter: PropTypes.func,
  renderDragNode: PropTypes.func,
  searchBy: PropTypes.func
});
TreePicker.defaultProps = _extends({}, listPickerDefaultProps, {
  searchable: true,
  menuAutoWidth: true,
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
});
polyfill(TreePicker);
export default defaultProps({
  classPrefix: 'picker'
})(TreePicker);