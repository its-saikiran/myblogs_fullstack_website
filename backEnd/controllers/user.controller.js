const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { saltCode } = require('../auth/config');

const bcrypt = require('bcrypt');

const { sendOtp } = require('../services/otp.service')
const { authentication } = require('../auth/jwt');
const redisClient = require('../services/redis')

const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await prisma.user.count({
            where: { email }
        })
        if (userExist > 0) {
            return res.status(400).json({ 
                msg: "Email already exists.", 
                navigate: '/login' 
            })
        }
        req.body.password = await bcrypt.hash(password, parseInt(saltCode))
        await prisma.user.create({ 
            data: req.body 
        })
        // console.log('>>>>',otp);
        const otp = await sendOtp(email)
        if(isNaN(otp)){
            return res.status(500).json({
                msg: otp,
                navigate: '/Error'
            })
        }
        await redisClient.setEx(`${email}otpNumber`,120, otp)
        res.status(201).json({
            msg: "Email has been created successfully verify your account",
            navigate: '/otp'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error,
            navigate: '/'
        })
    }
};



const otpEnter = async (req, res) => {
    const { email, otp } = req.body;
    const redisOtp = await redisClient.get(`${email}otpNumber`)
    if(otp !== redisOtp){
        return res.status(404).json({
            msg: 'Invalid otp',
            navigate: '/Error'
        })
    }
    try {
        await prisma.user.update({
            where: { email },
            data: { verified: true }
        })
        res.status(201).json({
            msg: "Account verified you can log in now.",
            navigate: '/login'
        })
    } catch (error) {
        res.status(400).json({
            msg: error,
            navigate: '/'
        })
    }
};



const checkUserExist = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await prisma.user.findUnique({
            where: { email }
        })
        if (!userExist) {
            return res.status(404).json({ 
                msg: "Please register first.", 
                navigate: '/register'
            })
        }
        const decrypted = await bcrypt.compare(password, userExist.password)
        if (!decrypted) {
            return res.status(404).json({ 
                msg: "Incorrect Password.", 
                navigate: '/login' 
            })
        }
        userExist.id = parseInt(userExist.id);
        return userExist;
    } catch (error) {
        return res.status(500).json({ 
            msg: error,
            navigate: '/'
        })
    }
};



const login = async (req, res) => {
    try {
        const user = await checkUserExist(req, res)
        const { id, email, role } = user;
        if (!user.verified) {
            try {
                const otp = await sendOtp(email)
                if(isNaN(otp)){
                    return res.status(500).json({
                        msg: otp,
                        navigate: '/Error'
                    })
                }
                await redisClient.setEx(`${email}otpNumber`, 120, otp)
                return res.status(404).json({ 
                    msg: "Verify your account.", 
                    navigate: '/otp' 
                })
            } catch (error) {
                return res.status(400).json({ 
                    msg: error,
                    navigate: '/'
                })
            }
        }
        const token = await authentication({ id, role })
        res.status(200).cookie("authToken", token).json({ 
            msg: "Logged in successfully.",
            navigate: '/' 
        })
    } catch (error) {
        res.status(400).json({ 
            msg: error,
            navigate: '/'
        })
    }
};


const updateProfile = async (req, res) => {
    const { id, email } = req.body;
    if (email) {
        return res.status(400).send("You can't change your Email.")
    }
    try {
        await prisma.user.update({
            where: { id },
            data: req.body
        })
        res.status(200).cookie("authToken", req.body.token).send("Profile updated successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const logOut = async (req, res) => {
    const { id, token } = req.body;
    try {
        const sendUpdate = await prisma.user.update({
            where: { id },
            data: { token }
        })
        res.status(200).clearCookie().send("Signed out successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};



const signOut = async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.user.delete({
            where: { id }
        })
        res.status(200).send("Account deleted successfully.")
    } catch (error) {
        res.status(400).send(error.message)
    }
};


module.exports = {
    signUp,
    otpEnter,
    login,
    updateProfile,
    logOut,
    signOut
}




