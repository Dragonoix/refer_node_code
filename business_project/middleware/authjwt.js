const jwt = require('jsonwebtoken');

class Authjwt {

    async authjwt(req, res, next) {
        try {
            if(req.cookies && req.cookies.userToken) {
                jwt.verify(req.cookies.userToken, 'MHU565GH', (err, data) => {
                    if(!err) {
                        req.user = data;
                        next();
                    }else {
                        console.log(err);
                        next()
                    }
                })
            }else {
                next()
            }
        }catch(err) {
            throw err;
        }
    }

}


module.exports = new Authjwt();

