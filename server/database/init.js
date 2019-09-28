const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
const glod = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise

// 匹配schema下文件
exports.initSchemas = () => {
    glod.sync(resolve(__dirname, './schema', '**/*.js')).forEach(
        require
    )
}
// 链接服务器
exports.connect = () => {
    //最大重连次数
    let maxConnectTimes = 0
    //放在promise里面，保证连接数据库后再干别的事
    return new Promise((resolve, reject) => {
        //如果不是生产环境，需要打印debug信息
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.set('useCreateIndex', true)
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) //5.0版本前还需要一些配置参数
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.set('useCreateIndex', true)
                mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
            } else {
                throw new Error('数据库问题，请尽快修复')
            }
        })
        mongoose.connection.on('error', err => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库问题，请尽快修复')
            }
        })
        mongoose.connection.once('open', () => {
            resolve()
            console.log('MongoDB 连接成功！')

        })
    })
}