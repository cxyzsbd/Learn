/*
reduce: 累加器 

total ： 上次的累计结果 
Value/item ：循环的键值/当前元素
key/index ： 循环的键名/索引
arr： 循环的数组对象
arr.reduce(fucntion(){},初始累加的值);

1.数字的累加 
var res = arr.reduce(function (total, item, key, arr) {
        return total + item;
    }, 0);

2.数组的累加
 var res = arr.reduce(function (total, item) {
        if (total.indexOf(item) === -1) {
            total.push(item);
        }
        return total;
    }, []);//初始值:收集不重复的内容



reduce循环实现统计次数:
    var res = arr.reduce(function (total, item) {
            if (!total[item]) {
                total[item] = 1;
            } else {
                total[item]++;
            }
            return total;
        }, {});



*/
