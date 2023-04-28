const BlogSetting = require('../Models/blogSettingModel');

const isBlog = async(req,res,next) => {

    try{
        const blogSetting = await BlogSetting.find({});
        if(blogSetting.length == 0 && req.originalUrl != '/blogSetup')
        {
            res.redirect('/blogSetup');
        }
        else
        {
            next();
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}

module.exports = {
    isBlog
}