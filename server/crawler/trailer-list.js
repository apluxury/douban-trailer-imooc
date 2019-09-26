// 爬取豆瓣数据
const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/tag/#/?sort=U&range=6,10&tags=`;
// 定义一个定时函数
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
});
// 自动执行的异步函数 获取电影相关信息
(async () => {
    console.log("starts");
    // 定义一个模拟浏览器browser，在上面进行操作
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    });
    // 打开一个新网页，载入目标网页
    const page = await browser.newPage();
    await page.goto(url, {
        // 当页面加载完的时候
        waitUntil: 'networkidle2'
    })
    await sleep(3000)
    // 点击页面加载更多按钮 id是more
    await page.waitForSelector('.more')
    // 
    for (let i = 0; i < 3; i++) {
        await sleep(3000)
        await page.click('.more')
    }

    // 获取网页内容
    const result = await page.evaluate(() => {
        // 执行页面脚本
        var $ = window.$
        var items = $('.list-wp a')
        var links = []
        console.log(items);

        if (items.length >= 1) {
            items.each((index, item) => {
                // 获取列表
                let it = $(item)
                // 获取豆瓣Id
                let doubanId = it.find('div').data('id')
                // 获取标题
                let title = it.find('.title').text()
                // 获取评分
                let rate = Number(it.find('.rate').text())
                // 获取地址 --跟换路径 改变图片大小
                let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
                // 存储数据
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })
    // 关闭浏览器
    browser.close()
    //    发送打印结果
    process.send({ result })
    // 退出进程
    process.exit(0)
})()