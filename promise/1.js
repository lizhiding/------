function sleep(ms) {
    return new Promise(function(resolve, reject) {
        console.log("创建的时候立即执行");
        setTimeout(resolve, ms);
    })
}

// 异步任务
sleep(10).then( ()=> console.log("finished1"));
// 同步任务
for(var i = 0;i < 1;i++)
{
    console.log('*');
}
// 异步任务
sleep(10).then( ()=> console.log("finished2"));
// 同步任务
for(var i = 0;i < 1;i++)
{
    console.log('*');
}

// 实验显示：
// promise一经创建立即执行
// 执行完毕之后，待所有同步任务结束，再执行then中的回调函数