// 【promise的执行顺序】

// 首先，1立即执行
// 然后优先执行同步任务
// 同步任务执行完毕，再考虑异步任务23
// 23中3的优先级高，所以先执行3后执行2


// 优先级：
// Promise属于JavaScript引擎内部任务
// setTimeout则是浏览器API
// 引擎内部任务优先级高于浏览器API任务
let promise = new Promise(function(resolve, reject){
    // 立即执行
    console.log("1");
    resolve();
});

// 异步任务
setTimeout(()=>console.log("2"), 0);
// 异步任务的后续任务
promise.then(() => console.log("3"));
// 同步任务
console.log("4");

// 1
// 4
// 3
// 2



