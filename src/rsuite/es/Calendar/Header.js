import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';

var Header =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Header, _React$PureComponent);

  function Header() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = Header.prototype;

  _proto.getTimeFormat = function getTimeFormat() {
    var _this$props = this.props,
        format = _this$props.format,
        showMeridian = _this$props.showMeridian;
    var timeFormat = [];

    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push(showMeridian ? 'hh' : 'HH');
    }

    if (/m/.test(format)) {
      timeFormat.push('mm');
    }

    if (/s/.test(format)) {
      timeFormat.push('ss');
    }

    return timeFormat.join(':');
  };

  _proto.getDateFormat = function getDateFormat() {
    var _this$props2 = this.props,
        showDate = _this$props2.showDate,
        showMonth = _this$props2.showMonth;

    var _ref = this.context || {},
        formattedDayPattern = _ref.formattedDayPattern,
        formattedMonthPattern = _ref.formattedMonthPattern;

    if (showDate) {
      return formattedDayPattern || 'YYYY-MM-DD';
    } else if (showMonth) {
      return formattedMonthPattern || 'YYYY-MM';
    }

    return 'YYYY';
  };

  _proto.renderTitle = function renderTitle() {
    var _this$props3 = this.props,
        date = _this$props3.date,
        renderTitle = _this$props3.renderTitle;

    if (renderTitle) {
      return renderTitle(date);
    }

    return date && React.createElement(FormattedDate, {
      date: date,
      formatStr: this.getDateFormat()
    });
  };

  _proto.render = function render() {
    var _classNames, _classNames2, _classNames3, _classNames4, _classNames5;

    var _this$props4 = this.props,
        date = _this$props4.date,
        onMoveForword = _this$props4.onMoveForword,
        onMoveBackward = _this$props4.onMoveBackward,
        onToggleMonthDropdown = _this$props4.onToggleMonthDropdown,
        onToggleTimeDropdown = _this$props4.onToggleTimeDropdown,
        onToggleMeridian = _this$props4.onToggleMeridian,
        showTime = _this$props4.showTime,
        showDate = _this$props4.showDate,
        showMonth = _this$props4.showMonth,
        classPrefix = _this$props4.classPrefix,
        className = _this$props4.className,
        disabledDate = _this$props4.disabledDate,
        disabledTime = _this$props4.disabledTime,
        disabledBackward = _this$props4.disabledBackward,
        disabledForword = _this$props4.disabledForword,
        renderToolbar = _this$props4.renderToolbar,
        showMeridian = _this$props4.showMeridian,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["date", "onMoveForword", "onMoveBackward", "onToggleMonthDropdown", "onToggleTimeDropdown", "onToggleMeridian", "showTime", "showDate", "showMonth", "classPrefix", "className", "disabledDate", "disabledTime", "disabledBackward", "disabledForword", "renderToolbar", "showMeridian"]);

    var dateTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-date'), (_classNames = {}, _classNames[this.addPrefix('error')] = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date), _classNames));
    var timeTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-time'), (_classNames2 = {}, _classNames2[this.addPrefix('error')] = disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(date), _classNames2));
    var backwardClass = classNames(this.addPrefix('backward'), (_classNames3 = {}, _classNames3[this.addPrefix('btn-disabled')] = disabledBackward, _classNames3));
    var forwardClass = classNames(this.addPrefix('forward'), (_classNames4 = {}, _classNames4[this.addPrefix('btn-disabled')] = disabledForword, _classNames4));
    var monthToolbar = React.createElement("div", {
      className: this.addPrefix('month-toolbar')
    }, React.createElement("i", {
      className: backwardClass,
      role: "button",
      tabIndex: -1,
      onClick: disabledBackward ? undefined : onMoveBackward
    }), React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: dateTitleClasses,
      onClick: onToggleMonthDropdown
    }, this.renderTitle()), React.createElement("i", {
      className: forwardClass,
      role: "button",
      tabIndex: -1,
      onClick: disabledForword ? undefined : onMoveForword
    }));
    var hasMonth = showDate || showMonth;
    var classes = classNames(classPrefix, className, (_classNames5 = {}, _classNames5[this.addPrefix('has-month')] = hasMonth, _classNames5[this.addPrefix('has-time')] = showTime, _classNames5));
    var unhandled = getUnhandledProps(Header, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), hasMonth && monthToolbar, showTime && React.createElement("div", {
      className: this.addPrefix('time-toolbar')
    }, React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: timeTitleClasses,
      onClick: onToggleTimeDropdown
    }, date && React.createElement(FormattedDate, {
      date: date,
      formatStr: this.getTimeFormat()
    })), showMeridian ? React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: this.addPrefix('meridian'),
      onClick: onToggleMeridian
    }, date && React.createElement(FormattedDate, {
      date: date,
      formatStr: "A"
    })) : null), renderToolbar === null || renderToolbar === void 0 ? void 0 : renderToolbar(date));
  };

  return Header;
}(React.PureComponent);

Header.contextType = IntlContext;
Header.propTypes = {
  date: PropTypes.instanceOf(Date),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  showMonth: PropTypes.bool,
  showDate: PropTypes.bool,
  showTime: PropTypes.bool,
  format: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledTime: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabledBackward: PropTypes.bool,
  disabledForword: PropTypes.bool,
  showMeridian: PropTypes.bool,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func
};
Header.defaultProps = {
  date: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-header'
});
export default enhance(Header);