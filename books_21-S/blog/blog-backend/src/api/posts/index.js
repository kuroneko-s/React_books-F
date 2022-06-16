const Router = require("koa-router")

const posts = new Router()

const printInfo = ctx => {
    ctx.body = { // 이게 JSON 객체라고 ??
        method: ctx.method,
        path: ctx.path,
        params: ctx.params
    }
}

posts.get('/', printInfo)
posts.post('/', printInfo)
posts.get('/:id', printInfo)
posts.delete('/:id', printInfo)
posts.put('/:id', printInfo)
posts.patch('/:id', printInfo)

module.exports = posts