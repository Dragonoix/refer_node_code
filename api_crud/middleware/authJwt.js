const jwt = require('jsonwebtoken');

class AuthJwt {
    async authJwt(req, res, next) {
        try {
            const token = req.body.token || req.query.token || req.headers['access-token'];
            if(!token) {
                return res.status(400).send({
                    message: 'Token is must to enter into a secure page'
                })
            }else {
                jwt.verify(token, 'iam200', (err, data) => {
                    if(!err) {
                        req.user = data;
                        next();
                    }else {
                        return res.status(400).send({
                            message: 'Authentication failed'
                        })
                    }
                })
            }
        }catch(err) {
            throw err;
        }
    }
}

module.exports = new AuthJwt();