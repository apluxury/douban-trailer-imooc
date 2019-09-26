// 爬取豆瓣数据
const puppeteer = require('puppeteer')
const base = `https://movie.douban.com/subject/`;
const doubanId = "27040774"
const videoBase = `https://movie.douban.com/trailer/231125/#content`
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
    await page.goto(base + doubanId, {
        // 当页面加载完的时候
        waitUntil: 'networkidle2'
    })
    await sleep(1000)

    // 获取网页内容
    const result = await page.evaluate(() => {
        // 执行页面脚本
        var $ = window.$
        // 预告片视频
        var it = $('.related-pic-video')
        if (it && it.length > 0) {
            // 预告片跳转地址
            var link = it.attr('href')
            // 封面图
            var cover = it.css('background-image')
            // style="background-image:url(https://img1.doubanio.com/img/trailer/medium/2563785397.jpg?)"
            // 去掉多余字符
            cover = cover.replace("url(", "")
            cover = cover.replace(/\?/, "")
            cover = cover.replace(/\)/, "")

            //将得到的结果封装成对象返回给result
            return {
                link,
                cover
            }
        }
        // 如果没有则返回空对象
        return {}
    })
    // 爬取视频
    let video
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000)
        video = await page.evaluate(() => {
            var $ = window.$
            // 视频地址
            var it = $('source')
            if (it && it.length > 0) {
                return it.attr('src')
            }
            return ''
        })
    }
    // 最终返回数据
    const data = {
        video,
        doubanId,
        cover: result.cover
    }
    // 关闭浏览器
    browser.close()
    //发送打印结果
    process.send({ data })
    // 退出进程
    process.exit(0)
})()