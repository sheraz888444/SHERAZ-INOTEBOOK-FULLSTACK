const mongoose=require('mongoose')
const { Schema }=mongoose;
const NotesSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
    

  },
  tag:{
    type:String,
    default:'general'
  },
  date:{
    type:String,
    date:Date.now,
    required:false
  }
});
module.exports=mongoose.model('note',NotesSchema)
