import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setDisplayName, wrapDisplayName, setPropTypes } from 'recompose';
import prefix from './prefix';
import extendReactStatics from './extendReactStatics';
import { SIZE, STATUS, COLOR } from '../constants';
import refType from './refType';

function withStyleProps(options) {
  if (options === void 0) {
    options = {};
  }

  return function (BaseComponent) {
    var _options = options,
        hasSize = _options.hasSize,
        hasStatus = _options.hasStatus,
        hasColor = _options.hasColor,
        defaultColor = _options.defaultColor;
    var WithStyleComponent = React.forwardRef(function (props, ref) {
      var _classNames;

      var classPrefix = props.classPrefix,
          size = props.size,
          color = props.color,
          status = props.status,
          className = props.className,
          rest = _objectWithoutPropertiesLoose(props, ["classPrefix", "size", "color", "status", "className"]);

      var addPrefix = prefix(classPrefix);
      var classes = classNames(className, (_classNames = {}, _classNames[addPrefix(size)] = hasSize && size, _classNames[addPrefix(color)] = hasColor && color, _classNames[addPrefix(defaultColor)] = !color, _classNames[addPrefix(status)] = hasStatus && status, _classNames));
      return React.createElement(BaseComponent, _extends({}, rest, {
        ref: ref,
        classPrefix: classPrefix,
        className: classes
      }));
    });
    var propTypes = {
      innerRef: refType
    };

    if (hasSize) {
      propTypes.size = PropTypes.oneOf(SIZE);
    }

    if (hasColor) {
      propTypes.color = PropTypes.oneOf(COLOR);
    }

    if (hasStatus) {
      propTypes.status = PropTypes.oneOf(STATUS);
    }

    extendReactStatics(WithStyleComponent, BaseComponent);
    setPropTypes(propTypes)(WithStyleComponent);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(WithStyleComponent);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'withStyleProps'))(WithStyleComponent);
  };
}

export default withStyleProps;