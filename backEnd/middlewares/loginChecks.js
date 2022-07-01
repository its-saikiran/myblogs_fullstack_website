const {
    isValidEmail,
    isValidPassword,
} = require('./isValidEmailPass')

const loginChecks = (req, res, next) => {
    const { email, password } = req.body;
    if(!(isValidEmail(email))){
        return res.status(400).json({ 
            msg: "Please enter a valid email.",
            navigate: '/login'
        })
    }
    // if(!(isValidPassword(password))){
    //     return res.status(400).json({ msg: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character." })
    // } 
    next();
};

module.exports = {
    loginChecks
}