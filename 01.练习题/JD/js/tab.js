// 把选项卡的逻辑 封装起来 

// 定义一个 选项卡构造函数 
function Tab(btns,eles){
    this.btns = btns;
    this.eles = eles;
    this.addBtnEvent();
}

// 给按钮绑定事件 
Tab.prototype.addBtnEvent = function(){
    var that = this;
    this.btns.forEach(function(btn,key){
        btn.onclick = function(){
            // 修改 按钮的样式 
            // 去掉按钮的所有样式 
            that.btns.forEach(function(val){ 
                val.classList.remove("active");
            })
            this.classList.add("active");
            that.switchTab(key);
        }
    })
}

Tab.prototype.switchTab = function(key){
    this.eles.forEach(function(ele,k){
        if(k==key){
            ele.style.display = "block";
        }else{
            ele.style.display = "none"; 
        }
    })
}


