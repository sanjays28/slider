"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.transitionPropTypes = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domLib = require("dom-lib");

var _classnames = _interopRequireDefault(require("classnames"));

var _getUnhandledProps = _interopRequireDefault(require("../utils/getUnhandledProps"));

var _getDOMNode = _interopRequireDefault(require("../utils/getDOMNode"));

var _getAnimationEnd = _interopRequireDefault(require("./getAnimationEnd"));

var _propTypes2 = require("./propTypes");

var UNMOUNTED = 0;
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 1;
exports.EXITED = EXITED;
var ENTERING = 2;
exports.ENTERING = ENTERING;
var ENTERED = 3;
exports.ENTERED = ENTERED;
var EXITING = 4;
exports.EXITING = EXITING;
var transitionPropTypes = (0, _extends2.default)({}, _propTypes2.animationPropTypes, {
  animation: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  className: _propTypes.default.string,
  in: _propTypes.default.bool,
  unmountOnExit: _propTypes.default.bool,
  transitionAppear: _propTypes.default.bool,
  timeout: _propTypes.default.number,
  exitedClassName: _propTypes.default.string,
  exitingClassName: _propTypes.default.string,
  enteredClassName: _propTypes.default.string,
  enteringClassName: _propTypes.default.string
});
exports.transitionPropTypes = transitionPropTypes;

var Transition =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Transition, _React$Component);

  function Transition(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.animationEventListener = null;
    _this.instanceElement = null;
    _this.nextCallback = null;
    _this.needsUpdate = null;
    _this.childRef = void 0;
    var initialStatus;

    if (props.in) {
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    _this.childRef = React.createRef();
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.in && nextProps.unmountOnExit) {
      if (prevState.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        return {
          status: EXITED
        };
      }
    }

    return null;
  };

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  };

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate() {
    if (!this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }

    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var status = this.state.status;
    var unmountOnExit = this.props.unmountOnExit;

    if (unmountOnExit && status === EXITED) {
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        if (this.instanceElement) {
          this.setState({
            status: UNMOUNTED
          });
        }
      }

      return;
    }

    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING || status === EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
    this.instanceElement = null;
  };

  _proto.onTransitionEnd = function onTransitionEnd(node, handler) {
    var _this$animationEventL;

    this.setNextCallback(handler);
    (_this$animationEventL = this.animationEventListener) === null || _this$animationEventL === void 0 ? void 0 : _this$animationEventL.off();

    if (node) {
      var _this$props = this.props,
          timeout = _this$props.timeout,
          animation = _this$props.animation;
      this.animationEventListener = (0, _domLib.on)(node, animation ? (0, _getAnimationEnd.default)() : _domLib.transition.end, this.nextCallback);

      if (timeout !== null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this2 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (!active) {
        return;
      }

      if (event) {
        if (_this2.instanceElement === event.target) {
          callback(event);
          active = false;
          _this2.nextCallback = null;
        }

        return;
      }

      callback(event);
      active = false;
      _this2.nextCallback = null;
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.getChildElement = function getChildElement() {
    if (this.childRef.current) {
      return (0, _getDOMNode.default)(this.childRef.current);
    }

    return (0, _getDOMNode.default)(this);
  };

  _proto.performEnter = function performEnter(props) {
    var _this3 = this;

    var _ref = props || this.props,
        onEnter = _ref.onEnter,
        onEntering = _ref.onEntering,
        onEntered = _ref.onEntered;

    this.cancelNextCallback();
    var node = this.getChildElement();
    this.instanceElement = node;
    onEnter === null || onEnter === void 0 ? void 0 : onEnter(node);
    this.safeSetState({
      status: ENTERING
    }, function () {
      onEntering === null || onEntering === void 0 ? void 0 : onEntering(node);

      _this3.onTransitionEnd(node, function () {
        _this3.safeSetState({
          status: ENTERED
        }, function () {
          onEntered === null || onEntered === void 0 ? void 0 : onEntered(node);
        });
      });
    });
  };

  _proto.performExit = function performExit(props) {
    var _this4 = this;

    var _ref2 = props || this.props,
        onExit = _ref2.onExit,
        onExiting = _ref2.onExiting,
        onExited = _ref2.onExited;

    this.cancelNextCallback();
    var node = this.getChildElement();
    this.instanceElement = node;
    onExit === null || onExit === void 0 ? void 0 : onExit(node);
    this.safeSetState({
      status: EXITING
    }, function () {
      onExiting === null || onExiting === void 0 ? void 0 : onExiting(node);

      _this4.onTransitionEnd(node, function () {
        _this4.safeSetState({
          status: EXITED
        }, function () {
          onExited === null || onExited === void 0 ? void 0 : onExited(node);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    if (this.instanceElement) {
      this.setState(nextState, this.setNextCallback(callback));
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        exitedClassName = _this$props2.exitedClassName,
        enteringClassName = _this$props2.enteringClassName,
        enteredClassName = _this$props2.enteredClassName,
        exitingClassName = _this$props2.exitingClassName,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["children", "className", "exitedClassName", "enteringClassName", "enteredClassName", "exitingClassName"]);
    var childProps = (0, _getUnhandledProps.default)(Transition, rest);
    var transitionClassName;

    if (status === EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = exitingClassName;
    }

    if (typeof children === 'function') {
      return children((0, _extends2.default)({}, childProps, {
        className: (0, _classnames.default)(className, transitionClassName)
      }), this.childRef);
    }

    var child = React.Children.only(children);
    return React.cloneElement(child, (0, _extends2.default)({}, childProps, {
      className: (0, _classnames.default)(child.props.className, className, transitionClassName)
    }));
  };

  return Transition;
}(React.Component);

Transition.propTypes = transitionPropTypes;
Transition.displayName = 'Transition';
Transition.defaultProps = {
  timeout: 1000
};
var _default = Transition;
exports.default = _default;