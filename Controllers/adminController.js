const BlogSetting = require('../Models/blogSettingModel');
const User = require('../Models/userModel');
const Post = require('../Models/postModel');
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        console.log("Error in securePassword : "+ error.message);
    }
}

const blogSetup = async(req,res) => {
    try {
        var blogSetting = await BlogSetting.find({});
        if(blogSetting.length > 0){
            resp.setHeader('Content-Type','*/*');
            res.redirect('/login')
        }
        else{
            resp.setHeader('Content-Type','*/*');
            res.render('blogSetup');
        }
    } catch (error) {
        console.log("Error in blogSetup : "+ error.message);
    }
}

const blogSetupSave = async(req,resp)=>{
    try {
        const blogTitle = req.body.blog_title;
        const blogImage = req.file.filename;
        const description = req.body.description;
        const email = req.body.email;
        const name = req.body.name;
        const password = await securePassword(req.body.password);

        const blogSetting = new BlogSetting({
            blogTitle:blogTitle,
            blogLogo:blogImage,
            description:description
        });
        await blogSetting.save();

        const user = new User({
            name:name,
            email:email,
            password:password,
            isAdmin:1
        });
        const userData = await user.save();
        if(userData)
        {
            resp.setHeader('Content-Type','*/*');
            resp.redirect('/login');
        }
        else{
            resp.setHeader('Content-Type','*/*');
            resp.render('blogSetup',{message:'Blog not setup Properly!!!'});
        }
    } catch (error) {
        console.log("Error in : "+ error.message)
    }
}

const dashboard = async(req, resp)=>{
    try {
        resp.render('Admin/dashboard');
    } catch (error) {
        console.log('Error in dashboard : '+error.message);
    }
}

const loadPostDashboard = async(req,resp)=>{
    try {
        resp.render('Admin/postDashboard');
    } catch (error) {
        console.log('Error in loadPostDashboard : '+ error.message);
    }
}

const addPost = async(req,resp)=>{
    try {
        var image='';
        if(req.body.image !== undefined){
            image= req.body.image;
        }
        
        const post = new Post({
            title:req.body.title,
            content:req.body.content,
            image:image
        });

        const postData = await post.save();

        resp.render('Admin/postDashboard', {message:'Post Added Successfully!!'});
    } catch (error) {
        console.log('Error in addPost : '+ error.message);
    }
}

const uploadImage = async(req,resp)=>
{
    try {
        var imagePath = '/Image';
        imagePath = imagePath + '/' + req.file.filename;
        resp.send({success:true, msg:'Image uploaded successfully', path: imagePath});
    } catch (error) {
        resp.send({success:false,msg:error.message});
    }
}

module.exports = {
    blogSetup,
    blogSetupSave,
    dashboard,
    loadPostDashboard,
    addPost,
    uploadImage
}