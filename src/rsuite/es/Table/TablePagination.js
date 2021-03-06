import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import Pagination from '../Pagination';
import SelectPicker from '../SelectPicker';
import Divider from '../Divider';
import { prefix, tplTransform, getUnhandledProps, defaultProps } from '../utils';
import withLocale from '../IntlProvider/withLocale';

var TablePagination =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TablePagination, _React$Component);

  function TablePagination() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChangeLength = function (eventKey) {
      var _this$props$onChangeL, _this$props;

      (_this$props$onChangeL = (_this$props = _this.props).onChangeLength) === null || _this$props$onChangeL === void 0 ? void 0 : _this$props$onChangeL.call(_this$props, eventKey);
    };

    _this.handleChangePage = function (eventKey) {
      var _this$props$onChangeP, _this$props2;

      (_this$props$onChangeP = (_this$props2 = _this.props).onChangePage) === null || _this$props$onChangeP === void 0 ? void 0 : _this$props$onChangeP.call(_this$props2, eventKey);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = TablePagination.prototype;

  _proto.renderLengthMenu = function renderLengthMenu() {
    var _this$props3 = this.props,
        _this$props3$lengthMe = _this$props3.lengthMenu,
        lengthMenu = _this$props3$lengthMe === void 0 ? [] : _this$props3$lengthMe,
        renderLengthMenu = _this$props3.renderLengthMenu,
        showLengthMenu = _this$props3.showLengthMenu,
        locale = _this$props3.locale,
        displayLength = _this$props3.displayLength,
        disabled = _this$props3.disabled;

    if (!showLengthMenu) {
      return null;
    }

    var disabledPicker = typeof disabled === 'function' ? disabled('picker') : disabled;
    var picker = React.createElement(SelectPicker, {
      appearance: "subtle",
      cleanable: false,
      searchable: false,
      placement: "topStart",
      data: lengthMenu,
      value: displayLength,
      onChange: this.handleChangeLength,
      menuStyle: {
        minWidth: 'auto'
      },
      disabled: disabledPicker
    });
    return React.createElement("div", {
      className: this.addPrefix('length-menu')
    }, renderLengthMenu ? renderLengthMenu(picker) : tplTransform(locale.lengthMenuInfo, picker));
  };

  _proto.renderInfo = function renderInfo() {
    var _this$props4 = this.props,
        renderTotal = _this$props4.renderTotal,
        total = _this$props4.total,
        showInfo = _this$props4.showInfo,
        locale = _this$props4.locale,
        activePage = _this$props4.activePage;

    if (!showInfo) {
      return null;
    }

    return React.createElement("div", {
      className: this.addPrefix('page-info')
    }, renderTotal ? renderTotal(total, activePage) : tplTransform(locale.totalInfo, total));
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        total = _this$props5.total,
        prev = _this$props5.prev,
        next = _this$props5.next,
        first = _this$props5.first,
        last = _this$props5.last,
        maxButtons = _this$props5.maxButtons,
        className = _this$props5.className,
        displayLength = _this$props5.displayLength,
        activePage = _this$props5.activePage,
        disabled = _this$props5.disabled,
        style = _this$props5.style,
        reverse = _this$props5.reverse,
        rest = _objectWithoutPropertiesLoose(_this$props5, ["total", "prev", "next", "first", "last", "maxButtons", "className", "displayLength", "activePage", "disabled", "style", "reverse"]);

    var pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    var classes = classNames(this.addPrefix('toolbar'), className);
    var unhandled = getUnhandledProps(TablePagination, rest);
    var pagers = [React.createElement("div", {
      className: classNames(this.addPrefix('start')),
      key: 1
    }, this.renderLengthMenu(), React.createElement(Divider, {
      vertical: true
    }), this.renderInfo()), React.createElement("div", {
      className: classNames(this.addPrefix('end')),
      key: 2
    }, React.createElement(Pagination, _extends({
      size: "xs",
      prev: prev,
      next: next,
      first: first,
      last: last,
      maxButtons: maxButtons,
      pages: pages,
      disabled: disabled,
      onSelect: this.handleChangePage,
      activePage: activePage
    }, unhandled)))];
    return React.createElement("div", {
      className: classes,
      style: style
    }, reverse ? pagers.reverse() : pagers);
  };

  return TablePagination;
}(React.Component);

TablePagination.propTypes = {
  lengthMenu: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.node
  })),
  showLengthMenu: PropTypes.bool,
  showInfo: PropTypes.bool,
  total: PropTypes.number,
  displayLength: PropTypes.number,
  prev: PropTypes.bool,
  next: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  maxButtons: PropTypes.number,
  activePage: PropTypes.number,
  className: PropTypes.string,
  locale: PropTypes.object,
  classPrefix: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  style: PropTypes.object,
  // reverse start and end position
  reverse: PropTypes.bool,
  renderLengthMenu: PropTypes.func,
  renderTotal: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeLength: PropTypes.func
};
TablePagination.defaultProps = {
  showLengthMenu: true,
  showInfo: true,
  lengthMenu: [{
    value: 30,
    label: 30
  }, {
    value: 50,
    label: 50
  }, {
    value: 100,
    label: 100
  }],
  displayLength: 30,
  prev: true,
  next: true,
  first: true,
  last: true,
  activePage: 1,
  maxButtons: 5,
  locale: {
    lengthMenuInfo: 'Show {0} data',
    totalInfo: 'Total: {0}'
  }
};
export default compose(withLocale(['TablePagination']), defaultProps({
  classPrefix: 'table-pagination'
}))(TablePagination);