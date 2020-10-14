import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { defaultProps, prefix, getUnhandledProps, withStyleProps } from '../utils';
import { transformValueToCharacterMap, transformCharacterMapToValue } from './utils';
import shallowEqualArray from '../utils/shallowEqualArray';
import Icon from '../Icon';
import Character from './Character';
import { FormPlaintextContext } from '../Form/FormContext';
import { SIZE, KEY_CODE } from '../constants';

var Rate =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Rate, _React$Component);

  Rate.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, nextState) {
    var value = nextProps.value,
        max = nextProps.max,
        allowHalf = nextProps.allowHalf;
    var characterMap = transformValueToCharacterMap(value, max, allowHalf);

    if (typeof value !== 'undefined' && value !== nextState.prevPropsValue) {
      return {
        prevPropsValue: value,
        characterMap: characterMap
      };
    }

    return null;
  };

  function Rate(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.getCharacterMap = function (value) {
      var _this$props = _this.props,
          max = _this$props.max,
          allowHalf = _this$props.allowHalf;
      return transformValueToCharacterMap(value, max, allowHalf);
    };

    _this.resetCharacterMap = function () {
      _this.setState({
        characterMap: _this.getCharacterMap(_this.getValue())
      });
    };

    _this.handleMouseLeave = function (event) {
      var _this$props$onChangeA, _this$props2;

      _this.resetCharacterMap();

      (_this$props$onChangeA = (_this$props2 = _this.props).onChangeActive) === null || _this$props$onChangeA === void 0 ? void 0 : _this$props$onChangeA.call(_this$props2, _this.getValue(), event);
    };

    _this.handleChangeValue = function (index, event) {
      var _this$props3 = _this.props,
          cleanable = _this$props3.cleanable,
          onChange = _this$props3.onChange;
      var characterMap = _this.state.characterMap;

      var value = _this.getValue();

      var nextValue = transformCharacterMapToValue(characterMap);

      if (cleanable && value === nextValue && _this.getCharacterMap(value)[index] === characterMap[index]) {
        nextValue = 0;
      }

      if (nextValue !== value) {
        _this.setState({
          prevPropsValue: nextValue,
          characterMap: _this.getCharacterMap(nextValue)
        });

        onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
      }
    };

    _this.handleKeyDown = function (index, event) {
      var keyCode = event.keyCode;
      var _this$props4 = _this.props,
          max = _this$props4.max,
          allowHalf = _this$props4.allowHalf;
      var characterMap = _this.state.characterMap;
      var nextValue = transformCharacterMapToValue(characterMap);

      if (keyCode === KEY_CODE.RIGHT && nextValue < max) {
        nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
      } else if (keyCode === KEY_CODE.LEFT && nextValue > 0) {
        nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
      }

      _this.setState({
        characterMap: _this.getCharacterMap(nextValue)
      });

      if (keyCode === KEY_CODE.ENTER) {
        _this.handleChangeValue(index, event);
      }
    };

    _this.handleClick = function (index, key, event) {
      _this.handleChangeCharacterMap(index, key, event, function () {
        _this.handleChangeValue(index, event);
      });
    };

    var _value = props.value;
    var prevPropsValue = typeof _value !== 'undefined' ? _value : props.defaultValue;
    _this.state = {
      prevPropsValue: prevPropsValue,
      characterMap: _this.getCharacterMap(prevPropsValue)
    };
    return _this;
  }

  var _proto = Rate.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return typeof value === 'undefined' ? this.state.prevPropsValue : value;
  };

  _proto.handleChangeCharacterMap = function handleChangeCharacterMap(index, key, event, callback) {
    var _this2 = this;

    var characterMap = this.state.characterMap;
    var nextCharacterMap = characterMap.map(function (_item, i) {
      if (i === index && key === 'before' && _this2.props.allowHalf) {
        return 0.5;
      }

      return index >= i ? 1 : 0;
    });

    if (!shallowEqualArray(characterMap, nextCharacterMap)) {
      var _this$props$onChangeA2, _this$props5;

      this.setState({
        characterMap: nextCharacterMap
      }, callback);
      (_this$props$onChangeA2 = (_this$props5 = this.props).onChangeActive) === null || _this$props$onChangeA2 === void 0 ? void 0 : _this$props$onChangeA2.call(_this$props5, transformCharacterMapToValue(nextCharacterMap), event);
      return;
    }

    callback === null || callback === void 0 ? void 0 : callback();
  };

  _proto.render = function render() {
    var _classNames,
        _this3 = this;

    var _this$props6 = this.props,
        character = _this$props6.character,
        className = _this$props6.className,
        classPrefix = _this$props6.classPrefix,
        disabled = _this$props6.disabled,
        max = _this$props6.max,
        renderCharacter = _this$props6.renderCharacter,
        readOnly = _this$props6.readOnly,
        vertical = _this$props6.vertical,
        rest = _objectWithoutPropertiesLoose(_this$props6, ["character", "className", "classPrefix", "disabled", "max", "renderCharacter", "readOnly", "vertical"]);

    var characterMap = this.state.characterMap;
    var hoverValue = transformCharacterMapToValue(characterMap);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('disabled')] = disabled, _classNames[this.addPrefix('readonly')] = readOnly, _classNames));
    var unhandled = getUnhandledProps(Rate, rest);
    var plaintextRate = React.createElement("div", _extends({}, unhandled, {
      className: className
    }), this.getValue() + "(" + max + ")");
    var rate = React.createElement("ul", _extends({}, unhandled, {
      className: classes,
      onMouseLeave: this.handleMouseLeave
    }), characterMap.map(function (item, index) {
      return React.createElement(Character, {
        key: index,
        status: item,
        disabled: disabled || readOnly,
        vertical: vertical,
        onClick: _this3.handleClick.bind(_this3, index),
        onKeyDown: _this3.handleKeyDown.bind(_this3, index),
        onMouseMove: _this3.handleChangeCharacterMap.bind(_this3, index)
      }, renderCharacter ? renderCharacter(hoverValue, index) : character);
    }));
    return React.createElement(FormPlaintextContext.Consumer, null, function (plaintext) {
      return plaintext ? plaintextRate : rate;
    });
  };

  return Rate;
}(React.Component);

Rate.propTypes = {
  allowHalf: PropTypes.bool,
  character: PropTypes.node,
  classPrefix: PropTypes.string,
  cleanable: PropTypes.bool,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  renderCharacter: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(SIZE),
  value: PropTypes.number,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeActive: PropTypes.func
};
Rate.defaultProps = {
  character: React.createElement(Icon, {
    icon: "star"
  }),
  cleanable: true,
  defaultValue: 0,
  max: 5,
  size: 'md'
};
export default compose(withStyleProps({
  hasSize: true,
  hasColor: true
}), defaultProps({
  classPrefix: 'rate'
}))(Rate);