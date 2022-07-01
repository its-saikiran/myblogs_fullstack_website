const isValidOtp = (req, res, next) => {
    const { otp } = req.body;
    try {
        if(otp.length !== 6){
            return res.status(404).json({
                msg: "Invalid otp.",
                navigate: '/otp'
            })
        } 
    } catch (err) {
        return res.status(400).json({ 
            msg: err,
            navigate: '/'
        })
    }
    next();
};


module.exports = {
    isValidOtp
}