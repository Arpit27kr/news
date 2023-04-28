const express = require("express");
const adminController = require("../Controllers/adminController");
const adminRoutes = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const config = require('../Config/config');
const adminLoginAuth = require('../Middlewares/adminLoginAuth');

adminRoutes.use(bodyParser.json());
adminRoutes.use(bodyParser.urlencoded({extended:true}));

adminRoutes.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

adminRoutes.set('view engine','ejs');
adminRoutes.set('views','./Views');

adminRoutes.use(express.static('Public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'../Public/Image'));
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+ file.originalname;
        cb(null, name);
    }
});

const upload = multer({storage:storage});

adminRoutes.get("/blogSetup", adminController.blogSetup);

adminRoutes.post("/blogSetup",upload.single('blog-image'), adminController.blogSetupSave);

adminRoutes.get('/dashboard',adminLoginAuth.isLogin, adminController.dashboard);

adminRoutes.get('/createPost', adminLoginAuth.isLogin, adminController.loadPostDashboard);

adminRoutes.post('/createPost', adminLoginAuth.isLogin, adminController.addPost);

adminRoutes.post('/uploadImage', upload.single('image'),adminLoginAuth.isLogin, adminController.uploadImage);

module.exports = adminRoutes;