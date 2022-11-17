/* 

一、构造函数的继承
父类 ：父级构造函数
function Dad(height) {
    this.money = "$10000000000";
    this.house = "一栋别墅";
    this.car = "大牛车一辆";
    this.height = height;
    // this.hobby = function(){
    // console.log("喜欢篮球"); 占用内存空间,错误写法
    }
} 

Dad.prototype.hobby = function(){
    console.log("喜欢篮球"); 挂载在原型链上,正确写法
}

Son类继承 Dad类 
ES5 通过改变子类的this 到父类中去实现构造函数的继承
1.call 
2.apply
3 bind;


   function Son(name,height) {
            // Dad.call(this,height);  // 把子构造函数的this 改到父构造函数里
            Dad.apply(this,[height]);
            // Dad.bind(this)(height);
            this.name = name;
        }

        var zhangsan = new Son("张三","178cm");
        // zhangsan.hobby();

二、原型的继承
直接把父类的原型赋值给子类的原型；
Son.prototype = Dad.prototype;  // 可以实现,但造成引用问题 

组合继承:
  function Link(){};
  Link.prototype = Dad.prototype;
  Son.prototype = new Link();
  

在原型上写方法会覆盖对象:
 prototype = {
fn:function(){},
fn2:function(){}
}
Person.prototype.constructor = Person;  //需要人为修改,constructor重新指回Person构造函数

追加对象属性不会覆盖对象:正确写法
 prototype.fn = function(){
     console.log("fn")
 }


*/
