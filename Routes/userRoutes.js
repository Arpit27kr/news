const express = require('express');
const userRoute = express();
const bodyParser = require('body-parser');
const userController = require('../Controllers/userController');
const session = require('express-session');
const config = require('../Config/config');
const adminLoginAuth = require('../Middlewares/adminLoginAuth');

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));

userRoute.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

userRoute.set('view engine','ejs');
userRoute.set('views','./Views');

userRoute.use(express.static('Public'));

userRoute.get('/login',adminLoginAuth.isLogout,userController.loadLogin);
userRoute.post('/login',userController.verifyLogin);

userRoute.get('/logout',adminLoginAuth.isLogin,userController.logout)

userRoute.get('/profile',userController.profile);

userRoute.get('/forgetPassword', adminLoginAuth.isLogout, userController.forgetLoad);
userRoute.post('/forgetPassword', userController.forgetPasswordVerify)


module.exports = userRoute;