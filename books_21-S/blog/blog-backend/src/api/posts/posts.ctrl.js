let postId = 1;

const posts = [
    {
        id: 1,
        title: '제목',
        body: "내용"
    }
]

// POST { title, body }
exports.write = ctx => {
    const {title, body} = ctx.request.body;
    postId += 1;
    const post = {id: postId, title, body}
    posts.push(post)
    ctx.body = post
}

// GET
exports.list = ctx => {
    ctx.body = posts
}

const notFound = ctx => {
    ctx.status = 404;
    ctx.body = {
        message: "포스트가 존재하지 않습니다"
    }
}

const findPost = id => {
    return posts.find(post => post.id.toString() === id)
}

const findPostToIndex = id => {
    return posts.findIndex(post => post.id.toString() === id)
}

// GET :id
exports.read = ctx => {
    const {id} = ctx.params
    const post = findPost(id)
    if ( !post ) {
        notFound(ctx)
        return;
    }
    ctx.body = post
}

// DELETE :id
exports.remove = ctx => {
    const {id} = ctx.params
    const index = findPostToIndex(id)
    if(index === -1) {
        notFound(ctx)
        return;
    }
    posts.slice(index, 1)
    ctx.status = 204
}

// PUT :id { title, body }
exports.replace = ctx => {
    const {id} = ctx.params
    const index = findPostToIndex(id)
    if ( index === -1 ) {
        notFound(ctx) 
        return;
    }
    posts[index] = {
        id,
        ...ctx.request.body
    }
    ctx.body = posts[index]
}

// PATCH
exports.update = ctx => {
    const {id} = ctx.params
    const index = findPostToIndex(id)
    if(index === -1) {
        notFound(ctx)
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    }
    ctx.body = posts[index]
}