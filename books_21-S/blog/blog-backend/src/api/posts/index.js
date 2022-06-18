const Router = require("koa-router")
const {list, write, read, remove, replace, update} = require("./posts.ctrl")

const posts = new Router()

posts.get('/', list)
posts.post('/', write)
posts.get('/:id', read)
posts.delete('/:id', remove)
posts.put('/:id', replace)
posts.patch('/:id', update)

module.exports = posts