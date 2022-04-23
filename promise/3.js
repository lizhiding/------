
function sleep(ms) {
    return new Promise(function(resolve, reject) {
        // setTimeout(回调函数,时间,给回调函数的参数)
        // 两种写法:
        // setTimeout(resolve,ms,参数);
        // setTimeout(()=>{resolve(参数);},ms);
        setTimeout(()=>{console.log(ms);resolve(ms);},ms);
    })
}

// 定义一个异步函数,返回一个promise对象
async function handle(){
    console.log("AAA");
    // 如果不使用await，那么sleep被挂起来，执行之后的任务
    // 如果使用await，那么会等待该异步任务结束之后再执行后续任务
    // await 必须配合 async 一起使用
    let res = await sleep(5000);
    if(res){
        console.log(res);
    }
    console.log("BBB");
}

handle();

// AAA
// BBB (5000ms后)


// 参考链接：
// https://www.jianshu.com/p/b16e7c9e1f9f
// https://www.php.cn/js-tutorial-451851.html
// https://blog.csdn.net/weixin_44582045/article/details/122853642

// 【async await的配合使用】

// 在异步任务前后依赖的情况下（A任务的数据是B任务的输入），使用promise避免了回调函数的嵌套使用，但是依然会存在微小的嵌套，会出现如下情况：
// O-A-B-C-D
// O.then(A).then(B).then(C).then(D)
// O A B C-D
// O A B C没有依赖关系，D依赖于O A B C，可以这样写


// Promise仍然存在缺陷，它只是减少了嵌套，并不能完全消除嵌套。
// 从写法上来看，依然不像是同步任务
// 随后
// 因此ES7提出了新的解决方案：async await
// 使用async await可以实现像操作同步任务一样操作异步任务，代码结构变得非常清晰

// promise all的执行顺序、返回顺序
// Promise.all([asyncTask(1),asyncTask(2),asyncTask(3)])
// .then(resultList => {
//     console.log('results:',resultList);
// });
// 三个任务立即并发执行，谁先结束是不知道的，但最终返回的结果里边是按输入顺序排列的。