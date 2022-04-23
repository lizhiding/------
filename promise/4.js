function promise1(param)
{
    return new Promise(function(resolve,reject){
        console.log("promise1开始执行");
        // 核心业务耗时1秒
        setTimeout(resolve, 5000, param*2);
        // 设置成功执行后的参数
        // 实际应用场景可以根据核心业务的返回值或者异常处理来判断是成功还是失败
        // 设置执行失败后的参数（可以省略）同理失败的回调函数也可以省略
    })
}

function promise2(param)
{
    return new Promise(function(resolve,reject){
        console.log("promise2开始执行");
        // 核心业务耗时1秒
        setTimeout(resolve, 3000, param*2);
        // 设置成功执行后的参数
        // 实际应用场景可以根据核心业务的返回值或者异常处理来判断是成功还是失败
        // 设置执行失败后的参数（可以省略）同理失败的回调函数也可以省略
    })
}

function promise3(param)
{
    return new Promise(function(resolve,reject){
        console.log("promise3开始执行");
        // 核心业务耗时1秒
        setTimeout(resolve, 1000, param*2);
        // 设置成功执行后的参数
        // 实际应用场景可以根据核心业务的返回值或者异常处理来判断是成功还是失败
        // 设置执行失败后的参数（可以省略）同理失败的回调函数也可以省略
    })
}
// 假如三个异步任务没有先后执行顺序的要求，那么直接这样写就OK，或者不用promise1也没问题
// promise1().then((res)=> console.log('promise1执行结束'));
// promise2().then((res)=> console.log('promise2执行结束'));
// promise3().then((res)=> console.log('promise3执行结束'));

// 假如三个异步任务有依赖关系，1-2-3，需要按照顺序同步执行
// 传统：如果使用传统的异步编程形式，会造成多层回调，代码可读性非常弱
// 改进：因此可以利用promise在一定程度上减少嵌套调用
// promise1(10)
// .then((res)=> {console.log(res,'promise1执行完毕！');return promise2(res)})
// .then((res)=> {console.log(res,'promise2执行完毕！');return promise3(res)})
// .then((res)=> {console.log(res,'promise3执行完毕！');})

// 假如三个异步任务有依赖关系，1、2-3，1、2没有依赖关系，但是3依赖于1、2的结果
// 那么可以使用pomise.all 批量操作异步任务
// Promise.all([promise1(100),promise2(200)])
// .then(([res1,res2])=>{
//     console.log([res1,res2],'promise1 promise2执行完毕！');
//     return promise3(res1+res2)
// })
// .then((res)=>{
//     console.log(res,'promise3执行完毕！');
// })
// 实验显示：
// Promise.all中的异步任务会按照输入顺序并发执行
// 不管哪一个任务先执行结束
// 最终的返回结果会按照输入顺序进行整理


// 通过以上实验可以发现，Promise通过链式调用一定程度上消除了回调函数的嵌套
// 但是，代码结构依然不够清晰明了

// 为了是代码结构更加清晰，操作异步任务更加简便,可以使用ES2017的新特性Async / Await
// 将异步的代码逻辑写成同步的方式，这使得代码的阅读和组织变得更加清晰，也便于调试。


// async修饰的函数默认返回一个promise对象，因此promise的方法它全都可以使用
// await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
// 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理
async function main()
{   
    // 如果单纯需要三个异步任务顺序执行
    // var res1 = await promise1(100).then((res)=>{console.log('promise1执行完毕...',res);});
    // var res2 = await promise2(200).then((res)=>{console.log('promise2执行完毕...',res);});
    // var res3 = await promise3(300).then((res)=>{console.log('promise3执行完毕...',res);});

    // 如果三个异步任务存在依赖关系,需要顺序执行
    var res1 = await promise1(100);
    console.log(res1,'f1执行完毕...');
    var res2 = await promise2(res1);
    console.log(res2,'f2执行完毕...');
    var res3 = await promise3(res2);
    console.log(res3,'f3执行完毕...');

}

// async修饰的函数默认返回一个promise对象，因此promise的方法它全都可以使用
main().then(() => {
    console.log('全部执行完毕........')
})