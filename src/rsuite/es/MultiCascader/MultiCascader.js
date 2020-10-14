import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _isFunction from "lodash/isFunction";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _isUndefined from "lodash/isUndefined";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqualArray from '../utils/shallowEqualArray';
import { polyfill } from 'react-lifecycles-compat';
import DropdownMenu, { dropdownMenuPropTypes } from './DropdownMenu';
import Checkbox from '../Checkbox';
import createUtils from './utils';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, mergeRefs } from '../utils';
import getSafeRegExpString from '../utils/getSafeRegExpString';
import { PickerToggle, MenuWrapper, SearchBar, SelectedElement, PickerToggleTrigger, getToggleWrapperClassName, createConcatChildrenFunction } from '../Picker';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

var MultiCascader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiCascader, _React$Component);

  function MultiCascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.isControlled = null;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.triggerRef = void 0;

    _this.handleCheck = function (item, event, checked) {
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          onChange = _this$props.onChange,
          cascade = _this$props.cascade,
          uncheckableItemValues = _this$props.uncheckableItemValues;
      var itemValue = item[valueKey];
      var value = [];

      if (cascade) {
        value = MultiCascader.utils.splitValue(item, checked, _this.getValue(), uncheckableItemValues).value;
      } else {
        value = _this.getValue();

        if (checked) {
          value.push(itemValue);
        } else {
          value = value.filter(function (n) {
            return n !== itemValue;
          });
        }
      }

      if (!_this.isControlled) {
        _this.setState({
          value: value
        });
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
    };

    _this.handleChangeForSearchItem = function (value, checked, event) {
      _this.handleCheck(value, event, checked);
    };

    _this.handleSelect = function (node, cascadeItems, activePaths, event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          valueKey = _this$props2.valueKey,
          childrenKey = _this$props2.childrenKey;

      _this.setState({
        selectNode: node,
        items: cascadeItems,
        activePaths: activePaths
      }, function () {
        var _this$positionRef$cur, _this$positionRef$cur2;

        (_this$positionRef$cur = _this.positionRef.current) === null || _this$positionRef$cur === void 0 ? void 0 : (_this$positionRef$cur2 = _this$positionRef$cur.updatePosition) === null || _this$positionRef$cur2 === void 0 ? void 0 : _this$positionRef$cur2.call(_this$positionRef$cur);
      });

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, activePaths, createConcatChildrenFunction(node, node[valueKey], {
        valueKey: valueKey,
        childrenKey: childrenKey
      }), event);
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props$onSearch, _this$props3;

      _this.setState({
        searchKeyword: searchKeyword
      });

      (_this$props$onSearch = (_this$props3 = _this.props).onSearch) === null || _this$props$onSearch === void 0 ? void 0 : _this$props$onSearch.call(_this$props3, searchKeyword, event);
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

    _this.handleClean = function (event) {
      var _this$props4 = _this.props,
          disabled = _this$props4.disabled,
          onChange = _this$props4.onChange,
          data = _this$props4.data;

      if (disabled) {
        return;
      }

      var nextState = {
        items: [data],
        selectNode: null,
        activePaths: []
      };

      if (!_this.isControlled) {
        nextState.value = [];
      }

      _this.setState(nextState);

      onChange === null || onChange === void 0 ? void 0 : onChange([], event);
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props5;

      (_this$props$onOpen = (_this$props5 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props5);

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props6;

      (_this$props$onClose = (_this$props6 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props6);

      _this.setState({
        searchKeyword: '',
        active: false
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderSearchRow = function (item, key) {
      var _extends2, _classNames;

      var _this$props7 = _this.props,
          labelKey = _this$props7.labelKey,
          valueKey = _this$props7.valueKey,
          cascade = _this$props7.cascade,
          _this$props7$disabled = _this$props7.disabledItemValues,
          disabledItemValues = _this$props7$disabled === void 0 ? [] : _this$props7$disabled;
      var searchKeyword = _this.state.searchKeyword;

      var values = _this.getValue();

      var nodes = getNodeParents(item);
      var regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
      var labelElements = [];
      var a = item[labelKey].split(regx);
      var b = item[labelKey].match(regx);

      for (var i = 0; i < a.length; i++) {
        labelElements.push(a[i]);

        if (b[i]) {
          labelElements.push(React.createElement("strong", {
            key: i
          }, b[i]));
        }
      }

      nodes.push(_extends({}, item, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2)));
      var active = values.some(function (value) {
        if (cascade) {
          return nodes.some(function (node) {
            return node[valueKey] === value;
          });
        }

        return item[valueKey] === value;
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = classNames(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses
      }, React.createElement(Checkbox, {
        disabled: disabled,
        checked: active,
        value: item,
        indeterminate: cascade && !active && MultiCascader.utils.isSomeChildChecked(item, values),
        onChange: _this.handleChangeForSearchItem
      }, React.createElement("span", {
        className: _this.addPrefix('cascader-cols')
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }))));
    };

    var _data = props.data,
        _value = props.value,
        defaultValue = props.defaultValue;
    var initState = {
      data: _data,
      searchKeyword: '',
      prevValue: _value,
      value: defaultValue || [],
      selectNode: null,

      /**
       * 选中值的路径
       */
      activePaths: []
    };
    MultiCascader.utils = createUtils(props);
    var flattenData = flattenTree(_data, props.childrenKey);
    _this.isControlled = !_isUndefined(_value);
    _this.state = _extends({}, initState, {
      flattenData: flattenData,

      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: [flattenData.filter(function (item) {
        return !item.parent;
      })]
    }, MultiCascader.getCascadeState(props, flattenData)); // for test

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  MultiCascader.getCascadeState = function getCascadeState(nextProps, flattenData, nextValue) {
    var data = nextProps.data,
        cascade = nextProps.cascade,
        value = nextProps.value,
        defaultValue = nextProps.defaultValue,
        uncheckableItemValues = nextProps.uncheckableItemValues;
    var cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      cascadeValue = MultiCascader.utils.transformValue(cascadeValue, flattenData, uncheckableItemValues);
    }

    return {
      value: cascadeValue
    };
  };

  MultiCascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        valueKey = nextProps.valueKey,
        childrenKey = nextProps.childrenKey;
    var value = nextProps.value || prevState.value || [];
    var prevValue = prevState.prevValue,
        _prevState$selectNode = prevState.selectNode,
        selectNode = _prevState$selectNode === void 0 ? {} : _prevState$selectNode,
        items = prevState.items;
    var flattenData = prevState.flattenData;
    var isChangedData = data !== prevState.data;
    var isChangedValue = !shallowEqualArray(prevValue, nextProps.value);

    if (isChangedData || isChangedValue) {
      if (isChangedData) {
        flattenData = flattenTree(data, nextProps.childrenKey);
      }
      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNode`， 然后再拿到新增后的 `newChildren`,
       */


      var nextSelectNode = flattenData.find(function (n) {
        return selectNode && n[valueKey] === selectNode[valueKey];
      });
      var newChildren = (_get(nextSelectNode, childrenKey) || []).map(function (item) {
        item.parent = nextSelectNode;
        return item;
      });

      if (newChildren.length && items) {
        items[items.length - 1] = newChildren;
      }

      var nextState = _extends({
        selectNode: nextSelectNode,
        flattenData: flattenData,
        data: data,
        items: MultiCascader.utils.getItems(nextSelectNode, flattenData)
      }, MultiCascader.getCascadeState(nextProps, flattenData, value));

      if (isChangedValue) {
        nextState.prevValue = nextProps.value;
      }

      return nextState;
    }

    return null;
  };

  var _proto = MultiCascader.prototype;

  _proto.getValue = function getValue() {
    return this.state.value || [];
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this$props8 = this.props,
        labelKey = _this$props8.labelKey,
        valueKey = _this$props8.valueKey,
        _this$props8$unchecka = _this$props8.uncheckableItemValues,
        uncheckableItemValues = _this$props8$unchecka === void 0 ? [] : _this$props8$unchecka;
    var _this$state = this.state,
        searchKeyword = _this$state.searchKeyword,
        flattenData = _this$state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (uncheckableItemValues.some(function (value) {
        return item[valueKey] === value;
      })) {
        return false;
      }

      if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
        return true;
      }

      return false;
    });

    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      if (i === 99) {
        return items;
      }
    }

    return items;
  };

  _proto.renderSearchResultPanel = function renderSearchResultPanel() {
    var locale = this.props.locale;
    var searchKeyword = this.state.searchKeyword;

    if (searchKeyword === '') {
      return null;
    }

    var items = this.getSearchResult();
    return React.createElement("div", {
      className: this.addPrefix('cascader-search-panel')
    }, items.length ? items.map(this.renderSearchRow) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _classNames2;

    var _this$state2 = this.state,
        items = _this$state2.items,
        activePaths = _this$state2.activePaths,
        searchKeyword = _this$state2.searchKeyword;
    var _this$props9 = this.props,
        renderMenu = _this$props9.renderMenu,
        renderExtraFooter = _this$props9.renderExtraFooter,
        menuClassName = _this$props9.menuClassName,
        menuStyle = _this$props9.menuStyle,
        classPrefix = _this$props9.classPrefix,
        searchable = _this$props9.searchable,
        locale = _this$props9.locale,
        inline = _this$props9.inline;
    var classes = classNames(this.addPrefix('cascader-menu'), this.addPrefix('multi-cascader-menu'), menuClassName, (_classNames2 = {}, _classNames2[this.addPrefix('inline')] = inline, _classNames2));

    var menuProps = _pick(this.props, Object.keys(dropdownMenuPropTypes));

    return React.createElement(MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: classPrefix,
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: activePaths,
      value: this.getValue(),
      onSelect: this.handleSelect,
      onCheck: this.handleCheck,
      renderMenu: renderMenu
    })), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props$value;

    var _this$props10 = this.props,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        childrenKey = _this$props10.childrenKey,
        placeholder = _this$props10.placeholder,
        renderValue = _this$props10.renderValue,
        disabled = _this$props10.disabled,
        cleanable = _this$props10.cleanable,
        locale = _this$props10.locale,
        toggleComponentClass = _this$props10.toggleComponentClass,
        style = _this$props10.style,
        onEnter = _this$props10.onEnter,
        onExited = _this$props10.onExited,
        onClean = _this$props10.onClean,
        countable = _this$props10.countable,
        cascade = _this$props10.cascade,
        inline = _this$props10.inline,
        positionRef = _this$props10.positionRef,
        rest = _objectWithoutPropertiesLoose(_this$props10, ["valueKey", "labelKey", "childrenKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean", "countable", "cascade", "inline", "positionRef"]);

    if (inline) {
      return this.renderDropdownMenu();
    }

    var flattenData = this.state.flattenData;
    var unhandled = getUnhandledProps(MultiCascader, rest);
    var value = this.getValue();
    var selectedItems = flattenData.filter(function (item) {
      return value.some(function (v) {
        return v === item[valueKey];
      });
    }) || [];
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasValue = selectedItems.length > 0 || ((_this$props$value = this.props.value) === null || _this$props$value === void 0 ? void 0 : _this$props$value.length) > 0 && _isFunction(renderValue);

    var selectedElement = placeholder;

    if (selectedItems.length > 0) {
      selectedElement = React.createElement(SelectedElement, {
        selectedItems: selectedItems,
        countable: countable,
        valueKey: valueKey,
        labelKey: labelKey,
        childrenKey: childrenKey,
        prefix: this.addPrefix,
        cascade: cascade,
        locale: locale
      });
    }

    if (hasValue && _isFunction(renderValue)) {
      selectedElement = renderValue((value === null || value === void 0 ? void 0 : value.length) > 0 ? value : this.props.value, selectedItems, selectedElement);
    }

    var classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu"
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: mergeRefs(this.positionRef, positionRef),
      onEnter: createChainedFunction(this.handleEntered, onEnter),
      onExited: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return MultiCascader;
}(React.Component);

MultiCascader.propTypes = _extends({}, listPickerPropTypes, {
  cascade: PropTypes.bool,
  inline: PropTypes.bool,
  countable: PropTypes.bool,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func
});
MultiCascader.defaultProps = _extends({}, listPickerDefaultProps, {
  searchable: true,
  countable: true,
  cascade: true,
  uncheckableItemValues: [],
  locale: {
    placeholder: 'Select',
    checkAll: 'All',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
});
MultiCascader.utils = {};
polyfill(MultiCascader);
export default defaultProps({
  classPrefix: 'picker'
})(MultiCascader);