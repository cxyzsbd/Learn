// console.log(document.querySelector(".outer"));
// 一、渲染手机的详细信息
// console.log(goodData);
var priceAreaEle = document.querySelector(".priceArea")
function renderDetail(detailData) {
    priceAreaEle.innerHTML = "";
    priceAreaEle.innerHTML = `<h3 class="title">${detailData.title}</h3>
    <p class="con1">${detailData.recommend}</p>
    <div class="price">
        <div class="priceDetail">
            <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>
            <p>￥ <span>${detailData.price}</span> 元</p>
        </div>
        <div class="buy">
            <p>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</p>
            <p><span>${detailData.promoteSales.type}</span>${detailData.promoteSales.content}</p>
        </div>
    </div>
    <div class="support">
        <div class="supportDetail">
            <p>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</p>
            <p>${detailData.support}</p>
        </div>
        <div class="address">
            <p>配&nbsp;送&nbsp;至</p>
            <p>${detailData.address}</p>
        </div>
    </div>`;
}

renderDetail(goodData.goodsDetail)



// 二、渲染手机规格 

// 获取规格需要存放的容器 
var chooseAreaEle = document.querySelector(".chooseArea");
function renderPhoneType(data) {
    // 先把存放规格的容器清空
    chooseAreaEle.innerHTML = "";
    data.forEach(function (item) {
        // 创建dl元素
        var dlEle = document.createElement("dl");
        var dtEle = document.createElement("dt");
        dtEle.innerHTML = item.title;
        dlEle.appendChild(dtEle);
        item.data.forEach(function (val) {
            var ddEle = document.createElement("dd");
            ddEle.innerHTML = val.type;
            dlEle.appendChild(ddEle);
        })
        console.log(dlEle);
        chooseAreaEle.appendChild(dlEle);
    })
}

renderPhoneType(goodData.goodsDetail.crumbData);


// 选中 规格按钮 会高亮 ；

// 先获取 内容 ，然后再绑定事件

var dlEles = chooseAreaEle.querySelectorAll("dl");  // 获取每一行的元素；
// 通过数据 显示选中的规格视图 ；
var chooseInsertEle = document.querySelector(".chooseInsert");
var numInput = document.querySelector(".num input");
var arr = [];//  存放 选择的 行元素；
// console.log(dlEles);
// 循环 每一行元素 ， 在每一行元素里获取 dd
dlEles.forEach(function (dlEle, k) {
    // 在每一个dl里获取 dd 元素
    var ddEles = dlEle.querySelectorAll("dd");

    // 初始化数组里的内容  ，初始化选择规格 ；
    dlEle.chioseType = ddEles[0].innerHTML;  // 把 每一行元素里添加 第一个dd的内容
    dlEle.k = k;  // 初始化的时候 记录 所在行数的索引值；
    dlEle.kk = 0;  // 初始化的列 都是 0；
    if (arr.indexOf(dlEle) == -1) {
        arr.push(dlEle);
    }
    ddEles.forEach(function (ddEle, kk) {
        ddEle.onclick = function () {
            // console.log("点击了dd按钮");
            // 把当前行 里的所有 dd 的颜色变成灰色 
            ddEles.forEach(function (item) {
                item.style.color = "#666";
            })
            // 把当前点击的dd 字体的颜色改成红颜色；
            this.style.color = "red";

            // 当点击dd的时候 给 dlEle 元素 绑定属性 
            dlEle.chioseType = this.innerHTML;  // 记录 选择的规格内容
            dlEle.k = k;  // 记录 当前元素 所在之前 行数的索引 
            dlEle.kk = kk; // 记录点击时候的列数 
            if (arr.indexOf(dlEle) == -1) {
                arr.push(dlEle);
            }

            console.log(arr);
            renderShowType(arr);
            countPrice();

        }
    })
})
renderShowType(arr);




// 渲染选择的规格  ；
function renderShowType(arr) {
    var price = 5000;
    chooseInsertEle.innerHTML = "";
    arr.forEach(function (item, key) {
        var markEle = document.createElement("mark");
        markEle.innerHTML = item.chioseType;
        var aEle = document.createElement("a");
        aEle.innerHTML = "X";
        markEle.appendChild(aEle);
        chooseInsertEle.appendChild(markEle);


        // 定位到每一行的 changePrice  然后 用初始化的 price 来加价钱或者是减价钱
        price += goodData.goodsDetail.crumbData[item.k].data[item.kk].changePrice;

        // 把规格的删除按钮绑定事件 
        aEle.onclick = function () {
            console.log("点击的下标", key);
            var res = arr.splice(key, 1);
            // console.log(res);
            var k = res[0].k;  // 删除元素 之前所在的行的索引值
            // 把这一行的 样式去掉 ；
            // 去掉这一行里 所有dd的样式 ；
            dlEles[k].querySelectorAll("dd").forEach(function (val) {
                val.style.color = "#666";
            })
            renderShowType(arr);
        }
    })

    console.log(price);  // 通过规格 计算出单个手机的价格 ；

    // 在把单个手机的价钱乘以数量 
    // 获取 手机的数量 
    price *= numInput.value;
    console.log(price);


    // 最终把价钱 填充到  价钱的显示 区域里
    document.querySelector(".priceDetail span").innerHTML = price;

    // 优惠搭配 的手机价钱也需要改变 
    document.querySelector(".master p").innerHTML = `￥${price}`;

}


// 实现 手机数量的 加 或者  减操作 

var plusEle = document.querySelector(".plus");

// 点击 添加 手机数量 
plusEle.onclick = function () {
    numInput.value++;
    renderShowType(arr) // 重新渲染视图 ，重新计算价钱
    countPrice();
}

// 点击减少手机数量
var minsEle = document.querySelector(".mins");
minsEle.onclick = function () {
    if (numInput.value > 1) {
        numInput.value--;
        renderShowType(arr)  // 重新渲染视图 ，重新计算价钱
        countPrice();
    }
}







// 计算 手机 和 组合搭配的价钱 
var checkBoxEles = document.querySelectorAll(".suits li input");
function countPrice() {

    console.log(123);
    var price = document.querySelector(".master p").innerHTML;
    //  console.log(price);
    price = parseInt(price.substring(1));
    //    console.log(price);
    // 获取所有的 checkBox 按钮 
    console.log(checkBoxEles);
    checkBoxEles.forEach(function (item) {
        if (item.checked) {
            // 勾选了 checkbox，需要计算价钱 
            price += parseInt(item.value);
        }
    })

    console.log("组合搭配的价钱:", price);

    document.querySelector(".result .price").innerHTML = `￥${price}`;
}

checkBoxEles.forEach(function (item) {
    item.onclick = function () {
        console.log("点击了");
        countPrice();
    }
})






countPrice();





//根据数据 渲染 顶部的路径  

function renderPath(pathData) {
    var arr = pathData.map(function (item) {
        return `<a href="${item.url}">${item.title}</a>`;
    })
    // console.log(arr);
    var pathstr = arr.join("");
    console.log(pathstr);
    document.querySelector(".conPoint").innerHTML = pathstr;
}


renderPath(goodData.path);




// -----------------------------放大镜相关功能-------------------------


// 根据数据 渲染 放大镜的图像 ；

// 渲染放大镜小图的列表
// 渲染 中图 和 大图； 

function renderImg(imgsrc) {
    // 清空list里的内容

    // 渲染 放大镜图像的列表 
    var listEle = document.querySelector(".list")
    listEle.innerHTML = "";
    imgsrc.forEach(function (item) {
        var liEle = document.createElement("li");
        liEle.innerHTML = `<img src="${item.s}" />`;
        listEle.appendChild(liEle);
    })

    // 渲染 中图 和 放大图像 ；
    // 默认初始化的时候 用第一条数据渲染 中图 ；
    var smallAreaImgEle = document.querySelector(".smallArea img");
    smallAreaImgEle.src = imgsrc[0].s;
    // 默认初始化的时候 用第一条的大图 渲染 大图 
    var bigAraeImgEle = document.querySelector(".bigArea img");
    bigAraeImgEle.src = imgsrc[0].b;

}

renderImg(goodData.imgsrc);



// 鼠标移入的时候 显示 遮罩层  和 放大区域 
var smallAreaEle = document.querySelector(".smallArea");
var maskEle = document.querySelector(".mask");
var bigAreaEle = document.querySelector(".bigArea");
smallAreaEle.onmouseenter = function () {
    maskEle.style.display = "block";
    bigAreaEle.style.display = "block";
}
// 鼠标离开的时候 隐藏放大区域 和遮罩层 ；
smallAreaEle.onmouseleave = function () {
    maskEle.style.display = "none";
    bigAreaEle.style.display = "none";
}



// 设置遮罩层  跟随在鼠标中间移动 ；
smallAreaEle.onmousemove = function (e) {
    // var x  = e.clientX - this.offsetLeft;
    // var y = e.clientY  - 243;

    // 方式一： 获取 鼠标 还有 smallArae 相对于 页面的距离
    // var x = e.pageX - 1;
    // var y = e.pageY - 243;

    // 方式二： 获取 鼠标  还有 smallArae 相对于 视口（浏览器的距离）
    //    console.log(  this.getBoundingClientRect());

    var x = e.clientX - this.getBoundingClientRect().left;
    var y = e.clientY - this.getBoundingClientRect().top;

    var disx = x - maskEle.offsetWidth / 2;
    var disy = y - maskEle.offsetHeight / 2;

    // 左边的距离边界
    if (disx <= 0) {
        disx = 0;
    }

    // 右边的边界 

    if (disx >= (this.clientWidth - maskEle.offsetWidth)) {
        disx = this.clientWidth - maskEle.offsetWidth;
    }

    // 上边的边界  
    if (disy <= 0) {
        disy = 0;
    }

    // 下边的边界 
    if (disy >= (this.clientHeight - maskEle.offsetHeight)) {
        disy = this.clientHeight - maskEle.offsetHeight;
    }

    // 大图 也要放大移动 ；
    // disx/ smallArae.clientWidth = ? /图片的宽度 
    //偏移的值 = (disx/ smallArae.clientWidth )* 图片的宽度 

    var imgEle = bigAreaEle.querySelector("img")
    var xx = imgEle.offsetWidth * (disx / smallAreaEle.clientWidth);
    var yy = imgEle.offsetHeight * (disy / smallAreaEle.clientHeight);

    // 设置 图片 的相对定位 的left值 ；
    imgEle.style.left = "-" + xx + "px";
    imgEle.style.top = "-" + yy + "px";


    maskEle.style.left = disx + "px";
    maskEle.style.top = disy + "px";

}





// 小图列表的切换效果 

// 获取 list 列表里的所有 img 图；
var imgEles = document.querySelectorAll(".list img");
imgEles.forEach(function (imgEle, key) {
    imgEle.onmouseenter = function () {
        // console.log("鼠标移入了");
        // 1.改变当前 图片的样式 ，加个红色的边框 ；
        // 去掉其他的 图片的边框颜色
        imgEles.forEach(function (img) {
            img.style.border = "1px solid #ccc";
        })
        this.style.border = "1px solid red";

        // 2.把显示的图像 和 放大的图像 都需要替换掉；
        // console.log(key);
        // 在数据里查找 图片的路径地址 ；
        console.log(goodData.imgsrc[key]);
        //    替换 中图显示区域的图片地址
        smallAreaEle.querySelector("img").src = goodData.imgsrc[key].s;
        // 替换大图的图片地址 ；
        bigAreaEle.querySelector("img").src = goodData.imgsrc[key].b;

    }
})





// 点击上一个 下一个的时候 切换 list的移动 ；

// 点击下一个 移动 list的位置 

var rightEle = document.querySelector(".right");
var listEle = document.querySelector(".list");

// 下一页 
var flag = true;
rightEle.onclick = function () {
    if (flag) {
        flag = false;
        // 获取list 的left的值 ，在这个值的基础上 加上一个距离
        var leftNum = parseInt(getComputedStyle(listEle, null)['left']);
        console.log(leftNum);

        if (leftNum > -(imgEles.length - 6) * 76) {
            leftNum -= 76;
            // console.log(leftNum);
            listEle.style.left = `${leftNum}px`;
        }
        listEle.addEventListener("transitionend", function () {
            flag = true;
        })
    }



}


// 点击上一个 切换 list 元素的left值 ；

var leftEle = document.querySelector(".left");
var flag2 = true;

leftEle.onclick = function () {
    if (flag2) {
        flag2 = false;
        var leftNum = parseInt(getComputedStyle(listEle, null)['left']);
        if (leftNum < 0) {
            leftNum += 76;
            // console.log(leftNum);
            listEle.style.left = `${leftNum}px`;
        }
        listEle.addEventListener("transitionend",function(){
            console.log("over");
            flag2 = true;
        })
        
    }


}



// 两个选项卡 
// 第一个  切换分类 和 品牌的选项卡 

var  h4Eles= document.querySelectorAll(".tabTitle h4");

var  tabplanEles = document.querySelectorAll(".tabContent .tab-pane")
new Tab(h4Eles,tabplanEles);

// h4Eles.forEach(function(item,key){
//     item.onclick = function(){
//         console.log("点击了切换按钮")
//         // 1.改变按钮的样式 
//         // 把其他按钮的 active 样式去掉 
//         h4Eles.forEach(function(val){
//             val.classList.remove("active");
//         })

//         // 把当前的按钮加上 active样式
//         this.classList.add("active");
//         // 切换底下的内容 
//         tabplanEles.forEach(function(tab,k){
//             if(k==key){
//                 tab.style.display = "block";
//             }else{
//                 tab.style.display = "none";
//             }
//         })
//     }
// })



// 第二个 选项卡  

// 获取选项卡按钮
var liEles = document.querySelectorAll(".tab-wraped li");
var tabItemEles = document.querySelectorAll(".tab-content .tab-pane");

new Tab(liEles,tabItemEles);
// liEles.forEach(function(item,key){
//     item.onclick = function(){
//         liEles.forEach(function(item){
//             item.classList.remove("active")
//         })
//         this.classList.add("active");
//         // 切换内容 
//         tabItemEles.forEach(function(val,k){
//             if(key==k){
//                 val.style.display = "block";
//             }else{
//                 val.style.display = "none";
//             }
//         })

//     }
// })