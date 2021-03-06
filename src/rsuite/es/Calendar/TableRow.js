import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import format from "date-fns/format";
import getDate from "date-fns/get_date";
import addDays from "date-fns/add_days";
import isSameDay from "date-fns/is_same_day";
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';

var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(TableRow, _React$PureComponent);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleSelect = function (date, disabled, event) {
      var _this$props$onSelect, _this$props;

      if (disabled) {
        return;
      }

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, date, event);
    };

    return _this;
  }

  var _proto = TableRow.prototype;

  _proto.renderDays = function renderDays() {
    var _this$props2 = this.props,
        weekendDate = _this$props2.weekendDate,
        disabledDate = _this$props2.disabledDate,
        inSameMonth = _this$props2.inSameMonth,
        selected = _this$props2.selected,
        renderCell = _this$props2.renderCell;

    var _ref = this.context || {},
        formatDate = _ref.formatDate,
        formattedDayPattern = _ref.formattedDayPattern,
        today = _ref.today;

    var formatStr = formattedDayPattern || 'YYYY-MM-DD';
    var days = [];

    for (var i = 0; i < 7; i += 1) {
      var _classNames;

      var thisDate = addDays(weekendDate, i);
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate);
      var isToday = isSameDay(thisDate, new Date());
      var classes = classNames(this.addPrefix('cell'), (_classNames = {}, _classNames[this.addPrefix('cell-un-same-month')] = !(inSameMonth && inSameMonth(thisDate)), _classNames[this.addPrefix('cell-is-today')] = isToday, _classNames[this.addPrefix('cell-selected')] = isSameDay(thisDate, selected), _classNames[this.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = formatDate ? formatDate(thisDate, formatStr) : format(thisDate, formatStr);
      days.push(React.createElement("div", {
        key: title,
        className: classes,
        role: "menu",
        tabIndex: -1,
        title: isToday ? title + " (" + today + ")" : title,
        onClick: this.handleSelect.bind(this, thisDate, disabled)
      }, React.createElement("div", {
        className: this.addPrefix('cell-content')
      }, React.createElement("span", {
        className: this.addPrefix('cell-day')
      }, getDate(thisDate)), renderCell && renderCell(thisDate))));
    }

    return days;
  };

  _proto.renderWeekNumber = function renderWeekNumber() {
    return React.createElement("div", {
      className: this.addPrefix('cell-week-number')
    }, format(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        showWeekNumbers = _this$props3.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["className", "showWeekNumbers"]);

    var classes = classNames(this.addPrefix('row'), className);
    var unhandled = getUnhandledProps(TableRow, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), this.renderDays());
  };

  return TableRow;
}(React.PureComponent);

TableRow.contextType = IntlContext;
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  renderCell: PropTypes.func
};
TableRow.defaultProps = {
  selected: new Date(),
  weekendDate: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(TableRow);