/* 
filter循环:过滤,筛选数据,支持链式操作

可以接收返还值,回调函数如果返还true ,那么就收集当前的内容

实现一个filter：

Array.prototype.myFilter = function(cb){
        let resArr = []
    for(let i = 0; i < this.length; i++){
        if(cb(this[i],i,this)){
             resArr.push(this[i])
        }
    }
    return resArr;
}

  var res = arr.myFilter((item, key, arr)=> {
            return item > 3;
        })
        console.log(res);


*/