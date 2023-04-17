const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
const express= require("express");
const hbs=require("hbs");

const app= express();
const mongoose=require("mongoose");

const routes=require('./routes/main');
p=path.resolve(__dirname, '../views')
console.log(p)
const Detail = require(path.resolve(__dirname, './models/Detail'))
const Exam = require(path.resolve(__dirname, './models/Exam'))
const Slider = require(path.resolve(__dirname, './models/Slider'))
const Test = require(path.resolve(__dirname, './models/Test'))

app.use('/static',express.static(path.resolve(__dirname, '../public')))//grant access to public folder afterusing static as home in browser


app.use(express.urlencoded({
    extended:true
}))

app.use('',routes)

// app.post('/clicked', (req, res) => {

//   console.log("click");

//   res.sendStatus(201);

// });


//template engine

app.set('view engine','hbs')//view engine set to type hbs
app.set('views', path.resolve(__dirname, '../views'))//views are kept in views folder
hbs.registerPartials(path.resolve(__dirname, '../views/partials'))
hbs.registerHelper('ctr', function (a){
   return a+1; 
});
hbs.registerHelper("setVar", function(varName, varValue, options) {
  options.data[varName] = varValue;
});

//------database connection----------

mongoose.connect(process.env.dbs,()=>
{
  console.log("db connection successful");

  
//     Detail.create({
//         brandName:"QndA",
//         brandIconUrl:"/docs/4.3/assets/brand/bootstrap-solid.svg ",
//         links:[
//             {
//                 label:"Home",
//                 url:"/"
//              },
//             {
//                 label:"Services",
//                 url:"/services"
//             },
//             {
//                 label:"Gallery",
//                 url:"/gallery"
//             },
//             {
//                 label:"About",
//                 url:"/about"
//             },
//             {
//                 label:"ContactUs",
//                 url:"/contact-us"
//             },
//         ]
//     })
//       Exam.create({
//           question:"Inside which HTML element do we put the JavaScript?",
          
//                   a:"&lt;script&gt;",
//                   b:"&lt;javascript&gt;",
//                   c:"&lt;scripting&gt;",
//                   d:"&lt;scripting&gt;",
                
//       })
  

//     Slider.create([
//         {
//             title:'This is title for first slide image',
//             subTitle:'THis is subtitle for slide image',
//             imageUrl:"/static/images/slideimage1.jpg",
//             class:'active'
//         },
//         {
//             title:'This is title for second slide image',
//             subTitle:'THis is subtitle for slide image',
//             imageUrl:"/static/images/slideimage2.jpg"
//         },
        
//     ])
//     Test.create([{
//         icon:'fa-solid fa-shield-halved',
//         title:'SSC',
//         description:'2021',
//         linkText:'',
//         link:'Take Test'
//     },

//     {
//         icon:'fa-solid fa-shield-halved',
//         title:'other',
//         description:'2021',
//         linkText:'',
//         link:'Take Test'
//     },
//     {
//         icon:'fa-solid fa-shield-halved',
//         title:'other2',
//         description:'2021',
//         linkText:'',
//         link:'Take Test'
//     },
// ])

})

//--------------------------------------
 const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
