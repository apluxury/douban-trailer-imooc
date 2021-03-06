// 引入子进程
const cp = require('child_process')

const { resolve } = require('path');
// 自动执行函数
(async () => {
    const script = resolve(__dirname, '../crawler/video')
    // cp.fork方法创建子进程 传入两个参数 ；执行脚本 ，返回数组 
    const child = cp.fork(script, [])
    // 表示进程标识符
    let invocked = false

    // 子进程错误监听
    child.on('error', err => {
        if (invocked) return
        invocked = true
        console.log(err);
    })

    // 子进程退出返回
    child.on('exit', code => {
        if (invocked) return
        invocked = true
        let err = code == 0 ? null : new Error('exit code' + code);

        console.log(err);
    })

    // 子进程返回结果
    child.on('message', data => {
        console.log(data);
    })
})()

