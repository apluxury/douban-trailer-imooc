//https://douban.uieee.com/v2/movie/subject/:id

// http的request 获取数据
const rp = require('request-promise-native');
// 获取豆瓣API数据的函数
async function fetchMovie (item) {
    const url = `https://douban.uieee.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}

// 立即执行函数，通过movies.js中获取的数据，获取API全部电影数据
(async () => {
    let movies = [{
        doubanId: 30223604,
        title: '致亲爱的法官大人',
        rate: 7,
        poster: 'https://img3.doubanio.com/view/photo/l_ration_poster/public/p2528264333.jpg'
    }, {
        doubanId: 30232234,
        title: '魔女的爱情',
        rate: 6.9,
        poster: 'https://img3.doubanio.com/view/photo/l_ration_poster/public/p2528449352.jpg'
    }]
    // 便利数组
    movies.map(async movie => {
        let movieData = await fetchMovie(movie)

        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.tags);
            console.log(movieData.summary);
        } catch (error) {
            console.log(error);
        }
    })
})()