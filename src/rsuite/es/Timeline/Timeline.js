import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _some from "lodash/some";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import TimelineItem from './TimelineItem';
import { defaultProps, prefix, ReactChildren } from '../utils';

var Timeline =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Timeline, _React$Component);

  function Timeline() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Timeline.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        align = _this$props.align,
        endless = _this$props.endless,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "componentClass", "classPrefix", "className", "align", "endless"]);

    var addPrefix = prefix(classPrefix);
    var count = React.Children.count(children);

    var withTime = _some(React.Children.toArray(children), function (_ref) {
      var props = _ref.props;
      return !!props.time;
    });

    var classes = classNames(classPrefix, className, addPrefix("align-" + align), (_classNames = {}, _classNames[addPrefix('with-time')] = withTime, _classNames[addPrefix('endless')] = endless, _classNames));
    return React.createElement(Component, _extends({
      className: classes
    }, rest), ReactChildren.mapCloneElement(children, function (_child, index) {
      return {
        last: index + 1 === count,
        align: align
      };
    }));
  };

  return Timeline;
}(React.Component);

Timeline.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  componentClass: PropTypes.elementType,
  align: PropTypes.oneOf(['left', 'right', 'alternate']),
  endless: PropTypes.bool
};
Timeline.defaultProps = {
  align: 'left'
};
var EnhancedTimeline = defaultProps({
  classPrefix: 'timeline',
  componentClass: 'ul'
})(Timeline);
setStatic('Item', TimelineItem)(EnhancedTimeline);
export default EnhancedTimeline;