/** 
 * 实现lodash，化简。
 * @Author: Dylan 
 * @Date: 2018-03-28 
 * @Desc:  jsDoc
 */
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
      res.push(ary.slice(i, i + size));
    }
    return res;
  },
  compact: function (ary) {
    let res = [];
    for (let i of ary) {
      if (i) {
        res.push(i);
      }
    }
    return res;
  },
  concat: function (ary, ...vv) {
    return ary.concat(...vv);
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
  //TODO:
  differenceBy: function (ary1, ary2, something) {
    //这个没看懂什么意思,用2比较1去重，数组里每一项分别执行something，如果s不是字符串，执行_.property
  },
  drop: function (ary, n = 1) {
    let res = ary;
    res.splice(0, n);
    return res;
  },
  dropRight: function (ary, n = 1) {
    let res = ary;
    res.splice(ary.length - n < 0 ? 0 : ary.length - n, n);
    //直接return就不行？？？
    return res;
  },
  fill: function (ary, some, start = 0, end = ary.length) {
    for (let i = 0; i < end - start; i++) {
      ary.splice(start + i, 1, some);
    }
    return ary;
  },
  /**
   * [flatten description]
   * @param  {Array} 
   * @return {Array}
   * @description 数组展开一层
   */
  flatten: function (ary) {
    var res = []
    for (let i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        for (let j = 0; j < ary[i].length; j++) {
          res.push(ary[i][j])
        }
      } else {
        res.push(ary[i])
      }
    }
    return res
  },
  //还可以用上splice
  flattenByReduce: function (ary) {
    return ary.reduce((res, val) => {
      if (Array.isArray(val)) {
        val.forEach(item => {
          res.push(item)
        })
      } else {
        res.push(val)
      }
      return res
    }, [])
  },
  flattenByConcat: function (ary) {
    return [].concat(...ary)
  },
  /**
   * [flattenDeep description]
   * @param  {Array} 
   * @return {Array}
   * @description 彻底展开成一维数组
   */
  flattenDeep: function (ary) {
    return ary.reduce((res, val) => {
      if (Array.isArray(val)) {
        BluesVN.flattenDeep(val).forEach(item => {
          res.push(item)
        })
      } else {
        res.push(val)
      }
      return res
    }, [])
  },
  /**
 * [flattenDepth description]
 * @param  {Array} 
 * @param  {[num=1]} 
 * @return {Array}
 * @description 数组展平到任意次,还可以用for循环来写。
 */
  flattenDepth: function (ary, depth = 1) {
    if (depth === 0) {
      //return ary.slice(0)  //浅复制一份
      //return Array.from(ary)
      return [...ary]
    }
    return ary.reduce((res, val) => {
      if (Array.isArray(val)) {
        BluesVN.flattenDepth(val, depth - 1).forEach(item => {
          res.push(item)
        })
      } else {
        res.push(val)
      }
      return res
    }, [])
  },
  /**
* [bind description]
* @param  {function}  fn被绑定参数
* @param  {this}      this指针 这里为null没用到
* @param  {num}       ...fixedArgs 绑定的各项参数
* @return {function}  返回被bind的函数
* @description lodash 的bind 带插空功能，用_下划线跳过参数。这里可以选用 window 代替跳过符。
*/
  bind: function (f, thisVal, ...fixedArgs) {
    return function (...args) {
      var argList = []
      var i = 0
      fixedArgs.forEach(item => {
        if (item === window) {
          argList.push(args[i++])//先传值 后加一
        } else {
          argList.push(item)
        }
      })
      //如果后来传的这组参数（...args）还有剩余的，再把它们拼接到argList后面去。
      argList.splice(argList.length, 0, ...args.slice(i))
      return fn(...argList)
      //return fn(...fixedArgs, ...args)//如果不插空的话就这样返回，插空的话把参数们处理好再返回。
    }
  },
  range: function (start, end, step = 1) {
    if (end == 0) {
      return [];
    }
    if (arguments.length == 1) {
      if (start < 0) {
        end = start;
        start = 0;
        var res = [];
        for (var i = start; i > end; i -= step) {
          res.push(i);
        }
        return res;
      }
      if (start > 0) {
        end = start;
        start = 0;
      }
    }
    var res = [];
    if (step < 1) {
      if (end > 0) {
        for (var i = start, j = start; j < end; i += step) {
          res.push(i);
          j++;
        }
      }
      if (end < 0) {
        for (var i = start, j = start; j > end; i += step) {
          res.push(i);
          j--;
        }
      }
    } else {
      for (var i = start; i < end; i += step) {
        res.push(i);
      }
    }
    return res;
  },
  sum: function (ary) {
    var l = ary.length;
    var s = 0;
    for (let i = 0; i < l; i++) {
      s += ary[i];
    }
    return s;
  },
  reverse: function (ary) {
    var l = (ary.length / 2) | 0;
    for (var i = 0; i < l; i++) {
      var end = ary.length - i - 1;
      var t = ary[i];
      ary[i] = ary[end];
      ary[end] = t;
    }
    return ary;
  },
  /**
   * [isEqual description]
   * @param  {*} a
   * @param  {*} b
   * @return {boolean}
   * @description 深度对比 ab是否相等
   */
  isEqual: function (a, b) {
    //深度对比
    if (a === b) {
      return true;
    }
    if (a !== a && b !== b) {
      //NaN
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (!this.isEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (Array.isArray(a) ^ Array.isArray(b)) {
      //数组也是对象  1 ^ 0 = 1
      return false;
    }
    if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
      for (key in a) {
        //对象数组可以嵌套 用！==比较不彻底 递归继续比较，比较环状对象会爆栈。
        if (!this.isEqual(a[key], b[key])) {
          return false;
        }
        if (!this.isEqual(b[key], a[key])) {
          return false;
        }
      }
      return true;
    }
    return false;
  },
  identity: function (val) {
    return val;
  },
  /**
 * @param {(Array|Object)}  collection
 * @param {(Function)}      [action=_.identity]
 * @returns {(*)}          collection
 * forEach 遇到false时候可以就地停止
 */
  forEach: function (collection, action = BluesVN.identity) {
    if (Array.isArray(collection)) {
      for (key of collection) {
        if (action(key) === false) {
          break
        }
      }
    } else {
      for (key in collection) {
        action(key);
      }
    }
    return collection
  },
  /**
   * @param {object}
   * @returns {function}
   * 深度对比  这里source 是源
   * 
这里下划线代表lodash 跳过一个参数，
相当于isMatch第二个参数固定为source。拿source里的每一项去 填入对象里对比。
    function matches(source) {
      return _.bind(isMatch, null, _, source)
    }
 */
  matches: function (source) {
    return function (obj) {
      for (var prop in source) {
        if (!BluesVN.isEqual(source[prop], obj[prop])) {
          return false
        }
      }
      return true
    }
  },
  matches: function (source) {
    return BluesVN.bind(isMatch, null, window, source)
  },
  /**[isMatch description]
 * @param {object}  source
 * @param {object}  obj
 * @returns {Boolean}
 * 部分深度对比  ,这里obj是源
 * 看source里的每一项是不是在obj里，obj 包含source也返回true。
 */
  isMatch: function (obj, source) {
    for (var prop in source) {
      if (!BluesVN.isEqual(obj[prop], source[prop])) {
        return false
      }
    }
    return true
  },
  /**
 * @param {function}  f
 * @param {number}  [n = f.length]
 * @returns {function}
 * 
 */
  ary: function (f, n = f.length) {
    return function (...args) {
      if (n < args.length) {
        args.length = n
      }
      return f(...args)
    }
  },
  keyBy: function (ary, c) {
    var res = {}
    ary.forEach(p => res[p[c]] = p)
    return res
  },
  groupBy: function (ary, predicate) {
    var res = {}
    ary.forEach((it, i) => {
      var key = predicate(it, i, ary)
      if (key in res) {
        res[key].push(it)
      } else {
        res[key] = [it]
      }
    }
    )
    return res
  },
  groupBy: function (ary, predicate) {
    return ary.reduce((res, it) => {
      var key = predicate(it, ary)
      if (key in res) {
        res[key].push(it)
      } else {
        res[key] = [it]
      }
      return res
    }
      , {})
  },
  flip: function (func) {
    return function (...args) {
      return func(...args.reverse())
    }
  },
  //例子 flip(parseInt)(10,'25')
  // int=flip(parseInt)
  // int(10,'25')
  flip: (func) => (...args) => func(...args.reverse()),
  /**
 * [get description]
 * @param  {object}       obj
 * @param  {Array|string} path
 * @return {*}            [defaultValue]
 * @description Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
 * 例子：get(object, ['a', '0', 'b', 'c']);
 */
  get: function (obj, path) {
    for (let i = 0; i < path.length; i++) {
      obj = obj[path[i]]
      if (obj === undefined || obj === null) {
        return undefined
      }
    }
    return obj
  },
  //递归写法
  get: function (obj, path) {
    if (path.length === 0 || obj === undefined || obj === null) {
      return obj
    }
    return BluesVN.get(obj[path[0]], path.slice(1))
  },
  //Reduce写法
  get: function (obj, path) {
    return path.reduce(function (a, b) {
      return a[b]
    }, obj)
  },
  /**
 * [property description]
 * @param  {Array|string} path
 * @return {func}  
 * @description 返回一个函数，此函数获取给定对象经过path路径下的值
 */
  property: function (path) {
    return function (obj) {
      return get(obj, path)
    }
  },
  /**
* [negate description]
* @param  {function} predicate
* @return {function}  
* @description 新函数和原函数反着来，一般是用于返回布尔类型的函数。[1,2,3,4,5,6,7,8,9].filter(negate(isPrime));过滤非负数。
*/
  negate: function (predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  },
  /**
* [once description]
* @param  {function} func
* @return {function}  
* @description 创建一个仅能有效调用一次的函数
// debugger;oneRandom=once(Math.random)
// debugger;oneRandom()
// debugger;oneRandom()
//每次oneRandom的结果都一样。先入为主
*/
  once: function (func) {
    var called = false
    var firstInvokeResult
    return function f(...args) {
      if (!called) {
        called = true
        return firstInvokeResult = func.apply(f, args)
      } else {
        return firstInvokeResult
      }
    }
  },
  /**
* [spread description]
* @param  {function}  func
* @param  {number}    [start=0] 
* @return {function}  Returns the new function.
* @description        创建一个能调用func的函数，该函数可以创建函数和绑定参数。就像function.apply.
*/
  spread: function (func) {
    return function (ary) {
      //     return func(...ary)
      return func.apply(null, ary)
    }
  },
  spread: (func) => (ary) => func.apply(null, ary),
  /**
* [unary description]
* @param  {function}  f
* @return {function}   Returns the new capped function.
* @description        返回一个函数 只接收他的第一个参
// [1,2,3].map(parseInt);
// [1,2,3].map(unary(parseInt));
*/
  unary: function (f) {
    return function (arg) {
      return f(arg)
    }
  },


};
