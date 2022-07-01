const {
    isValidEmail,
    isValidPassword,
} = require('./isValidEmailPass');

const signUpChecks = async(req, res, next) => {
    try {
        const { name, email, password, confirmPassword, phoneNumber } = req.body;
        if(!(name && email && password && confirmPassword && phoneNumber)){
            return res.status(400).json({ 
                msg: "Insuffcient information.", 
                navigate: '/register' 
            })
        }
        if(!isValidEmail(email)){
            return res.status(400).json({ 
                msg: "Please enter a valid email address.",
                navigate: '/register'
            })
        }
        // if(!isValidPassword(password)){
        //     return res.status(400).json({ 
        //         msg: "Password should contaiin minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character.", 
        //         navigate: '/Error'
        //     })
        // }
        if(password !== confirmPassword){
            return res.status(400).json({ 
                msg: "Password does not match.", 
                navigate: '/register' 
            })
        }
        delete req.body.confirmPassword;
    } catch (error) {
        return res.status(404).json({ 
            msg: error, 
            navigate: '/' 
        })
    }
    next();
};


module.exports = {
    signUpChecks,
}