import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _pick from "lodash/pick";
import _isUndefined from "lodash/isUndefined";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import setSeconds from "date-fns/set_seconds";
import setMinutes from "date-fns/set_minutes";
import setHours from "date-fns/set_hours";
import getSeconds from "date-fns/get_seconds";
import isSameDay from "date-fns/is_same_day";
import getHours from "date-fns/get_hours";
import getMinutes from "date-fns/get_minutes";
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import Calendar from '../Calendar/Calendar';
import Toolbar from './Toolbar';
import { disabledTime, calendarOnlyProps } from '../utils/timeUtils';
import { shouldOnlyTime } from '../utils/formatUtils';
import composeFunctions from '../utils/composeFunctions';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';
import { PickerToggle, MenuWrapper, PickerToggleTrigger, getToggleWrapperClassName } from '../Picker';
import { pickerPropTypes, pickerDefaultProps } from '../Picker/propTypes';

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;
    _this.calendar = null;

    _this.onMoveForword = function (nextPageDate) {
      var _this$props$onNextMon, _this$props, _this$props$onChangeC, _this$props2;

      _this.setState({
        pageDate: nextPageDate
      });

      (_this$props$onNextMon = (_this$props = _this.props).onNextMonth) === null || _this$props$onNextMon === void 0 ? void 0 : _this$props$onNextMon.call(_this$props, nextPageDate);
      (_this$props$onChangeC = (_this$props2 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC === void 0 ? void 0 : _this$props$onChangeC.call(_this$props2, nextPageDate);
    };

    _this.onMoveBackward = function (nextPageDate) {
      var _this$props$onPrevMon, _this$props3, _this$props$onChangeC2, _this$props4;

      _this.setState({
        pageDate: nextPageDate
      });

      (_this$props$onPrevMon = (_this$props3 = _this.props).onPrevMonth) === null || _this$props$onPrevMon === void 0 ? void 0 : _this$props$onPrevMon.call(_this$props3, nextPageDate);
      (_this$props$onChangeC2 = (_this$props4 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC2 === void 0 ? void 0 : _this$props$onChangeC2.call(_this$props4, nextPageDate);
    };

    _this.getValue = function () {
      return _this.props.value || _this.state.value;
    };

    _this.handleChangePageDate = function (nextPageDate) {
      _this.setState({
        pageDate: nextPageDate,
        calendarState: undefined
      });

      _this.handleAllSelect(nextPageDate);
    };

    _this.handleChangePageTime = function (nextPageTime) {
      _this.setState({
        pageDate: nextPageTime
      });

      _this.handleAllSelect(nextPageTime);
    };

    _this.handleToggleMeridian = function () {
      var pageDate = _this.state.pageDate;
      var hours = getHours(pageDate);
      var nextHours = hours >= 12 ? hours - 12 : hours + 12;
      var nextDate = setHours(pageDate, nextHours);

      _this.setState({
        pageDate: nextDate
      });
    };

    _this.handleShortcutPageDate = function (value, closeOverlay, event) {
      _this.updateValue(event, value, closeOverlay);

      _this.handleAllSelect(value, event);
    };

    _this.handleOK = function (event) {
      var _this$props$onOk, _this$props5;

      _this.updateValue(event);

      (_this$props$onOk = (_this$props5 = _this.props).onOk) === null || _this$props$onOk === void 0 ? void 0 : _this$props$onOk.call(_this$props5, _this.state.pageDate, event);
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

    _this.toggleMonthDropdown = function () {
      var _this$props$onToggleM, _this$props6;

      var calendarState = _this.state.calendarState;
      var toggle;

      if (calendarState === 'DROP_MONTH') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showMonthDropdown();

        toggle = true;
      }

      (_this$props$onToggleM = (_this$props6 = _this.props).onToggleMonthDropdown) === null || _this$props$onToggleM === void 0 ? void 0 : _this$props$onToggleM.call(_this$props6, toggle);
    };

    _this.toggleTimeDropdown = function () {
      var _this$props$onToggleT, _this$props7;

      var calendarState = _this.state.calendarState;
      var toggle;

      if (calendarState === 'DROP_TIME') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showTimeDropdown();

        toggle = true;
      }

      (_this$props$onToggleT = (_this$props7 = _this.props).onToggleTimeDropdown) === null || _this$props$onToggleT === void 0 ? void 0 : _this$props$onToggleT.call(_this$props7, toggle);
    };

    _this.handleClean = function (event) {
      _this.setState({
        pageDate: new Date()
      });

      _this.updateValue(event, null);
    };

    _this.handleAllSelect = function (nextValue, event) {
      var _this$props$onSelect, _this$props8, _this$props$onChangeC3, _this$props9;

      (_this$props$onSelect = (_this$props8 = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props8, nextValue, event);
      (_this$props$onChangeC3 = (_this$props9 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC3 === void 0 ? void 0 : _this$props$onChangeC3.call(_this$props9, nextValue, event);
    };

    _this.handleSelect = function (nextValue, event) {
      var oneTap = _this.props.oneTap;
      var pageDate = _this.state.pageDate;

      _this.setState({
        pageDate: composeFunctions(function (d) {
          return setHours(d, getHours(pageDate));
        }, function (d) {
          return setMinutes(d, getMinutes(pageDate));
        }, function (d) {
          return setSeconds(d, getSeconds(pageDate));
        })(nextValue)
      });

      _this.handleAllSelect(nextValue);

      if (oneTap) {
        _this.updateValue(event, nextValue);
      }
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props10;

      (_this$props$onOpen = (_this$props10 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props10);

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props11;

      (_this$props$onClose = (_this$props11 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props11);

      _this.setState({
        calendarState: undefined,
        active: false
      });
    };

    _this.disabledToolbarHandle = function (date) {
      var disabledDate = _this.props.disabledDate;
      var allowDate = disabledDate ? disabledDate(date) : false;
      var allowTime = disabledTime(_this.props, date);
      return allowDate || allowTime;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue,
        _value = props.value,
        calendarDefaultDate = props.calendarDefaultDate;
    var activeValue = _value || defaultValue;
    _this.state = {
      value: activeValue,
      pageDate: activeValue || calendarDefaultDate || new Date() // display calendar date

    };
    _this.triggerRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  DatePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (typeof nextProps.value !== 'undefined') {
      var value = nextProps.value;

      if (value && !isSameDay(value, prevState.value)) {
        return {
          value: value,
          pageDate: value
        };
      }

      return {
        value: value
      };
    }

    return null;
  };

  var _proto = DatePicker.prototype;

  _proto.getDateString = function getDateString() {
    var _this$props12 = this.props,
        placeholder = _this$props12.placeholder,
        formatType = _this$props12.format,
        renderValue = _this$props12.renderValue;
    var value = this.getValue();

    if (value) {
      return renderValue ? renderValue(value, formatType) : React.createElement(FormattedDate, {
        date: value,
        formatStr: formatType
      });
    }

    return placeholder || formatType;
  };

  _proto.updateValue = function updateValue(event, nextPageDate, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    var pageDate = this.state.pageDate;
    var value = this.getValue();
    var nextValue = !_isUndefined(nextPageDate) ? nextPageDate : pageDate;
    this.setState({
      pageDate: nextValue || new Date(),
      value: nextValue
    });

    if (nextValue !== value || !isSameDay(nextValue, value)) {
      var _this$props$onChange, _this$props13;

      (_this$props$onChange = (_this$props13 = this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props13, nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  };

  _proto.resetPageDate = function resetPageDate() {
    var calendarDefaultDate = this.props.calendarDefaultDate;
    var value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || new Date()
    });
  };

  _proto.showMonthDropdown = function showMonthDropdown() {
    this.setState({
      calendarState: 'DROP_MONTH'
    });
  };

  _proto.hideDropdown = function hideDropdown() {
    this.setState({
      calendarState: undefined
    });
  };

  _proto.showTimeDropdown = function showTimeDropdown() {
    this.setState({
      calendarState: 'DROP_TIME'
    });
  };

  _proto.renderCalendar = function renderCalendar() {
    var _this$props14 = this.props,
        format = _this$props14.format,
        isoWeek = _this$props14.isoWeek,
        limitEndYear = _this$props14.limitEndYear,
        disabledDate = _this$props14.disabledDate,
        showWeekNumbers = _this$props14.showWeekNumbers,
        showMeridian = _this$props14.showMeridian;
    var _this$state = this.state,
        calendarState = _this$state.calendarState,
        pageDate = _this$state.pageDate;

    var calendarProps = _pick(this.props, calendarOnlyProps);

    return React.createElement(Calendar, _extends({}, calendarProps, {
      showWeekNumbers: showWeekNumbers,
      showMeridian: showMeridian,
      disabledDate: disabledDate,
      limitEndYear: limitEndYear,
      format: format,
      isoWeek: isoWeek,
      calendarState: calendarState,
      pageDate: pageDate,
      onMoveForword: this.onMoveForword,
      onMoveBackward: this.onMoveBackward,
      onSelect: this.handleSelect,
      onToggleMonthDropdown: this.toggleMonthDropdown,
      onToggleTimeDropdown: this.toggleTimeDropdown,
      onChangePageDate: this.handleChangePageDate,
      onChangePageTime: this.handleChangePageTime,
      onToggleMeridian: this.handleToggleMeridian
    }));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu(calendar) {
    var _this$props15 = this.props,
        ranges = _this$props15.ranges,
        menuClassName = _this$props15.menuClassName,
        oneTap = _this$props15.oneTap;
    var pageDate = this.state.pageDate;
    var classes = classNames(this.addPrefix('date-menu'), menuClassName);
    return React.createElement(MenuWrapper, {
      className: classes
    }, React.createElement("div", {
      ref: this.menuContainerRef
    }, calendar, React.createElement(Toolbar, {
      ranges: ranges,
      pageDate: pageDate,
      disabledHandle: this.disabledToolbarHandle,
      onShortcut: this.handleShortcutPageDate,
      onOk: this.handleOK,
      hideOkButton: oneTap
    })));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props16 = this.props,
        inline = _this$props16.inline,
        className = _this$props16.className,
        disabled = _this$props16.disabled,
        cleanable = _this$props16.cleanable,
        classPrefix = _this$props16.classPrefix,
        format = _this$props16.format,
        locale = _this$props16.locale,
        toggleComponentClass = _this$props16.toggleComponentClass,
        style = _this$props16.style,
        onEntered = _this$props16.onEntered,
        onExited = _this$props16.onExited,
        onClean = _this$props16.onClean,
        rest = _objectWithoutPropertiesLoose(_this$props16, ["inline", "className", "disabled", "cleanable", "classPrefix", "format", "locale", "toggleComponentClass", "style", "onEntered", "onExited", "onClean"]);

    var value = this.getValue();
    var unhandled = getUnhandledProps(DatePicker, rest);
    var hasValue = !!value;
    var calendar = this.renderCalendar();

    if (inline) {
      return React.createElement(IntlContext.Provider, {
        value: locale
      }, React.createElement("div", {
        className: classNames(classPrefix, this.addPrefix('date-inline'), className)
      }, calendar));
    }

    var classes = getToggleWrapperClassName('date', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('date-only-time')] = shouldOnlyTime(format), _getToggleWrapperClas));
    return React.createElement(IntlContext.Provider, {
      value: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      onEntered: createChainedFunction(this.handleEntered, onEntered),
      onExited: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu(calendar)
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), this.getDateString()))));
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = _extends({}, pickerPropTypes, {
  ranges: PropTypes.array,
  defaultValue: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  calendarDefaultDate: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  inline: PropTypes.bool,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  oneTap: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  showMeridian: PropTypes.bool,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  onChange: PropTypes.func,
  onChangeCalendarDate: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onSelect: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
  onOk: PropTypes.func
});
DatePicker.defaultProps = _extends({}, pickerDefaultProps, {
  limitEndYear: 1000,
  format: 'YYYY-MM-DD',
  placeholder: '',
  locale: {
    sunday: 'Su',
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    ok: 'OK',
    today: 'Today',
    yesterday: 'Yesterday',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  }
});
polyfill(DatePicker);
export default defaultProps({
  classPrefix: 'picker'
})(DatePicker);