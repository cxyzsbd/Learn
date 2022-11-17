/* 

Map循环:可以循环且得到结果值
Map:映射,复制一份,返回一个新的数组,不影响原数组

实现一个Map:

 function myMap(cb, arr) {
            var resArr = [];
            for (var i = 0; i < arr.length; i++) {
                var res = cb(arr[i], i, arr);
                resArr.push(res);
            }

            return resArr;
        }
使用myMap:
var arr = ["1", "2", "3", "4"];
var newarr = mymap(function (item, key, arr) {
            console.log(item, key, arr);
            return item;
        }, arr);



*/
