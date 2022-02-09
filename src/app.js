//importing require module 
const express =  require('express');
require('./db/connection');
const path = require('path');
const hbs = require('hbs');
var cookieParser = require('cookie-parser')

//importing route
const basicRouter = require('./router/basicRoute')
const htmlPageRouter = require('./router/htmlPageRouter')

//this is for the port-> remote port or port local 
const port = process.env.PORT || 3000;

//strating Express
const app = express();

//for json conversion
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//this is for frontend render
const toPublic = path.join(__dirname,'../public')
const toViews = path.join(__dirname,'../template/views');
const toPartials = path.join(__dirname,'../template/partials');
//--setting for headler bar
app.set('view engine','hbs');
app.set('views',toViews);
hbs.registerPartials(toPartials);

//--for static 
app.use(express.static(toPublic));


//adding router
app.use(basicRouter);
app.use(htmlPageRouter);

app.listen(port,()=>{
    console.log("Server is on");
})



