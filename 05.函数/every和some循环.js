/* 
一、every循环
结果值如果全部是true,那么最终结果是true,只要有一个false结果值就是false,类似 且（&&）关系
只要确定了最终结果,那么循环就会停止了.

实现一个every:
function myEvery(cb,arr){
    let flag = true;//假定最终结果为true
    for(let i = 0; i < arr.length; i++){
        flag = flag && cb(arr[i],i,arr);
        if(!flag){
            break
        }
    }
    return flag;
} 

二、some循环
所有结果是false的时候,才是false.要有一个true,那么结果就是true.

实现一个sonme:
function mySome(cb,arr){
    let flag = false;//假定最终结果是false
    for(let i = 0; i < arr.length; i++){
        flag = flag || cb(arr[i],i,arr);
        if(flag){
            break
        }
    }
     return flag;
}

*/