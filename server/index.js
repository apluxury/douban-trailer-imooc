const Koa = require('koa')
const app = new Koa()
// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
const views = require('koa-views')
const hostname = '127.0.0.1';
const { resolve } = require('path')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))
app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Luke',
        me: 'Scott'
    })
})

app.listen(4455, hostname, () => {
    console.log(`服务器运行在 http://127.0.0.1:4455/`)
})