const express = require('express');
const bodyP = require('body-parser');
const date = require(__dirname + '/date.js');


const app = express();
app.set('view engine','ejs');
app.use(bodyP.urlencoded({extended: true}));
app.use(express.static('public'));

var items = [];
var works = [];

app.get('/',function(req,res) {


  let day = date.getDate();

  res.render('list',{ListTitle : day,newList: items});

})

app.post('/',function(req,res) {
  var item = req.body.todoitem;
  if(req.body.list === 'work') {
    works.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }


})

app.get('/work',function(req,res) {
  res.render('list',{ListTitle: "work",newList: works});
})

app.get('/about',function(req,res) {
  res.render('about');
})


app.listen(process.env.PORT || 3000,function() {
  console.log('server is been connected to port 3000');
})
