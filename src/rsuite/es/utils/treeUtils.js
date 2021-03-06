import _extends from "@babel/runtime/helpers/esm/extends";
import _isEmpty from "lodash/isEmpty";
import _clone from "lodash/clone";
import _isNil from "lodash/isNil";
import _isUndefined from "lodash/isUndefined";
import _isArray from "lodash/isArray";
import _intersection from "lodash/intersection";
import shallowEqual from '../utils/shallowEqual';
import shallowEqualArray from '../utils/shallowEqualArray';
import { TREE_NODE_DROP_POSITION } from '../constants';
var SEARCH_BAR_HEIGHT = 48;
var MENU_PADDING = 12; // Tree Node 之间的 间隔

var TREE_NODE_GAP = 4;
/**
 * 判断当前节点是否应该显示
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */

export function shouldShowNodeByExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }

  if (parentKeys === void 0) {
    parentKeys = [];
  }

  var intersectionKeys = _intersection(expandItemValues, parentKeys);

  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }

  return false;
}
/**
 * 拍平树结构为数组
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 */

export function flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var flattenData = [];

  var traverse = function traverse(data, parent) {
    if (!_isArray(data)) {
      return;
    }

    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      node.parent = parent;
      flattenData.push(_extends({}, node));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}
/**
 * 获取树节点所有的祖先节点
 * @param {*} node
 */

export function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }

  var parents = [];

  var traverse = function traverse(node) {
    if (node === null || node === void 0 ? void 0 : node[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);
  return parents;
}
/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */

export function getVirtualLisHeight(inline, searchable, height) {
  if (height === void 0) {
    height = 0;
  }

  var searchBarHeight = searchable ? SEARCH_BAR_HEIGHT : 0;
  return inline ? height - MENU_PADDING * 2 : height - searchBarHeight - MENU_PADDING * 2;
}
/**
 * 判断节点是否存在可见的子节点。
 * @param node
 */

export function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}
/**
 * 废弃 prop warning
 * @param prop
 */

export function treeDeprecatedWarning(props, keys) {
  if (keys === void 0) {
    keys = [];
  }

  keys.forEach(function (key) {
    if (!_isUndefined(props[key])) {
      console.warn("'Warning: " + key + " is deprecated and will be removed in a future release.'");
    }
  });
}
/**
 * 浅比较两个数组是否不一样
 * @param a
 * @param b
 */

export function compareArray(a, b) {
  return _isArray(a) && _isArray(b) && !shallowEqualArray(a, b);
}
/**
 * 获取 expandAll 的 value
 * @param props
 */

export function getExpandAll(props) {
  var expandAll = props.expandAll,
      defaultExpandAll = props.defaultExpandAll;
  return !_isUndefined(expandAll) ? expandAll : defaultExpandAll;
}
/**
 * 获取 expandItemValues 的 value
 * @param props
 */

export function getExpandItemValues(props) {
  var expandItemValues = props.expandItemValues,
      defaultExpandItemValues = props.defaultExpandItemValues;

  if (!_isUndefined(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!_isUndefined(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }

  return [];
}
/**
 * 获取节点展开状态
 * @param node
 * @param props
 */

export function getExpandState(node, props) {
  var _node$childrenKey;

  var valueKey = props.valueKey,
      childrenKey = props.childrenKey,
      expandItemValues = props.expandItemValues;
  var expandAll = getExpandAll(props);
  var expand = getExpandItemValues(props).some(function (value) {
    return shallowEqual(node[valueKey], value);
  });

  if (!_isUndefined(expandItemValues)) {
    return expand;
  } else if ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) {
    if (!_isNil(node.expand)) {
      return !!node.expand;
    } else if (expandAll) {
      return true;
    }

    return false;
  }

  return false;
}
/**
 * 获取拖拽节点及子节点的key
 * @param node
 * @param childrenKey
 * @param valueKey
 */

export function getDragNodeKeys(dragNode, childrenKey, valueKey) {
  var dragNodeKeys = [dragNode[valueKey]];

  var traverse = function traverse(data) {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
      data.forEach(function (node) {
        dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);

        if (node[childrenKey]) {
          traverse(node[childrenKey]);
        }
      });
    }
  };

  traverse(dragNode[childrenKey]);
  return dragNodeKeys;
}
export function calDropNodePosition(event, treeNodeElement) {
  var clientY = event.clientY;

  var _treeNodeElement$getB = treeNodeElement.getBoundingClientRect(),
      top = _treeNodeElement$getB.top,
      bottom = _treeNodeElement$getB.bottom;

  var gap = TREE_NODE_GAP; // 处于节点下方

  if (clientY >= bottom - gap && clientY <= bottom) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  } // 处于节点上方


  if (clientY <= top + gap && clientY >= top) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }

  if (clientY >= top + gap && clientY <= bottom - gap) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER;
  }

  return -1;
}
export function removeDragNode(data, params, _ref) {
  var valueKey = _ref.valueKey,
      childrenKey = _ref.childrenKey;
  var dragNode = params.dragNode;

  var traverse = function traverse(items, parent) {
    for (var _index = 0; _index < items.length; _index += 1) {
      var item = items[_index];

      if (shallowEqual(item[valueKey], dragNode[valueKey])) {
        items.splice(_index, 1); // 当 children 为空，需要删除 children 属性，不显示角标

        if (items.length === 0 && parent) {
          delete parent.children;
        }

        break;
      }

      if (Array.isArray(item[childrenKey])) {
        traverse(item[childrenKey], item);
      }
    }
  };

  traverse(data);
}
/**
 * 移动节点valueKey，先删除 dragNode 原本所在的数据，再将 dragNode 移动到拖动的位置
 * @param data
 * @param params
 */

export function createUpdateTreeDataFunction(params, _ref2) {
  var valueKey = _ref2.valueKey,
      childrenKey = _ref2.childrenKey;
  return function (tree) {
    var data = [].concat(tree);
    var dragNode = params.dragNode,
        dropNode = params.dropNode,
        dropNodePosition = params.dropNodePosition;
    removeDragNode(data, params, {
      valueKey: valueKey,
      childrenKey: childrenKey
    });

    var updateTree = function updateTree(items) {
      for (var _index2 = 0; _index2 < items.length; _index2 += 1) {
        var item = items[_index2];

        if (shallowEqual(item[valueKey], dropNode[valueKey])) {
          // 拖拽到 dropNode内，作为 dropNode 的子节点
          if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
            item[childrenKey] = _isNil(item[childrenKey]) ? [] : item[childrenKey];
            item[childrenKey].push(dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // 拖拽到 dropNode 的上面
            items.splice(_index2, 0, dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // 拖拽到 dropNode 的下面
            items.splice(_index2 + 1, 0, dragNode);
            break;
          }
        }

        if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
          updateTree(item[childrenKey]);
        }
      }
    };

    updateTree(data);
    return [].concat(data);
  };
}
export function findNodeOfTree(data, check) {
  var findNode = function findNode(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    for (var i = 0; i < nodes.length; i += 1) {
      var item = nodes[i];

      if (_isArray(item.children)) {
        var _node = findNode(item.children);

        if (_node) {
          return _node;
        }
      }

      if (check(item)) {
        return item;
      }
    }

    return undefined;
  };

  return findNode(data);
}
export function filterNodesOfTree(data, check) {
  var findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    var nextNodes = [];

    for (var i = 0; i < nodes.length; i += 1) {
      if (_isArray(nodes[i].children)) {
        var nextChildren = findNodes(nodes[i].children);

        if (nextChildren.length) {
          var item = _clone(nodes[i]);

          item.children = nextChildren;
          nextNodes.push(item);
          continue;
        }
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }

    return nextNodes;
  };

  return findNodes(data);
}
/**
 * 根据是否处于搜索状态来返回 expand 的值。如果处于搜索状态下，则展开所有的节点
 * @param searchKeyword
 * @param expand
 */

export function getExpandWhenSearching(searchKeyword, expand) {
  return !_isEmpty(searchKeyword) ? true : expand;
}