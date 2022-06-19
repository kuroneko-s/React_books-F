require('dotenv').config();
import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"
import mongoose from "mongoose"
import api from "./api"

const {PORT, MONGO_URL} = process.env

const app = new Koa();
const router = new Router();

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch(e => {
    console.error(e)
})

router.use('/api', api.routes())

app.use(bodyParser())

// 이 타이밍에서 라우터를 적용
app.use(router.routes())
    .use(router.allowedMethods())

const port = PORT || 4000

app.listen(port, () => {
    console.log("Listening to port ", port)
})