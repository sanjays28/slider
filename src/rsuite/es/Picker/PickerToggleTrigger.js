import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _pick from "lodash/pick";
import React from 'react';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { placementPolyfill } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';
var PickerToggleTriggerProps = ['onEntered', 'onExited', 'open', 'defaultOpen', 'disabled', 'onEnter', 'onEntering', 'onExit', 'onExiting', 'onHide', 'container', 'containerPadding', 'preventOverflow', 'positionRef'];
var PickerToggleTrigger = React.forwardRef(function (props, ref) {
  var pickerProps = props.pickerProps,
      speaker = props.speaker,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
      open = props.open,
      rest = _objectWithoutPropertiesLoose(props, ["pickerProps", "speaker", "trigger", "open"]);

  var placement = pickerProps.placement;
  return React.createElement(IntlContext.Consumer, null, function (context) {
    return React.createElement(OverlayTrigger, _extends({
      trigger: trigger,
      ref: ref,
      open: open,
      placement: placementPolyfill(placement, context === null || context === void 0 ? void 0 : context.rtl),
      speaker: speaker
    }, _pick(pickerProps, PickerToggleTriggerProps), rest));
  });
});
PickerToggleTrigger.displayName = 'PickerToggleTrigger';
export default PickerToggleTrigger;