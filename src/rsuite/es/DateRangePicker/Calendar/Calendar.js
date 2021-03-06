import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDate from "date-fns/set_date";
import isAfter from "date-fns/is_after";
import addMonths from "date-fns/add_months";
import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  function Calendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMoveForword = function () {
      var _this$props$onMoveFor, _this$props;

      (_this$props$onMoveFor = (_this$props = _this.props).onMoveForword) === null || _this$props$onMoveFor === void 0 ? void 0 : _this$props$onMoveFor.call(_this$props, addMonths(_this.getPageDate(), 1));
    };

    _this.handleMoveBackward = function () {
      var _this$props$onMoveBac, _this$props2;

      (_this$props$onMoveBac = (_this$props2 = _this.props).onMoveBackward) === null || _this$props$onMoveBac === void 0 ? void 0 : _this$props$onMoveBac.call(_this$props2, addMonths(_this.getPageDate(), -1));
    };

    _this.disabledBackward = function () {
      var _this$props3 = _this.props,
          calendarDate = _this$props3.calendarDate,
          index = _this$props3.index;
      var after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

      if (index === 0) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledForword = function () {
      var _this$props4 = _this.props,
          calendarDate = _this$props4.calendarDate,
          index = _this$props4.index,
          showOneCalendar = _this$props4.showOneCalendar;
      if (showOneCalendar) return false;
      var after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

      if (index === 1) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledMonth = function (date) {
      var _this$props5 = _this.props,
          calendarDate = _this$props5.calendarDate,
          value = _this$props5.value,
          index = _this$props5.index,
          disabledDate = _this$props5.disabledDate,
          showOneCalendar = _this$props5.showOneCalendar;
      var after = true;

      if (disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, value, 'MONTH')) {
        return true;
      }

      if (showOneCalendar) return false;

      if (index === 1) {
        after = isAfter(date, calendarDate[0]);
        return !after;
      }

      after = isAfter(calendarDate[1], date);
      return !after;
    };

    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.getPageDate = function getPageDate() {
    var _this$props6 = this.props,
        calendarDate = _this$props6.calendarDate,
        index = _this$props6.index;
    return calendarDate[index];
  };

  _proto.shouldMountDate = function shouldMountDate(props) {
    var _ref = props || this.props,
        format = _ref.format;

    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props7 = this.props,
        calendarState = _this$props7.calendarState,
        onSelect = _this$props7.onSelect,
        onMouseMove = _this$props7.onMouseMove,
        onToggleMonthDropdown = _this$props7.onToggleMonthDropdown,
        onChangePageDate = _this$props7.onChangePageDate,
        disabledDate = _this$props7.disabledDate,
        className = _this$props7.className,
        value = _this$props7.value,
        hoverValue = _this$props7.hoverValue,
        isoWeek = _this$props7.isoWeek,
        limitEndYear = _this$props7.limitEndYear,
        classPrefix = _this$props7.classPrefix,
        showWeekNumbers = _this$props7.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props7, ["calendarState", "onSelect", "onMouseMove", "onToggleMonthDropdown", "onChangePageDate", "disabledDate", "className", "value", "hoverValue", "isoWeek", "limitEndYear", "classPrefix", "showWeekNumbers"]);

    var pageDate = this.getPageDate();
    var dropMonth = calendarState === 'DROP_MONTH';
    var addPrefix = prefix(classPrefix);
    var calendarClasses = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('show-month-dropdown')] = dropMonth, _classNames));
    var unhandled = getUnhandledProps(Calendar, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: calendarClasses
    }), React.createElement(Header, {
      showMonth: true,
      date: pageDate,
      disabledBackward: this.disabledBackward(),
      disabledForword: this.disabledForword(),
      onMoveForword: this.handleMoveForword,
      onMoveBackward: this.handleMoveBackward,
      onToggleMonthDropdown: onToggleMonthDropdown
    }), React.createElement(View, {
      activeDate: pageDate,
      value: value,
      hoverValue: hoverValue,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      disabledDate: disabledDate,
      isoWeek: isoWeek,
      showWeekNumbers: showWeekNumbers
    }), React.createElement(MonthDropdown, {
      date: pageDate,
      show: dropMonth,
      disabledMonth: this.disabledMonth,
      onSelect: onChangePageDate,
      limitEndYear: limitEndYear
    }));
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  calendarState: PropTypes.oneOf(['DROP_MONTH', 'DROP_TIME']),
  index: PropTypes.number,
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  limitEndYear: PropTypes.number,
  disabledDate: PropTypes.func,
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  showOneCalendar: PropTypes.bool
};
Calendar.defaultProps = {
  calendarDate: [new Date(), addMonths(new Date(), 1)],
  index: 0
};
var enhance = defaultProps({
  classPrefix: 'calendar'
});
export default enhance(Calendar);