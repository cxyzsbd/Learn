
/* 
一、
ES规范:
导入:
方式一:直接导入模块 import  "./路径.js"
方式二:导入模块,接收变量 import 自定义变量 from "./路径.js"

导出:
1. export可以导出多个
第一种:有声明定义,需要用大括号包裹起来,可以导出多个变量
第二种:变量没有声明定义,直接定义不需要大括号
接收:import {和之前导出的变量名一致,变量2,变量3} from "./路径.js";

//单项导出,必须要解构
export const num = 100;
export function fn(){};



2. export default
注意一:不需要加大括号
注意二:export default 只能导出一个 

接收既有 export 又有 export defalut的内容:
import myastr,{num,mynum} from './a.js'


给变量起别名导出:
let a = 10;
let b = 20;
export {a as mya};
export {b as myb};

给变量起别名导入:
import {mya as myaa ,myb as mybb} from './a.js';

把导出的所有内容接收起别名:(混合导出,全部接收)
import * as myobj from './a.js';

let{mya,myb,default:mydefault} = myobj;
//default需要自定义名称接收


ESmodule 提供一个import函数:
var btns = document.querySelectorAll("button");
1.获取导出的结果通过then方法:每一个import函数都会提供一个then方法
        btns[0].onclick = function(){
            import("./a.js").then(res=>{
                console.log(res);
            })
        }


2.方式通过返回值获取结果
声明函数为异步函数 函数之前加上async修饰符
在 import 前加上await
btns[1].onclick = async function(){
  let res =  await import("./b.js");
  console.log(res);
}

二、
conmonJS规范导入与导出:
1.文件的导入导出
2.目录（文件夹）的导入导出
3.特殊目录的导入导出 node_modules
(导入导出,"./"一定需要加)

方式一 ： module.exports = {};

方式二 ： exports  (exports===module.exports);
exports 和 module.exports是一样的,但是只有改变module.exports才会影响导出的内容

1.导入： const 变量(接收)  = require("./路径.js");
2.导出： module.exports = {}
         exports.键名 = 键值；


小贴士:require()是同步加载模块的方法,所以无法用来加载ES6的模块;
当我们需要在CommonJS中加载ES模块时,需要通过import()方法来加载.


三、引入目录模块
当我们使用一个文件夹作为模块时,文件夹中必须有一个模块的主文件。
如果文件夹中含有package.json文件且文件中设置main属性,则main属性指定的文件会成为主文件

可以修改目录下的主入口文件；
     创建一个 package.json文件,然后修改package.json里的main配置项;.
     通过指令创建package.json文件(npm init -y)
     注意:上层目录不能有中文

四、Node_modules

如果我们加载的模块没有以./或../,node会先去当前目录下的node_modules下去寻找模块,
找到则使用,没找到则继续去上一层目录中寻找,以此类推,直到找到根目录下的node_modules为止.

node_modules 一般会存放下载的第三方模块
直接引入 node_modules里的模块名称;

node_modules 可以自动向上查找 ；
通过node_modules来引入模块,会先在同级目录查找node_modules,如果没有会向上层查找,直到找到系统的根目录



*/

