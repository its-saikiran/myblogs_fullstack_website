const jwt = require('jsonwebtoken')
const { secretKey } = require('./config');

// // // AUTHENTICATION 
const authentication = async(token) => {
    try {
        return await jwt.sign({
                data: token
              }, secretKey, { expiresIn: '24h' });
    } catch (error) {
        return error.message
    }
};


const authorize = async(req, res, next) => {
    try {
        if(!req.headers.cookie){
            return res.status(404).json({
                msg: "Please log in first", 
                navigate: '/login'
            })
        }
        const token = req.headers.cookie.split('=')[1];
        const decrypted = jwt.verify(token, secretKey)
        req.body = {...req.body, userId: decrypted.data.id}
    } catch (error) {
        return res.status(500).json({
            msg: error,
            navigate: '/Error'
        })
    }
    next();
};


module.exports = {
    authentication,
    authorize
}