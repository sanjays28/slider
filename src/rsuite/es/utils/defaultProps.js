import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import { getClassNamePrefix } from './prefix';
import extendReactStatics from './extendReactStatics';

function defaultProps(props) {
  var classPrefix = props.classPrefix,
      rest = _objectWithoutPropertiesLoose(props, ["classPrefix"]);

  return function (BaseComponent) {
    var DefaultProps = React.forwardRef(function (ownerProps, ref) {
      return React.createElement(BaseComponent, _extends({
        ref: ref
      }, ownerProps));
    });
    DefaultProps.displayName = BaseComponent.displayName;
    DefaultProps.defaultProps = _extends({}, BaseComponent.defaultProps, {}, rest, {
      classPrefix: classPrefix ? "" + getClassNamePrefix() + classPrefix : undefined
    });
    extendReactStatics(DefaultProps, BaseComponent);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(DefaultProps);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps);
  };
}

export default defaultProps;