import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _isFunction from "lodash/isFunction";
import _isNil from "lodash/isNil";
import _omit from "lodash/omit";
import _pick from "lodash/pick";
import _isUndefined from "lodash/isUndefined";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from '../utils/shallowEqual';
import { polyfill } from 'react-lifecycles-compat';
import { findNodeOfTree } from '../utils/treeUtils';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import DropdownMenu, { dropdownMenuPropTypes } from './DropdownMenu';
import _stringToObject from '../utils/stringToObject';
import getSafeRegExpString from '../utils/getSafeRegExpString';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { getDerivedStateForCascade } from './utils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, mergeRefs } from '../utils';
import { PickerToggle, MenuWrapper, SearchBar, PickerToggleTrigger, getToggleWrapperClassName, createConcatChildrenFunction } from '../Picker';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

var Cascader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Cascader, _React$Component);

  function Cascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.triggerRef = void 0;
    _this.containerRef = void 0;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.isControlled = void 0;

    _this.handleSelect = function (node, cascadeItems, activePaths, isLeafNode, event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onSelect = _this$props.onSelect,
          valueKey = _this$props.valueKey,
          childrenKey = _this$props.childrenKey,
          parentSelectable = _this$props.parentSelectable;

      var prevValue = _this.getValue();

      var value = node[valueKey];
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, activePaths, createConcatChildrenFunction(node, value, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }), event);
      /**
       Determines whether the option is a leaf node, and if so, closes the picker.
       */

      if (isLeafNode) {
        _this.handleCloseDropdown();

        var _nextState = {
          selectNode: node
        };

        if (!_this.isControlled) {
          _nextState = _extends({}, _nextState, {
            value: value
          }, getDerivedStateForCascade(_this.props, _this.state, value));
        }

        _this.setState(_nextState);

        if (!shallowEqual(value, prevValue)) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
        }

        return;
      }

      var nextState = {
        selectNode: node,
        items: cascadeItems,
        tempActivePaths: activePaths
      };
      /** When the parent is optional, the value and the displayed path are updated. */

      if (parentSelectable) {
        nextState.value = value;
        nextState.activePaths = activePaths;

        if (!shallowEqual(value, prevValue)) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
        }
      }

      _this.setState(nextState, function () {
        var _this$positionRef$cur, _this$positionRef$cur2;

        // Update menu position
        (_this$positionRef$cur = _this.positionRef.current) === null || _this$positionRef$cur === void 0 ? void 0 : (_this$positionRef$cur2 = _this$positionRef$cur.updatePosition) === null || _this$positionRef$cur2 === void 0 ? void 0 : _this$positionRef$cur2.call(_this$positionRef$cur);
      });
    };

    _this.handleSearchRowSelect = function (item, event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange,
          onSelect = _this$props2.onSelect;
      var value = item[valueKey];

      _this.handleCloseDropdown();

      var nextState = {
        selectNode: item,
        searchKeyword: ''
      };

      if (!_this.isControlled) {
        nextState = _extends({}, nextState, {}, getDerivedStateForCascade(_this.props, _this.state, value), {
          value: value
        });
      }

      _this.setState(nextState);

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(item, null, null, event);
      onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
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
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange,
          data = _this$props3.data;

      if (disabled) {
        return;
      }

      var nextState = {
        items: [data],
        value: null,
        selectNode: null,
        activePaths: [],
        tempActivePaths: []
      };

      _this.setState(nextState, function () {
        onChange === null || onChange === void 0 ? void 0 : onChange(null, event);
      });
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props$onSearch, _this$props4;

      _this.setState({
        searchKeyword: searchKeyword
      });

      (_this$props$onSearch = (_this$props4 = _this.props).onSearch) === null || _this$props$onSearch === void 0 ? void 0 : _this$props$onSearch.call(_this$props4, searchKeyword, event);
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
      var _classNames;

      var _this$props7 = _this.props,
          labelKey = _this$props7.labelKey,
          valueKey = _this$props7.valueKey,
          _this$props7$disabled = _this$props7.disabledItemValues,
          disabledItemValues = _this$props7$disabled === void 0 ? [] : _this$props7$disabled;
      var searchKeyword = _this.state.searchKeyword;
      var regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
      var nodes = getNodeParents(item);
      nodes.push(item);
      nodes = nodes.map(function (node) {
        var _extends2;

        var labelElements = [];
        var a = node[labelKey].split(regx);
        var b = node[labelKey].match(regx);

        for (var i = 0; i < a.length; i++) {
          labelElements.push(a[i]);

          if (b && b[i]) {
            labelElements.push(React.createElement("strong", {
              key: i
            }, b[i]));
          }
        }

        return _extends({}, node, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2));
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = classNames(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses,
        onClick: function onClick(event) {
          if (!disabled) {
            _this.handleSearchRowSelect(item, event);
          }
        }
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }));
    };

    var initState = {
      searchKeyword: '',
      selectNode: null,
      data: props.data,
      value: props.defaultValue,

      /**
       * 选中值的路径
       */
      activePaths: [],

      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: []
    };
    _this.state = _extends({}, initState, {}, getDerivedStateForCascade(props, initState), {
      flattenData: flattenTree(props.data)
    });
    _this.isControlled = !_isUndefined(props.value);
    _this.triggerRef = React.createRef();
    _this.containerRef = React.createRef();
    _this.positionRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  Cascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        labelKey = nextProps.labelKey,
        valueKey = nextProps.valueKey;

    if (data !== prevState.data) {
      var _prevState$selectNode;

      // First get the value of the clicked node `selectNodeValue`, and then get the new `newChildren`.
      var selectNodeValue = prevState === null || prevState === void 0 ? void 0 : (_prevState$selectNode = prevState.selectNode) === null || _prevState$selectNode === void 0 ? void 0 : _prevState$selectNode[valueKey];

      if (selectNodeValue) {
        var _findNodeOfTree;

        var newChildren = ((_findNodeOfTree = findNodeOfTree(data, function (item) {
          return shallowEqual(item[valueKey], selectNodeValue);
        })) === null || _findNodeOfTree === void 0 ? void 0 : _findNodeOfTree.children) || [];
        return _extends({}, getDerivedStateForCascade(nextProps, prevState, selectNodeValue, newChildren.map(function (item) {
          return _stringToObject(item, labelKey, valueKey);
        })), {
          data: data,
          flattenData: flattenTree(data)
        });
      }

      return _extends({}, getDerivedStateForCascade(nextProps, prevState), {
        flattenData: flattenTree(data),
        data: data
      });
    }

    if (typeof value !== 'undefined' && !shallowEqual(value, prevState.value)) {
      return _extends({}, getDerivedStateForCascade(nextProps, prevState), {
        value: value
      });
    }

    return null;
  };

  var _proto = Cascader.prototype;

  _proto.getValue = function getValue(nextProps) {
    var _ref = nextProps || this.props,
        value = _ref.value;

    return _isUndefined(value) ? this.state.value : value;
  };

  /**
   * 在 data 对象中的数据类型是字符串比如: ['foo']
   * 通过这个行数可以把值转换成 [{name:'foo':value:'foo'}]
   */
  _proto.stringToObject = function stringToObject(value) {
    var _this$props8 = this.props,
        labelKey = _this$props8.labelKey,
        valueKey = _this$props8.valueKey;
    return _stringToObject(value, labelKey, valueKey);
  };

  _proto.someKeyword = function someKeyword(item) {
    var labelKey = this.props.labelKey;
    var searchKeyword = this.state.searchKeyword;

    if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
      return true;
    }

    if (item.parent && this.someKeyword(item.parent)) {
      return true;
    }

    return false;
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this4 = this;

    var childrenKey = this.props.childrenKey;
    var flattenData = this.state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (item[childrenKey]) {
        return false;
      }

      return _this4.someKeyword(item);
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

    var _this$state = this.state,
        items = _this$state.items,
        tempActivePaths = _this$state.tempActivePaths,
        activePaths = _this$state.activePaths,
        searchKeyword = _this$state.searchKeyword;
    var _this$props9 = this.props,
        renderMenu = _this$props9.renderMenu,
        renderExtraFooter = _this$props9.renderExtraFooter,
        menuClassName = _this$props9.menuClassName,
        menuStyle = _this$props9.menuStyle,
        searchable = _this$props9.searchable,
        locale = _this$props9.locale,
        inline = _this$props9.inline;
    var classes = classNames(this.addPrefix('cascader-menu'), menuClassName, (_classNames2 = {}, _classNames2[this.addPrefix('inline')] = inline, _classNames2));

    var menuProps = _pick(this.props, Object.keys(_omit(dropdownMenuPropTypes, ['classPrefix'])));

    return React.createElement(MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: this.addPrefix('cascader-menu'),
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: tempActivePaths || activePaths,
      activeItemValue: this.getValue(),
      onSelect: this.handleSelect,
      renderMenu: renderMenu
    })), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
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
        inline = _this$props10.inline,
        positionRef = _this$props10.positionRef,
        rest = _objectWithoutPropertiesLoose(_this$props10, ["valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean", "inline", "positionRef"]);

    if (inline) {
      return this.renderDropdownMenu();
    }

    var _this$state2 = this.state,
        activePaths = _this$state2.activePaths,
        active = _this$state2.active;
    var unhandled = getUnhandledProps(Cascader, rest);
    var value = this.getValue();
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasValue = activePaths.length > 0 || !_isNil(value) && _isFunction(renderValue);

    var activeItemLabel = placeholder;

    if (activePaths.length > 0) {
      activeItemLabel = [];
      activePaths.forEach(function (item, index) {
        var key = item[valueKey] || item[labelKey];
        activeItemLabel.push(React.createElement("span", {
          key: key
        }, item[labelKey]));

        if (index < activePaths.length - 1) {
          activeItemLabel.push(React.createElement("span", {
            className: "separator",
            key: key + "-separator"
          }, ' / '));
        }
      });
    }

    if (!_isNil(value) && _isFunction(renderValue)) {
      activeItemLabel = renderValue(value, activePaths, activeItemLabel);
    }

    var classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement(IntlContext.Provider, {
      value: locale
    }, React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu",
      ref: this.containerRef
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
      active: active
    }), activeItemLabel || React.createElement(FormattedMessage, {
      id: "placeholder"
    })))));
  };

  return Cascader;
}(React.Component);

Cascader.propTypes = _extends({}, listPickerPropTypes, {
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  cleanable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchable: PropTypes.bool,
  inline: PropTypes.bool,
  parentSelectable: PropTypes.bool
});
Cascader.defaultProps = _extends({}, listPickerDefaultProps, {
  searchable: true,
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
});
polyfill(Cascader);
export default defaultProps({
  classPrefix: 'picker'
})(Cascader);