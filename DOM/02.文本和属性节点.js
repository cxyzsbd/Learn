
      /* 
在DOM中,网页中所有的文本内容都是文本节点对象,可以通过元素来获取其中的文本节点对象,但是我们通常不会这么做.
我们可以直接通过元素去修改其中的文本.
修改文本的三个属性:
                            element.textContent 获取或修改元素中的文本内容
                                - 获取的是标签中的内容,不会考虑css样式
                                - 会获取display：none中的文本

                            element.innerText 获取或修改元素中的文本内容
                                - innerText获取内容时,会考虑css样式
                                - 通过innerText去读取CSS样式,会触发网页的重排（计算CSS样式）
                                - 当字符串中有标签时,会自动对标签进行转义
                                - <li> --> &lt;li&gt;

                            element.innerHTML 获取或修改元素中的html代码
                                - 可以直接向元素中添加html代码
                                - innerHTML插入内容时,有被xss注入的风险


 属性节点（Attr）
                    - 在DOM也是一个对象,通常不需要获取对象而是直接通过元素即可完成对其的各种操作
                    - 如何操作属性节点：
                        方式一：
                            读取：元素.属性名（注意,class属性需要使用className来读取）
                                  读取一个布尔值时,会返回true或false

                            修改：元素.属性名 = 属性值

                        方式二：
                            读取：元素.getAttribute(属性名)

                            修改：元素.setAttribute(属性名, 属性值)

                            删除：元素.removeAttribute(属性名)


 
获取隐藏文本的兼容
低版本    box.innerText
高版本    box.textContent,不支持undefined

var box = document.getElementById("box");
function fun(obj, val) {
  // 获取
  if (arguments.length == 1) {
    //if判断会自动隐式类型转换，转换布尔类型
    var result = obj.textContent ? obj.textContent : obj.innerText;
    return result;
  } else if (arguments.length == 2) {
    obj.textContent ? (obj.textContent = val) : (obj.innerText = val);
  }
}

      fun(box, "获取到");
