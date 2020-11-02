const express=require('express');
const path=require('path');
const port =8000;
const app=express();
const database=require('./config/mongoose')
const Todo=require('./models/Todo');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// let today=new Date(2020,7,2,11,30,27,0);
// console.log(today.toString());
// console.log(today.toLocaleString('en-IN'))
// //console.log(today.toISOString().slice(0,10));


//-------------rendering home page----------------------

app.get('/',function(req,res)
{
   Todo.find({},function(err,todo)
   {
       if(err)              //  if present any error
       {
           console.log('error: ',err);
           return;
       }
       return res.render('home',{
           title:'My todo App',                       // giving title to my web page
           todo_list:todo
       });
   })
});

//----------------deleting todo------------------

app.get('/delete-todo/',function(req,res)
{
    const id=req.query.id;
    Todo.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error: ',err);
            return;
        }

        return res.redirect('/');
    })
})

// -----------------------adding todo-------------------------

app.post('/add-todo',function(req,res)
{
    console.log(req.body);
    Todo.create(
        {
            todo:req.body.todo,
            description:req.body.description
        },function(err,newTodo)
        {
            if(err)
            {
                console.log('error: ',err);
                return;
            }
            //console.log(newTodo)
            return res.redirect('/')
        }
    )
});


app.listen(port,function(err)
{
    if(err)
    {
        console.log('error:',err);
    }
    else{
        console.log('server run succesfully');
    }
});
