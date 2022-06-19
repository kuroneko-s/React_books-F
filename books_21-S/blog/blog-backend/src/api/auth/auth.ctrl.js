import Joi from 'Joi';
import User from '../../models/user';

/*
    POST /api/auth/register
    {
        username: '',
        password: ''
    }
*/

export const register = async ctx => {
    const schemaValidation = Joi.object().keys({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
        password: Joi.string().required()
    }) // validation

    // validate
    const result = schemaValidation.validate(ctx.request.body)

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error
        return;
    } // validate-2

    const { username, password } = ctx.request.body
    try {
        const exists = await User.findByUsername(username)
        if (exists) {
            ctx.status = 409;
            ctx.body = 'username duplicate'
            return;
        } // username validate
        
        const user = new User({
            username
        })
        await user.setPassword(password) // 비밀번호를 인스턴스 메서드를 이용해서 설정하고
        await user.save(); // DB에 저장
        ctx.body = user.serialize()

        const token = user.generateToken()
        ctx.cookies.set("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })
    } catch(e) {
        ctx.throw(500, e)
    }
    
}

/*
    POST /api/auth/login
    {
        username: '',
        password: ''
    }
*/
export const login = async ctx => {
    const {username, password} = ctx.request.body;

    if (!username || !password) {
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUsername(username);
        if(!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password)
        if(!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken()
        ctx.cookies.set("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })
    }catch(e) {
        ctx.throw(500, e)
    }
}

export const check = async ctx => {
    const {user} = ctx.state
    if (!user) {
        ctx.status = 401;
        return 
    }

    ctx.body = user
}

/*
    POST /api/auth/logout
*/
export const logout = async ctx => {
    ctx.cookies.set('access_token')    
    ctx.status = 204;
}
