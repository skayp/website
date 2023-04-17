// here next is used to continue execution of program
// next() will cause next middleware in a program to execute
module.exports.isAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
    //res.status(401).json({msg:'You are not authorized to view this source'})
    //    const details= Detail.findOne({"_id":"63941cc627b56ee0843358b7"})
        res.redirect("/login")
    
    }

}

module.exports.isAdmin=(req,res,next)=>{
    if(req.isAuthenticated()&& req.user.admin){
        next();
    }
    else{
    res.status(401).json({msg:'You are not authorized to view this source as you are not admin'})
    }

}