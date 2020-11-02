const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/todo_list_db');

const todo_db=mongoose.connection;

todo_db.on('error',console.error.bind(console,'there is error in connecting to db'));

todo_db.once('open',function()
{
    console.log('succesfully connected to db');
})