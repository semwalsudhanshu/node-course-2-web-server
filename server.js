const express=require('express');
const hbs =require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=now + '   '+req.method+ '   '+req.url;
  console.log(log);
   fs.appendFile('server.log',log +'\n', (err)=>{
     if(err){
       console.log('Unable to append to server.log');
     }
   });
  next();
});
//app.use((req,res,next)=>{
  //res.render('maintenance.hbs');
//});

hbs.registerHelper('getCurrentYear',()=>{

  return new Date().getFullYear();
});

hbs.registerHelper('Screenit',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
//res.send('<h1>Hello Express!</h1>');
res.render('Homepage.hbs',{
  pageTitle:'Home',
  Welcome:'Welcome to my Website'
});
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});
app.get('/Projects',(req,res)=>{
  res.render('projects.hbs');
});

app.get('/bad',(req,res)=>{
  errorMessage='Unable to fulfill the request';
  res.send({Error:errorMessage});
});

app.listen(port,()=>{
  console.log('Server is up on port '+ port);
});
