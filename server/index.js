const Koa = require('koa')
const app = new Koa()
const { normal } = require('./tpl')
const hostname = '127.0.0.1';
app.use(async (ctx, next) => {
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = normal
})

app.listen(4455, hostname, () => {
    console.log(`服务器运行在 http://127.0.0.1:4455/`)
})