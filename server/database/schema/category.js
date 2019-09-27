const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId //Mixed 可以存放任何类型数据

const categorySchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})
//增加一个中间件,这里的this指本条数据，如果用箭头函数，会破坏上下文，指到上一层的全局中了
categorySchema.pre('save', function (next) {
    // 如果一条数据是新数据，则将创建和更新时间都设为当前
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

mongoose.model('Category', categorySchema)