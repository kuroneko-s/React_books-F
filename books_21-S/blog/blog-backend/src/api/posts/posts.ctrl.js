import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'Joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

// 허용해줄 HTML Tags
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ], // 허용 태그
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  }, // 허용 애트리뷰트들
  allowedSchemed: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    console.error(e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [], // 허용할 html tag들 지정
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// POST { title, body, tags }
export const write = async (ctx) => {
  console.log('backend ctx ', ctx.request.body);
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/posts?username=&tag=&page=
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10); // ?page=1

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;

  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  console.log(query);

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) // 내림차순 (역순)
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    // 중간에 toJSON으로 타입을 JSON으로 바꿔도 되지만 조회하는 레벨에서 lean()을 사용해서 JOSN 형태로 가져올 수 있음
    /*
            const posts = await Post.find()
            .sort({_id: -1}) // 내림차순 (역순)
            .limit(10)
            .skip((page-1) * 10)
            .lean()
            .exec();
        */
    ctx.body = posts
      .map((post) => post.toJSON()) // mongoDB에서 바로 받아오면 mongo Type이라서 toJSON으로 타입 변형 해줘야만 함
      .map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET :id
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

// DELETE :id
export const remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// PUT :id { title, body }
export const replace = async (ctx) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트된 데이터를 반환한다. false === 업데이트 전 데이터를 반환
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// PATCH
export const update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const { body } = ctx.request;
  const result = schema.validate(body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const nextData = { ...body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 업데이트된 데이터를 반환한다. false === 업데이트 전 데이터를 반환
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
