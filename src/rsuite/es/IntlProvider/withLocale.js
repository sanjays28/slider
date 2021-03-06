import _extends from "@babel/runtime/helpers/esm/extends";
import _get from "lodash/get";
import * as React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import format from 'date-fns/format';
import defaultLocale from './locales/default';
import extendReactStatics from '../utils/extendReactStatics';
import { IntlGlobalContext } from './IntlProvider';

var mergeObject = function mergeObject(list) {
  return list.reduce(function (a, b) {
    a = _extends({}, a, {}, b);
    return a;
  }, {});
};

function withLocale(combineKeys) {
  if (combineKeys === void 0) {
    combineKeys = [];
  }

  return function (BaseComponent) {
    var WithLocale = React.forwardRef(function (props, ref) {
      return React.createElement(IntlGlobalContext.Consumer, null, function (options) {
        var locale = mergeObject(combineKeys.map(function (key) {
          return _get(options || defaultLocale, "" + key);
        }));

        if (options && typeof options.rtl !== undefined) {
          locale.rtl = options.rtl;
        } else if (typeof window !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl') {
          locale.rtl = true;
        }

        locale.formatDate = (options === null || options === void 0 ? void 0 : options.formatDate) || format;
        return React.createElement(BaseComponent, _extends({
          ref: ref,
          locale: locale
        }, props));
      });
    });
    WithLocale.displayName = BaseComponent.displayName;
    extendReactStatics(WithLocale, BaseComponent, ['defaultProps']);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(WithLocale);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
  };
}

export default withLocale;