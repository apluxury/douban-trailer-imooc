const rou = require('../database/schema/movie.js')
const Router = require('koa-router')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const router = new Router()


// 控制器  加一个前缀
@controller('/api/v0/movies')

export class movieController {
    // @get('/')
    async getMovies (ctx, next) {
        const Movie = mongoose.model('Movie')
        const movies = await Movie.find({}).sort({
            'meta.createdAt': -1
        })

        ctx.body = {
            movies
        }
    }
    // @get('/:id'),
    async getMoviesDetai (ctx, next) {
        const Movie = mongoose.model('Movie')
        const id = ctx.params.id
        const movies = await Movie.findOne({ _id: id })
        ctx.body = {
            movie
        }
    }
}





router.get('/movies', async (ctx, next) => {

})
// 获取单部电影列表
router.get('/movies/detail/:id', async (ctx, next) => {


})

module.exports = router