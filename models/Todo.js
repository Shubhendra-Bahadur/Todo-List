const mongoose=require('mongoose');

const Todo_schema=mongoose.Schema(
    {
        todo:{
            type:String,
            required:true
        },

        description:
        {
            type:String,
            required:true
        }
    }
)

const Todo=mongoose.model('Todo',Todo_schema)

module.exports= Todo;