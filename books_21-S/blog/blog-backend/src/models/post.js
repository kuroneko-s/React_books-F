import mongoose, { Schema } from "mongoose";

const PostSchema = mongoose.Schema({
    title: String,
    body: String, 
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String
    }
})

// DB에 컬렉션 이름을 만들어줌 = 복수형으로
const Post = mongoose.model('Post', PostSchema)
export default Post