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
import { filterNodesOfTree, findNodeOfTree } from '../utils/treeUtils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, getDataGroupBy, mergeRefs } from '../utils';
import { DropdownMenuItem, PickerToggle, PickerToggleTrigger, getToggleWrapperClassName, onMenuKeyDown, MenuWrapper, SearchBar, shouldDisplay as _shouldDisplay } from '../Picker';
import DropdownMenu, { dropdownMenuPropTypes } from '../Picker/DropdownMenu';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

var SelectPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectPicker, _React$Component);

  function SelectPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.searchBarContainerRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;

    _this.getFocusableMenuItems = function () {
      var menuItems = _this.menuContainerRef.current.menuItems;

      if (!menuItems) {
        return [];
      }

      var items = Object.values(menuItems).map(function (item) {
        return item.props.getItemData();
      });
      return filterNodesOfTree(items, function (item) {
        return _this.shouldDisplay(item);
      });
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!_isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.focusPrevMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index - 1];

        if (!_isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.selectFocusMenuItem = function (event) {
      var focusItemValue = _this.state.focusItemValue;
      var _this$props = _this.props,
          data = _this$props.data,
          valueKey = _this$props.valueKey;

      if (!focusItemValue) {
        return;
      } // Find active `MenuItem` by `value`


      var focusItem = findNodeOfTree(data, function (item) {
        return shallowEqual(item[valueKey], focusItemValue);
      });

      _this.setState({
        value: focusItemValue
      });

      _this.handleSelect(focusItemValue, focusItem, event);

      _this.handleChange(focusItemValue, event);

      _this.handleCloseDropdown();
    };

    _this.handleKeyDown = function (event) {
      var _this$toggleRef, _this$toggleRef$curre, _this$toggleRef$curre2;

      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          active = _this$state.active; // enter

      if ((!focusItemValue || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8 && event.target === ((_this$toggleRef = _this.toggleRef) === null || _this$toggleRef === void 0 ? void 0 : (_this$toggleRef$curre = _this$toggleRef.current) === null || _this$toggleRef$curre === void 0 ? void 0 : (_this$toggleRef$curre2 = _this$toggleRef$curre.getToggleNode) === null || _this$toggleRef$curre2 === void 0 ? void 0 : _this$toggleRef$curre2.call(_this$toggleRef$curre))) {
        _this.handleClean(event);
      }

      if (!_this.menuContainerRef.current) {
        return;
      }

      onMenuKeyDown(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown
      });
    };

    _this.handleItemSelect = function (value, item, event) {
      var nextState = {
        value: value,
        focusItemValue: value
      };

      _this.setState(nextState);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.handleCloseDropdown();
    };

    _this.handleSelect = function (value, item, event) {
      var _this$props$onSelect, _this$props2, _this$toggleRef$curre3;

      (_this$props$onSelect = (_this$props2 = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props2, value, item, event);
      (_this$toggleRef$curre3 = _this.toggleRef.current) === null || _this$toggleRef$curre3 === void 0 ? void 0 : _this$toggleRef$curre3.onFocus();
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _filteredData$;

      var _this$props3 = _this.props,
          onSearch = _this$props3.onSearch,
          valueKey = _this$props3.valueKey,
          data = _this$props3.data;
      var filteredData = filterNodesOfTree(data, function (item) {
        return _this.shouldDisplay(item, searchKeyword);
      });

      _this.setState({
        searchKeyword: searchKeyword,
        focusItemValue: filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]
      });

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
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

    _this.handleChange = function (value, event) {
      var _this$props$onChange, _this$props4;

      (_this$props$onChange = (_this$props4 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props4, value, event);
    };

    _this.handleClean = function (event) {
      var _this$props5 = _this.props,
          disabled = _this$props5.disabled,
          cleanable = _this$props5.cleanable;

      if (disabled || !cleanable) {
        return;
      }

      var nextState = {
        value: null,
        focusItemValue: null
      };

      _this.setState(nextState);

      _this.handleChange(null, event);
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props6;

      _this.setState({
        searchKeyword: '',
        active: false
      });

      (_this$props$onClose = (_this$props6 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props6);
    };

    _this.handleOpen = function () {
      var _this$props$onOpen, _this$props7;

      var value = _this.getValue();

      _this.setState({
        active: true,
        focusItemValue: value
      });

      (_this$props$onOpen = (_this$props7 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props7);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        labelKey = props.labelKey;
    var nextValue = _value || defaultValue;
    _this.state = {
      value: nextValue,
      focusItemValue: nextValue,
      searchKeyword: ''
    };
    _this.positionRef = React.createRef();
    _this.menuContainerRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef(); // for test

    _this.searchBarContainerRef = React.createRef();

    if (groupBy === _valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    return _this;
  }

  var _proto = SelectPicker.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return _isUndefined(value) ? this.state.value : value;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(item, word) {
    var _this$props8 = this.props,
        searchBy = _this$props8.searchBy,
        labelKey = _this$props8.labelKey;
    var label = item === null || item === void 0 ? void 0 : item[labelKey];
    var searchKeyword = typeof word === 'undefined' ? this.state.searchKeyword : word;

    if (typeof searchBy === 'function') {
      return searchBy(searchKeyword, label, item);
    }

    return _shouldDisplay(label, searchKeyword);
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this4 = this;

    var _this$props9 = this.props,
        data = _this$props9.data,
        groupBy = _this$props9.groupBy,
        searchable = _this$props9.searchable,
        locale = _this$props9.locale,
        renderMenu = _this$props9.renderMenu,
        renderExtraFooter = _this$props9.renderExtraFooter,
        menuClassName = _this$props9.menuClassName,
        menuStyle = _this$props9.menuStyle,
        menuAutoWidth = _this$props9.menuAutoWidth,
        sort = _this$props9.sort,
        virtualized = _this$props9.virtualized;
    var focusItemValue = this.state.focusItemValue;
    var classes = classNames(this.addPrefix('select-menu'), menuClassName);
    var filteredData = filterNodesOfTree(data, function (item) {
      return _this4.shouldDisplay(item);
    }); // Create a tree structure data when set `groupBy`

    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = _pick(this.props, Object.keys(_omit(dropdownMenuPropTypes, ['className', 'style', 'classPrefix'])));

    var menu = filteredData.length ? React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: this.addPrefix('select-menu'),
      dropdownMenuItemClassPrefix: this.addPrefix('select-menu-item'),
      dropdownMenuItemComponentClass: DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: [this.getValue()],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !_isUndefined(groupBy),
      onSelect: this.handleItemSelect,
      virtualized: virtualized
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      onKeyDown: this.handleKeyDown,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable && React.createElement(SearchBar, {
      ref: this.searchBarContainerRef,
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: this.state.searchKeyword
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        data = _this$props10.data,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        placeholder = _this$props10.placeholder,
        renderValue = _this$props10.renderValue,
        disabled = _this$props10.disabled,
        cleanable = _this$props10.cleanable,
        locale = _this$props10.locale,
        toggleComponentClass = _this$props10.toggleComponentClass,
        style = _this$props10.style,
        onEntered = _this$props10.onEntered,
        onExited = _this$props10.onExited,
        onClean = _this$props10.onClean,
        positionRef = _this$props10.positionRef,
        rest = _objectWithoutPropertiesLoose(_this$props10, ["data", "valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEntered", "onExited", "onClean", "positionRef"]);

    var unhandled = getUnhandledProps(SelectPicker, rest);
    var value = this.getValue(); // Find active `MenuItem` by `value`

    var activeItem = findNodeOfTree(data, function (item) {
      return shallowEqual(item[valueKey], value);
    });
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasValue = !!activeItem || !_isNil(value) && _isFunction(renderValue);

    var selectedElement = placeholder;

    if (activeItem === null || activeItem === void 0 ? void 0 : activeItem[labelKey]) {
      selectedElement = activeItem[labelKey];
    }

    if (!_isNil(value) && _isFunction(renderValue)) {
      selectedElement = renderValue(value, activeItem, selectedElement);
    }

    var classes = getToggleWrapperClassName('select', this.addPrefix, this.props, hasValue);
    return React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: mergeRefs(this.positionRef, positionRef),
      onEntered: createChainedFunction(this.handleOpen, onEntered),
      onExited: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu"
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      ref: this.toggleRef,
      onClean: createChainedFunction(this.handleClean, onClean),
      onKeyDown: this.handleKeyDown,
      componentClass: toggleComponentClass,
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return SelectPicker;
}(React.Component);

SelectPicker.propTypes = _extends({}, listPickerPropTypes, {
  menuAutoWidth: PropTypes.bool,
  maxHeight: PropTypes.number,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,

  /**
   * group by key in `data`
   */
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
});
SelectPicker.defaultProps = _extends({}, listPickerDefaultProps, {
  searchable: true,
  menuAutoWidth: true,
  virtualized: true,
  maxHeight: 320,
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
});
export default defaultProps({
  classPrefix: 'picker'
})(SelectPicker);