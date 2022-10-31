## ECMAScript 6基础

## 一、ES5相关

### JSON 方法

- `json` 是一种特殊的字符串个是，本质是一个字符串

  ```javascript
  var jsonObj = '{ "name": "Jack", "age": 18, "gender": "男" }'
  var jsonArr = '[{ "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }]'
  ```

- 就是对象内部的 `key` 和 `value` 都用双引号包裹的字符串（必须是双引号）



### JSON的两个方法

- 我们有两个方法可以使用 **JSON.parse**
- `json.stringify` 是将 js 的对象或者数组转换成为 json 格式的字符串



### JSON.parse

- `JSON.parse`  是将 json 格式的字符串转换为 js 的对象或者数组

  ```javascript
  var jsonObj = '{ "name": "Jack", "age": 18, "gender": "男" }'
  var jsonArr = '[{ "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }, { "name": "Jack", "age": 18, "gender": "男" }]'
  
  var obj = JSON.parse(jsonStr)
  var arr = JSON.parse(jsonArr)
  
  console.log(obj)
  console.log(arr)
  ```

  - `obj` 就是我们 js 的对象
  - `arr` 就是我们 js 的数组



### JSON.stringify

- `JSON.parse`  是将 json 格式的字符串转换为 js 的对象或者数组

  ```javascript
  var obj = {
    name: 'Jack',
    age: 18,
    gender: '男'
  }
  var arr = [
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    },
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    },
    {
      name: 'Jack',
      age: 18,
      gender: '男'
    }
  ]
  
  var jsonObj = JSON.stringify(obj)
  var jsonArr = JSON.stringify(arr)
  
  console.log(jsonObj)
  console.log(jsonArr)
  ```

  - `jsonObj` 就是 json 格式的对象字符串
  - `jsonArr` 就是 json 格式的数组字符串





## 严格模式（了解）

- 我们都知道 js 是一个相对不很严谨的语言
- 而且开发的时候，一些代码也不是很严格要求
- 而严格模式就是对开发的时候写的一些内容做了要求



### 开启严格模式

- 想开启严格模式，直接在代码最开始的位置写上字符串 `use strict`

  ```html
  <script>
  	'use strict'
  	// 下面代码书写就要按照严格模式来书写
  </script>
  ```

### 严格模式的规则

1. 声明变量必须有 `var` 关键字

   ```javascript
   'use strtic'
   
   var num = 100
   num2 = 200 // 这个就会报错
   ```

   - 之前了解过，在声明变量的时候，如果没有 var 关键字，那么按照作用域的规则会自动定义成全局变量
   - 严格模式下不可以，会报错

2. 函数的行参不可以重复

   ```javascript
   'use strtic'
   
   function fn(p1, p1) {} // 直接就会报错
   ```

   - 在非严格模式下，函数两个行参一样，是不会报错的，只不过就是相当于在函数内部只有一个变量了
   - 但是在严格模式下会报错

3. 声明式函数调用的时候函数内部没有 this

   ```javascript
   'use strtic'
   
   function fn() {
     console.log(this) // undefined
   }
   fn()
   ```

   - 本身，全局声明式函数在调用的时候，函数内部的 this 是指向 window 的
   - 在严格模式下，是没有 this 的



## 对象及存储器

### 3.1 创建对象原型

- Object.create();

  - 基本使用 

    - `Object.create(proto)`

    - ```
      Object.create(proto, propertiesObject)
      
      ```

  - proto:新创建对象的原型对象

  - `propertiesObject` 可选 :配置参数



-  创建一个空对象,原型为另外一个对象

  ```js
  Object.create({name:'张三',age:20})
  ```

- 创建空对象修改配置属性

  ```js
  var obj = Object.create(null,{
      myname:{
          value:"李四",
          configurable:true,
          enumerable:true
      }
  })
  
  ```
- 属性描述对象提供6个元属性。

  （1）value

  value是该属性的属性值，默认为undefined。

  （2）writable

  writable是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。

  （3）enumerable

  enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。

  （4）configurable

  configurable是一个布尔值，表示可配置性，默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。也就是说，configurable属性控制了属性描述对象的可写性。

  （5）get

  get是一个函数，表示该属性的取值函数（getter），默认为undefined。

  （6）set

  set是一个函数，表示该属性的存值函数（setter），默认为undefined。

​   


### 3.2  对象拦截

- Object.defineProperty() ：使用 Object.defineProperty函数可以为对象添加属性,或者修改现有属性。如果指定的属性名在对象中不存在,则执行添加操作:如果在对象中存在同名属性,则执行修改操作 

  - 创建一个对象

    ```js
    var newObj =  Object.defineProperty({},"myname",{
            value:"张三",
            configurable:false,
            enumerable:false,
            writable:true
        })
    console.log(newObj);
    ```

    

  - 修改一个对象

    ```js
    var obj = {
        myname:"张三"
    }
    
    Object.defineProperty(obj,"myname",{
        get:function(){
            return "李四"
        },
        set:function(newvalue){
            console.log(newvalue);
        }
    });
    console.log(obj);
    ```

  

- Object.defineProperties ()

  - 可以一次定义多个属性
Object.defineProperties(object,description)
object:对其添加或修改属性的对象,可以是本地对象或DOM对象
description:包含一个或多个描述符对象,每个描述符对象描述一个数据属性或访问器属性



## 三、ES5和ES6

- 我们所说的 ES5 和 ES6 其实就是在 js 语法的发展过程中的一个版本而已
- 比如我们使用的微信
  - 最早的版本是没有支付功能的
  - 随着时间的流逝，后来出现了一个版本，这个版本里面有支付功能了
- ECMAScript 就是 js 的语法
  - 以前的版本没有某些功能
  - 在 ES5 这个版本的时候增加了一些功能
  - 在 ES6 这个版本的时候增加了一些功能
- 因为浏览器是浏览器厂商生产的
  - ECMAScript 发布了新的功能以后，浏览器厂商需要让自己的浏览器支持这些功能
  - 这个过程是需要时间的
  - 所以到现在，基本上大部分浏览器都可以比较完善的支持了
  - 只不过有些浏览器还是不能全部支持
  - 这就出现了兼容性问题
  - 所以我们写代码的时候就要考虑哪些方法是 ES5 或者 ES6 的，看看是不是浏览器都支持



## ECMAScript

 1997年，ECMA发布262号标准文件（ECMA-262）第一版，规定了脚本语言的实现标准，并将这种标准命名为ECMAScript，这个就是ES1.0版本。ECMAScript是JavaScript语言的规范标准，JavaScript是ECMAScript的一种实现方式。在一些语境中是可以互换的。

## ECMAScript版本

- 1998年6月， ECMAScriysxbzx pt2.0版发布
- 1999年12月， ECMAScript3.0版发布，并成为 JavaScript的通用标准，获得广泛支持
- 2007年10月， ECMAScript4.0版草案发布，对3.0版做了大幅升级。由于4.0版的目标过于激进各方对于是否通过这个标准产生了严重分歧，2008年7月，ECMA中止ECMAScript4.0的开发，将其中涉及现有功能改善的一小部分发布为ECMAScript3.1.不久， ECMAScript3.1改名为 ECMAScript5
- 2009年12月， ECMAScrip5.0版正式发布
- 2011年6月， ECMAScript 5.1版发布
- 2013年12月， ECMAScrip6版草案发布
- 2015年6月， ECMAScript6发布正式版本，并更名为 ECMAScript2015. Mozilla在这个标准的基础上推出了 JavaScript2.0
- 从此以后， JavaScript开始以年份命名，新版本将按照“ ECMAScript+年份”的形式发布。目前最新正式版本为 ECMAScript2019,于2019年7月正式发布

> ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准
>
 ## ECMAScript 6 简介

 - JavaScript 三大组成部分
   - ECMAScript 
   - DOM
   - BOM 
 - ECMAScript 发展历史 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources
 - ECMAScript 包含内容：JS 中的数据类型及相关操作，流程控制，运算符及相关运算……

## ECMAScript 6 
- let 和 const
  - let 和 var 的差异
    - let 允许声明一个在作用域限制在块级中的变量、语句或者表达式
      - 块级作用域
    - var 声明的变量只能是全局或者整个函数块的
    - let 不能重复声明
    - let 不会被预解析（hoisting）
    - 临时死区（ temporal dead zone）
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let
  - const 常量
    - 常量不能重新赋值
    - 初始化的时候不能不被赋值
    - 不能重复声明
    - 块级作用域
    - const 不会被预解析
    - 定义对象 （和其他语言差别）
    ```js
    function deepFreeze(obj){
    Object.freeze(obj);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === "object"){
                deepFreeze(obj[key]);
            }
        }
    }
    }
    ```
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const

- 解构赋值
  - 对象的解构赋值
  - 数组的解构赋值
  - 字符串的解构赋值
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

- 展开运算符
  - 对象展开
  - 数组展开
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax

- 函数新增扩展
  - 箭头函数
    - 箭头函数的各种写法
    - 箭头函数的 this 问题
    - 箭头函数的不定参问题
    - 箭头函数不能用于构造函数
    - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  - rest 参数设置
  - 参数默认值设置

- 新增数组扩展
  - Array.from()、Array.of() 
  - find()、findIndex()、includes()
  - flat()、flatMap()
  - at()
  - fill(填充字符,【开始填充位置】，【结束填充的位置】)
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

- 新增字符串扩展
  - includes(), startsWith(), endsWith()
  - repeat()
  - padStart(),padEnd() ：根据数量自动前面或者后面补全字符串
  - 模版字符串   
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String

- 新增对象扩展
  - 属性简洁表示法
  - 属性名表达式
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

- Math及Number扩展

  - 取幂函数  ： `2**3`
  - 进制转换  
    - 二进制 `0b`开头
    - 八进制 `0o`  ES5 是 0开头
    - 十进制：直接写
    - 十六进制 `0x`前缀
  - Math新增方法
    - Math.trunc() :去掉数字的小数部分，只保留整数部分
    - Math.sign(): 判断一个数是正数还是负数
    - Math.sqrt():平方根
    - Math.cbrt(): 立方根
    - Math.hypot():求所有参数平方和的平方根
  - Number 方法
    - Number.isFinite（） ：判断是否是有限的值
    - Number.isNaN() : 判断是否是NaN
    - Number.isInteger():判断是否是整数
    - Number.parseInt(str): 将字符串转换成对应的数值

- 对象的扩展

  - Object.is ：判断2个对象是否相等，修复 NaN不等于NaN的bug
  - Object.assign（target,obj1,obj2） :合并多个对象
  - Object.freeze() 方法可以**冻结**一个对象。
  - Object.hasOwn 在过去我们判断某个字符串变量是否是对象的自有属性时，通常使用 `Object` 对象原型链上的 `hasOwnProperty` 方法来判断,但是 JavaScript 普通对象的原型可以被覆盖
  - `Object.seal()`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置（不可被删除）。当前属性的值只要原来是可写的就可以改变。 

- Set 对象    

  - Set 对象的数据结构
  - Set 相关属性与方法
    - size 属性
    - clear()、delete()、has()、add()  、keys()、values();  
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

- Map 对象
  - Map 对象的数据结构
  - Map 相关属性与方法
  - size 属性
  - clear()、delete()、get()、has()、set()
  - 手册地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

- 新增数据类型

  - Symbol类型
    - ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型
  - bigInt类型
    - JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回`Infinity`。
    - 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示 

- 可选链式操作符

  - ```js
    let o = null;
    console.log( o?.name?.age);
    ```

- 空合并操作符

  - ` let str = '' ?? 'hello'`;

- iterator ：迭代器

  - ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数
  - iterator遍历过程
    - 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
    - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
    - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
    - 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
    - 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

- entries、keys 、values介绍

- babel 使用

  - Babel 是一个 JavaScript 编译器
  - 手册地址：https://www.babeljs.cn/
  - Babel 基本是否方法





