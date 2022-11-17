/* 
JS里的循环:
        1. for循环: 命令式,注重过程,不够抽象
        2. 声明式的循环: 注重结果


forEach循环：
1. 有些伪数组没有这个方法,数组一定有forEach方法

如果伪数组没有forEach方法,可以把伪数组转成数组:
方式一: [...伪数组元素] // 
方式二: Array.from("伪数组元素")

2. forEach不能被break 和 continue

3. forEach里的this执行window

实现一个forEach
Array.prototype.myforEach = function(cb){
        for(let i = 0; i < this.length; i++){
                cb(this[i],i,this)
        }
}
使用myforEach:
var arr = new Array("张三","李四","王五");
arr.myForEach((item,key,arr)=>{
    console.log(item,key,arr);
});








*/