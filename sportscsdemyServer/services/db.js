const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Sportscademy',{useNewUrlParser:true});

const userdata=mongoose.model("userdata",{
    id:String,
    name:String,
    age:Number,
    gender:String,
    email:String,
    phone:Number,
    password:String,
    paymentStatus:Number,
    bookedReport:[]
})

const Course=mongoose.model("Course",{
 
      cid:String,
      cname: String,
      cphoto:String,
      cdescription:String,
      cfees: Number,
      cdate: String,
      cseats:Number,
      duration_in_months:String    
})

const Admindata=mongoose.model("Admindata",{

    adm_id:String,
    adm_name:String,
    adm_email:String,
    adm_password:String
})

module.exports={
    userdata ,
    Course,
    Admindata
}