// 1. 如果自定义的函数名称与内置的函数名称一致，则以自定义的为准

// 1.1 声明构造函数
function Promise(executor) {

  // 1.4 声明状态和结果
  this.promiseState = 'pending'
  this.promiseResult = undefined
  // 1.5 存储异步修改状态的回调对象 - 数组
  this.callbacks = []

  // 1.2 声明成功的回调
  const success = val => {
      // 只要不是 pending 状态，则证明状态修改了
      if (this.promiseState !== 'pending') return

      // 1.2.1 修改状态和参数
      this.promiseState = 'fulfilled'
      this.promiseResult = val

      // 如果异步的状态修改了
      if (this.callbacks.length > 0) {
          this.callbacks.forEach(item => {
              item.ok(val)
          })
      }
  }

  // 1.3 声明失败的回调
  const error = err => {
      // 只要不是 pending 状态，则证明状态修改了
      if (this.promiseState !== 'pending') return

      // 1.3.1 修改状态和参数
      this.promiseState = 'rejected'
      this.promiseResult = err

      // 如果异步的状态修改了
      if (this.callbacks.length > 0) {
          this.callbacks.forEach(item => {
              item.ng(err)
          })
      }
  }

  // 执行回调函数 executor [ɪgˈzekjətə(r)]
  // executor(成功，失败)
  try {
      executor(success, error)
  } catch (e) {
      // 执行失败的回调
      error(e)
  }
}

// 2. 设计原型的方法
Promise.prototype.then = function (onFulfilled, onRejected) {
  // then 方法不管什么情况，都会返回一个 promise 实例
  return new Promise((resolve, reject) => {

      // 封装处理返回值的操作
      const handler = fnType => {
          try {
              const result = fnType(this.promiseResult)
              // 判断返回值是否为Promise创建的实例
              if (result instanceof Promise) {
                  // 用返回值的then方法处理成功或者失败
                  result.then(data => resolve(data), err => reject(err))
              } else {
                  // 如果是普通数据，那么直接成功
                  resolve(result)
              }
          } catch (e) {
              reject(e.message)
          }
      }

      // then 提前处理了错误，再调用catch会报错
      if (onFulfilled === undefined) {
          onFulfilled = v => v;
      }

      // 缺省一个处理失败的函数那么就得补充一个
      if (onRejected === undefined) {
          onRejected = () => { throw new Error(this.promiseResult) }
      }

      if (this.promiseState === 'pending') {
          // 在存储的时候，应该存储两份
          this.callbacks.push({
              ok() {
                  handler(onFulfilled)
              },
              ng() {
                  handler(onRejected)
              }
          })
      }

      if (this.promiseState === 'fulfilled') {
          handler(onFulfilled)
      }

      if (this.promiseState === 'rejected') {
          handler(onRejected)
      }

  })

}

// 原型上挂载 catch 方法
Promise.prototype.catch = function (onRejected) {
  // 其实在调用then
  return this.then(undefined, onRejected)
}


//封装静态方法
Promise.resolve = function (val){
  return new Promise((resolve,reject)=>{
    if(val instanceof Promise){
      val.then(resolve,reject)
    }else resolve(val)
  })
}

Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  })
}