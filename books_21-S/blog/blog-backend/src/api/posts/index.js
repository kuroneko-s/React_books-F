import Router from "koa-router"
import * as Ctrl from "./posts.ctrl"
import checkLoggedIn from './../../lib/checkLoggedIn';

const posts = new Router()

const {
    list,
    write,
    read,
    remove,
    update,
    getPostById,
    checkOwnPost
} = Ctrl

posts.get('/', list)
posts.post('/', checkLoggedIn, write)

const post = new Router()
post.get('/', read)
post.delete('/', checkLoggedIn, checkOwnPost, remove)
post.patch('/', checkLoggedIn, checkOwnPost, update)

posts.use('/:id', getPostById, post.routes())
// posts.put('/:id', replace)

export default posts