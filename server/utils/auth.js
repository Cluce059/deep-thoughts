//const secret = require('../.env')

const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
//5 h's btw 
const expiration = '2h';

module.exports  = {
    signToken: function ({ username, email, _id }){
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn:expiration});
    },
    authMiddleware: function({ req }){
        //lets token be sent with req.body/query/or headers
        let token = req.body.token || req.query.token || req.headers.authorization
        //get beareer off of <otkenvalue>
        if(req.headers.authorization){
            token  = token
            .split(' ')
            .pop()
            .trim();
        }

        //if none return req obj as is
        if(!token){
            return req;
        }

        try {
            //decode and attache user data to req obj
            const { data } = jwt.verify(token, secret, { MaxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    },
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      }
}