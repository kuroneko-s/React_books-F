import Router from "koa-router"
import * as Ctrl from "./posts.ctrl"

const posts = new Router()

const {
    list,
    write,
    read,
    remove,
    replace,
    update,
    checkObjectId
} = Ctrl

posts.get('/', list)
posts.post('/', write)

const post = new Router()
post.get('/', read)
post.delete('/', remove)
post.patch('/', update)

posts.use('/:id', checkObjectId, post.routes())
// posts.put('/:id', replace)

export default posts