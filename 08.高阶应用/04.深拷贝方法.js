/* 
深拷贝:复杂数据类型之间复制,不会出现引用问题 

一、通过JSON实现深拷贝:
1.把对象或者数组转成json字符串: JSON.stringify
var obj = {
    name:"张三",
    age:20
}
var str = JSON.stringify(obj)
2.把JSON转成数组或者对象
var obj2 = JSON.parse(str);

缺点：json在转换的过程中会丢失或者修改数据
函数，undefined，Symbol，map，set类型


二、通过递归实现深拷贝
1.复制一层对象 
2.复制一层对象或者是数组 
3.通过递归复制多次对象和数组
*/
function deepCopy(obj) {
  let obj2 = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
  for (let key in obj) {
    if (Object.hasOwn(obj, key)) {
      //判断是否是对象的自身属性
      if (typeof obj[key] === "object") {
        obj2[key] = deepCopy(obj[key])
      }else{
        obj2[key] = obj[key]
      }
    }
  }
  return obj2
}
