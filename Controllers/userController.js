const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const config = require('../Config/config');

const loadLogin = async(req,resp)=>{
    try{
        resp.render('login')
    } catch(error){
        console.log('Error in loadLogin : '+error.message);
    }
}

const verifyLogin = async(req,resp) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if(userData){
            const isPasswordCorrect = await bcrypt.compare(password,userData.password);

            if(isPasswordCorrect){
                req.session.userId = userData._id;
                req.session.isAdmin = userData.isAdmin;
                if(userData.isAdmin){
                    resp.redirect('/dashboard');
                }
                else{
                    resp.redirect('/profile')
                }
            }
            else{
                resp.setHeader('Content-Type','*/*');
                resp.render('login',{message:'Email and Password incorrect!!!'});
            }
        }
        else{
            resp.setHeader('Content-Type','*/*');
            resp.render('login',{message:'Email and Password incorrect!!!'});
        }
    } catch (error) {
        console.log('Error in verifyLogin : '+ error.message);
    }
}

const logout = async(req,resp)=>{
    try {

        req.session.destroy();
        resp.redirect('/login');
        
    } catch (error) {
        console.log('Error in logout : '+error.message);
    }
}

const profile = async(req,resp)=>{
    try {
        resp.send('hii profile here!!')
    } catch (error) {
        console.log('Error in profile : '+error.message);
    }
}

const forgetLoad = async(req,resp)=>{
    try {
        resp.render('forgetPassword');
    } catch (error) {
        console.log('Error in forgetLoad : ' + error.message);
    }
}

const forgetPasswordVerify = async(req,resp)=>{
    try {
        const email=req.body.email;
        const userData = await User.findOne({ email:email });
        if(userData){
            const token = randomstring.generate();
            await User.updateOne({email:email}, {$set : {token:token} });
            sendResetPasswordMail(userData.name, userData.email, token);
            resp.render('forgetPassword',{message:"please check you mail to Reset your Password!"});
        }
        else{
            resp.render('forgetPassword',{message :"User email is incorrect!!!"});
        }
    } catch (error) {
        console.log('Error in forgetPasswordVerify : '+ error.message);
    }
}

const sendResetPasswordMail = async(name, email, token)=>{
    try {

        const transport = nodemailer.createTransport({
            host:'smtp.gmai.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.email.user,
                pass:config.emailPassword
            }
        });

        const mailOptions ={
            from:config.emailUser,
            to:email,
            subject:'Teset Password',
            html:'<p>Hii' + name + ', Please click here to <a href="http://54.237.197.221/:3000/resetPassword?token"'+token+'>Reset Your Password</a>'
        }
        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('Error while sendinf email : '+error);
            }
            else{
                console.log('Email has been sent : ',info);
            }
        });
        
    } catch (error) {
        console.log('Error in sendResetPasswordMail : '+ error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    logout,
    profile,
    forgetLoad,
    forgetPasswordVerify
}