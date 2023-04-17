const path = require('path')

const router = require('express').Router();

require('dotenv').config()

const express = require('express')
const { route } = require('express/lib/application')
// encrypt password
const bcrypt = require('bcrypt');

const ContactForm = require(path.resolve(__dirname, '../models/ContactForm'))
const Detail = require(path.resolve(__dirname, '../models/Detail'))
const Exam = require(path.resolve(__dirname, '../models/Exam'))
const Slider = require(path.resolve(__dirname, '../models/Slider'))
const Test = require(path.resolve(__dirname, '../models/Test'))
const Register = require(path.resolve(__dirname, '../models/Register'))
const Result = require(path.resolve(__dirname, '../models/Result'))
const Expense = require(path.resolve(__dirname, '../models/Expense'))


const routes = express.Router()


const passport = require('passport')


const session = require('express-session');
const genPassword = require(path.resolve(__dirname, '../lib/passwordUtils')).genPassword; //imports gen password function

const MongoStore = require('connect-mongo');////For sessionstore 

//Importing authentication middlewares::::::::::::::::::::::::::::::::::
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Converts post request from form to server to json type::::::::::::::::
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));// parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Today

// console.log(process.env.SESSION_SECRET)
// console.log(process.env.dbs)
routes.use(session({
    secret: process.env.SESSION_SECRET,//process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.dbs,//process.env.dbs,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  //1 DAY
    }

}));


//::::::::::::::::::::::::::::Passport:::::::::::::::::::::::::::::::::::::::::::
require('../passport');
routes.use(passport.initialize());//refreshes passport middleware everytime we load a route
routes.use(passport.session());
//serialize and deserialize user and uses express session middleware
//persists under session collection
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// routes.use((req, res, next) => {

//     console.log(req.session);
//     console.log(req.user);
//     next()
// })
// will run everytime aroute is executed and displays the curent session and authenticated user
//session will always show in console log but user will show when there is user logged in


routes.get("/", async (req, res) => {
    //res.send("this is message from home routes")
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" }) //change it every deployment
    //console.log(details)
    const slides = await Slider.find()
    //console.log(slides)
    const tests = await Test.find()
    //const users=await User.find()
    res.render("index", {
        details: details,
        slides: slides,
        tests: tests,
        //users:users
    })
})
//const data=Register.find

//====================LOGIN AND REGISTER===========================================
routes.get("/login", async (req, res) => {
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
    if (req.isAuthenticated()) {

        res.redirect("/login-success")
    }
    else {
        res.render('login', {
            details: details,
            //users:users

        })
    }

})
//passport.authenticate is middleware so it will execute first then (req,res,next)
//passport.authenticate will populate passport-config file with username and password entered
routes.post("/login", passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }))
//(req,res,next)=>{}); not needed as both success and failure conditin are defined above
//===============================================================================
routes.get("/register", async (req, res) => {
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
    //const users=await User.find()
    res.render('register', {
        details: details
    })

})

routes.post("/register", async (req, res) => {

    console.log("form is submitted")
    //save data to database
    const saltHash = await genPassword(req.body.regPassword)
    const salt = saltHash.salt;
    const hash = saltHash.hash
    const newUser = new Register({
        username: req.body.regName,
        email: req.body.regEmail,
        hash: hash,
        salt: salt,
        //admin:true //Make it true only for one user
        admin: false
    });
    newUser.save()
        .then((Register) => {
            console.log(Register);
        });

    res.redirect('/login')

    // try{
    //     console.log(req.body.regPassword)
    //     req.body.regPassword = await bcrypt.hash(req.body.regPassword,10)
    //     const data=await Register.create(req.body)
    //     //console.log(req.body.regPassword)
    //     res.redirect("/login")

    // }catch(e)
    // {
    //     console.log(e)
    //     res.redirect("/register")
    // }
})
//======================================================================================

routes.get("/login-success", async (req, res) => {
    //res.send("this is message from gallery routes")
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
    // res.render("login-success", {
    //     details: details
    // })
    if (req.isAuthenticated()) {

        res.render("login-success", {
            details: details
        })

    }
    else {
        res.redirect('/login')
    }
})
routes.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/gallery');
    });

})

// routes.get("/gallery", async (req, res) => {
//     //res.send("this is message from gallery routes")
//     const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
//     if (req.isAuthenticated()) {

//         res.render("gallery", {
//             details: details
//         })

//     }
//     else {
//          res.redirect('/login')

//      }
// })


//===============This uses authMiddlleware It is same as above middleware=================

routes.get("/gallery", isAuth, async (req, res) => {
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
    res.render("gallery", {
        details: details
    })
})

routes.get("/startexam", isAuth, async (req, res) => {
    q = 0;
    res.sendFile("startexam.html", { root:path.resolve(__dirname, '../../views' ) }
        // , {
        //     ar: ar,
        //     n:n,
        //     exams: exams,
        //     q:q
        // }
    )

})
routes.get("/exam", isAuth, async (req, res) => {
    q = 0;
    res.sendFile("exam.html", { root:path.resolve(__dirname, '../../views' )}
        // , {
        //     ar: ar,
        //     n:n,
        //     exams: exams,
        //     q:q
        // }
    )

})

routes.post('/mkRes',async(req,res) => {

    console.log("in mkres");
    flag=await req.body.init;
    console.log(flag);
    if(flag){
        await Result.create({
                    uid :req.user.username,
                    ans:[{question:1,
                        a: false,
                        b: false,
                        c: false,
                        d: false},{question:2,
                            a: false,
                            b: false,
                            c: false,
                            d: false},{question:3,
                                a: false,
                                b: false,
                                c: false,
                                d: false},{question:4,
                                    a: false,
                                    b: false,
                                    c: false,
                                    d: false},{question:5,
                                        a: false,
                                        b: false,
                                        c: false,
                                        d: false},{question:6,
                                            a: false,
                                            b: false,
                                            c: false,
                                            d: false},{question:7,
                                                a: false,
                                                b: false,
                                                c: false,
                                                d: false},{question:8,
                                                    a: false,
                                                    b: false,
                                                    c: false,
                                                    d: false},{question:9,
                                                        a: false,
                                                        b: false,
                                                        c: false,
                                                        d: false},{question:10,
                                                            a: false,
                                                            b: false,
                                                            c: false,
                                                            d: false}]
                    
                })
        console.log("Created")

    }
    res.sendStatus(201);
    
});

// get the click data from the database
routes.get('/next', async (req, res) => {

    //Questions and options stored in a array===================================
    var ar = [];
    const cursor = Exam.find().cursor();
    i = 0;
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        /**set and save**/
        ar[i] = doc;
        i++;

    }
   
    uid=await req.user.username;
    ans=await Result.findOne({uid:uid});//Always use inside a async function and with await keyword
    resArray=ans.ans;
   // console.log(resArray)
    msg="hello";
    var data={
        ar:ar,
        msg:msg,
        uid:uid,
        resArray:resArray
    }
    res.send(data);
});

routes.get('/setter', async (req, res) => {

    //Questions and options stored in a array===================================
    console.log("setRadio to setter")
    uid=await req.user.username;//Use await before such statements
    ans=await Result.findOne({uid:uid});//Always use inside a async function and with await keyword
    refArray=ans.ans;
    console.log(refArray)
    msg="hello";
    var data={
        refArray:refArray
    }
    res.send(data);
});



routes.post('/subRes',async(req,res) => {

    console.log("in /subRes");
    var qnm=await req.body.q;
    var ela=await req.body.a;
    var elb=await req.body.b;
    var elc=await req.body.c;
    var eld=await req.body.d;
    console.log(qnm)
    usr=await req.user.username;
    pos=qnm-1;
    
    const tm=await Result.findOneAndUpdate({'uid':usr,'ans.question':qnm},{ 
        "$set": {
            "ans.$.question": qnm,
            "ans.$.a": ela,
            "ans.$.b": elb,
            "ans.$.c": elc,
            "ans.$.d": eld,

        }
    });
    

res.sendStatus(201); // very important :(
})


routes.get("/admin", isAdmin, async (req, res) => {
    const details = await Detail.findOne({ "_id": "63941cc627b56ee0843358b7" })
    res.render("gallery", {
        details: details
    })
})


routes.post("/process-contact-form", async (request, response) => {
    console.log("form is submitted")
    console.log(request.body)
    //save data to database
    try {
        const data = await ContactForm.create(request.body)
        console.log(data)
        response.redirect("/")

    } catch (e) {
        console.log(e)
        response.redirect("/")
    }
})
routes.get("/expenses", isAuth, async (req, res) => {
    console.log(req.user._id)
    //res.sendFile("expense.html", { root:path.resolve(__dirname, '../../views' ) }
     res.render("expense")  
    

})



routes.post("/expenses", async (request, response) => {
    console.log("expenses route called...")
    console.log(request.user.username)
    console.log(request.body)

    var exp={
        user_id:request.user._id,
        category:request.body.category,
        otherCategory:request.body.otherCategory,
        remarks:request.body.remarks,
        amount:request.body.rupees
    }
    
    try {
        var data= await Expense.create(exp)
            console.log(data)
            response.redirect("/")
    
        } catch (e) {
            console.log(e)
            response.redirect("/")
        }
})
routes.get('/total-expenses', async (req, res) => {
    const userId = req.user._id.toString();
    const userName=req.user.username
    
      
    try {
      // Total expenses for user ID
      const totalExpenses = await Expense.aggregate([
        { $match: { user_id:userId } },
        { $group: { _id: "$user_id", total: { $sum: "$amount" } } }
      ]);
      /*Aggregate will return an array of objects where each object has:
      Group means group the documents found by match as:
      {
          _id: any,
          total: 000 
      }*/
     
      //Individual expenses for each category

      const categoryExpenses = await Expense.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } }
      ]);
      const dateExpenses = await Expense.aggregate([
        { $match: { user_id: userId } },
        { $group: { _id: "$date", total: { $sum: "$amount" } } }
      ]);
        
      res.render('total-expenses', {userName,dateExpenses, userId, totalExpenses, categoryExpenses });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  
module.exports = routes