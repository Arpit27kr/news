const isLogin = async(req, resp, next)=>{
    try {
        
        if(req.session.userId && req.session.isAdmin){

        }else{
            resp.setHeader('Content-Type','*/*');
            resp.status(200).redirect('/login');
        }
        next();

    } catch (error) {
        console.log('Error in isLogin : '+ error.message);
    }
}

const isLogout = async(req, resp, next)=>{
    try {
        
        if(req.session.userId && req.session.isAdmin){
            resp.setHeader('Content-Type','*/*');
            resp.status(200).redirect('/dashboard');
        }
        next();

    } catch (error) {
        console.log('Error in isLogout : '+ error.message);
    }
}

module.exports = {
    isLogin,
    isLogout
}