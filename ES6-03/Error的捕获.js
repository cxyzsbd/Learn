// 1. 语法错误不能捕获
try {
    // var1 num = 10;
    console.log(num);
    let num = 10
} catch(e) {
    console.log(e);
}

// 2. 有可能报错
function fn() {
  const num = Math.floor(Math.random() * 30 + 5);
  // console.log(num);
  if (num % 2 === 0) {
    console.log("ok");
  } else {
    throw new RangeError("不能给奇数");
  }
}

// 3. 定时器
try {
  setTimeout(() => {
    throw new Error("报错");
  }, 2000);
} catch (e) {
  console.log(e);
}
