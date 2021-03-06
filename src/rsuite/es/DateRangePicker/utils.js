import isSameMonth from "date-fns/is_same_month";
import addMonths from "date-fns/add_months";
import endOfDay from "date-fns/end_of_day";
import startOfDay from "date-fns/start_of_day";
export var setTimingMargin = function setTimingMargin(date, way) {
  if (way === void 0) {
    way = 'left';
  }

  return way === 'right' ? endOfDay(date) : startOfDay(date);
};
export function getCalendarDate(value) {
  if (value === void 0) {
    value = [];
  }

  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    var sameMonth = isSameMonth(value[0], value[1]);
    return [value[0], sameMonth ? addMonths(value[1], 1) : value[1]];
  }

  return [new Date(), addMonths(new Date(), 1)];
}