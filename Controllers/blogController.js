const Post = require('../Models/postModel');
const { request } = require('../Routes/blogRoutes');

const loadBlog = async(req,resp)=>{
    try {
        const posts = await Post.find({});
        resp.render('blog',{posts:posts});
    } catch (error) {
        console.log('Error in loadBlog : '+  error.message);
    }
}

const loadPost = async(req,resp) => {
    try {
        const post = await Post.findOne({"_id": req.params.id});
        resp.render('post',{post:post});
    } catch (error) {
        console.log('Error in loadPost : '+error.message);
    }
}

const addComment = async(req,resp)=>{
    try {
        var postId = req.body.postId;
        var username = req.body.username;
        var comment = req.body.comment;
        await Post.findByIdAndUpdate({_id:postId},{
            $push:{
                "comments":{username:username, comment:comment}
            }
        });
        resp.status(200).send({success:true,msg:'Comment Added !!'});
        
    } catch (error) {
        console.log('Error in addComment : '+error.message);
        resp.status(200).send({success:false,msg:error.message});
    }
}

module.exports = {
    loadBlog,
    loadPost,
    addComment
}