
//2018.3.28 Dylan ，试着写lodash，之后精简代码。
var BluesVN = {
    /**
     * 说明文档
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
    differenceBy: function (ary1, ary2, something) {
        //这个没看懂什么意思,用2比较1去重，数组里每一项分别执行something，如果s不是字符串，执行_.property
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
    flattenDeep:function(ary){
        //多维数组转成1维
    },
    x:function (){
        //随便写的
        return function bar(){
            console.log("今天是个好日子")
        }
    }()
}