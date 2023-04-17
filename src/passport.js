const path = require('path')
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const validPassword = require('./lib/passwordUtils').validPassword;
const Register = require(path.resolve(__dirname, './models/Register'))

// async function a(){
//     const user=await Register.find({regName:"Skp"});
//   console.log(user);
// }
// a();
const customFields={
    usernameField:'regName',
    passwordField:'regPassword'
};

//populated by passport.authenticate()
const verifyCallback=(username, password, done)=>{
    //username and password frpm loginform
    Register.findOne({username:username})// not regName
                .then((user)=>{
                    if(!user){return done(null,false)}
                    const isValid=validPassword(password,user.hash,user.salt)
                    if(isValid)
                    {
                        return done(null,user);

                    }
                    else{
                        return done(null,false);
                    }
                })
                .catch((err)=>{
                    done(err);

                });

}
const strategy= new LocalStrategy(customFields,verifyCallback);


passport.use(strategy);

//Puts user id into session as => passport: { user: <userid> }
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


passport.deserializeUser((userId,done)=>{
    Register.findById(userId)
    .then((user)=>{
        done(null, user);
    })
    .catch(err =>done(err))

});


//module.exports = initialize 