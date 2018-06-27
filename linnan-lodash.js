//2018.3.28 Dylan ，试着写lodash，之后精简代码。
var BluesVN = {
	/**
	 * [chunk description]
	 * @param  {[type]} array [description]
	 * @param  {Number} size  [description]
	 * @return {[type]}       [description]
	 */
  chunk: function (ary, size = 1) {
    let res = [];
    for (let i = 0; i < ary.length; i += size) {
      res.push(ary.slice(i, i + size))
    }
    return res;
  },
  compact: function (ary) {
    let res = [];
    for (let i of ary) {
      if (i) {
        res.push(i)
      }
    }
    return res;
  },
  concat: function (ary, ...vv) {
    return ary.concat(...vv)
  },
  difference: function (ary1, ary2) {
    //这道题要求不改变原数组？？？
    let res = ary1;
    for (let i = 0; i < ary1.length; i++) {
      for (let j = 0; j < ary2.length; j++) {
        if (ary1[i] - ary2[j] == 0) {
          res.splice(i, 1, undefined);
        }
      }
    }
    return this.compact(res);
  },
  differenceBy: function (ary1, ary2, something) {//这个没看懂什么意思,用2比较1去重，数组里每一项分别执行something，如果s不是字符串，执行_.property
  },
  drop: function (ary, n = 1) {
    let res = ary;
    res.splice(0, n)
    return res;
  },
  dropRight: function (ary, n = 1) {
    let res = ary;
    res.splice((ary.length - n) < 0 ? 0 : ary.length - n, n);
    //直接return就不行？？？
    return res;
  },
  fill: function (ary, some, start = 0, end = ary.length) {
    for (let i = 0; i < end - start; i++) {
      ary.splice(start + i, 1, some)
    }
    return ary;
  },
  flatten: function (ary) {
    let res = [];
    //减少数组的一个层级
  },
  flattenDeep: function (ary) {//多维数组转成1维
  },
  range: function (start, end, step = 1) {
    if (end == 0) {
      return []
    }
    if (arguments.length == 1) {
      if (start < 0) {
        end = start
        start = 0
        var res = []
        for (var i = start; i > end; i -= step) {
          res.push(i)
        }
        return res
      }
      if (start > 0) {
        end = start
        start = 0
      }
    }
    var res = []
    if (step < 1) {
      if (end > 0) {
        for (var i = start, j = start; j < end; i += step) {
          res.push(i)
          j++
        }
      }
      if (end < 0) {
        for (var i = start, j = start; j > end; i += step) {
          res.push(i)
          j--
        }
      }

    } else {
      for (var i = start; i < end; i += step) {
        res.push(i)
      }
    }
    return res
  },
  sum: function (ary) {
    var l = ary.length
    var s = 0
    for (let i = 0; i < l; i++) {
      s += ary[i]
    }
    return s
  },
  reverse: function (ary) {
    var l = (ary.length / 2) | 0
    for (var i = 0; i < l; i++) {
      var end = ary.length - i - 1
      var t = ary[i]
      ary[i] = ary[end]
      ary[end] = t
    }
    return ary
  },
  isEqual: function (a, b) {
    //深度对比
    if (a === b) {
      return true
    }
    if (a !== a && b !== b) {//NaN
      return true
    }
    if (typeof a !== typeof b) {
      return false
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false
      }
      for (var i = 0; i < a.length; i++) {
        if (!this.isEqual(a[i], b[i])) {
          return false
        }
      }
      return true
    }
    if (Array.isArray(a) ^ Array.isArray(b)) {//数组也是对象  1 ^ 0 = 1
      return false
    }
    if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
      for (key in a) {
        //对象数组可以嵌套 用！==比较不彻底 递归继续比较，比较环状对象会爆栈。
        if (!this.isEqual(a[key], b[key])) {
          return false
        }
        if (!this.isEqual(b[key], a[key])) {
          return false
        }
      }
      return true
    }
    return false
  },
  identity: function (val) {
    return val
  },
  forEach: function (collection, action = BluesVN.identity) {
    if (Array.isArray(collection)) {
      for (key of collection) {
        action(key)
      }
    } else {
      for (key in collection) {
        action(key)
      }
    }
  }
}
