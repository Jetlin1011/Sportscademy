const moment = require("moment")

const db = require('./db')
const { v4: uuidv4 } = require('uuid')

saveUser = (name, age, gender, email, phone, password) => {
    return db.userdata.findOne({ email }).then(user => {
        if (user) {
            return {
                status: false,
                msg: "User alredy exists.",
                statusCode: 404
            }
        }
        else {
            const uid = uuidv4().slice(0, 5)
            newUser = new db.userdata({
                id: uid,
                name,
                age,
                gender,
                email,
                phone,
                password,
                paymentStatus: 1,
                bookedReport: []
            })
            newUser.save();
            return {
                status: true,
                msg: "New user added succesfully.",
                statusCode: 200
            }
        }
    })

}


login = (email, password) => {
    return db.userdata.findOne({ email, password }).then(result => {
        if (result) {
            id = result.id;
            uname = result.name;
            return {
                status: true,
                msg: "Login success.",
                statusCode: 200,
                id,
                uname
            }
        }
        else {
            return {
                status: false,
                msg: "Invalid username OR password.",
                statusCode: 404
            }
        }
    })

}

viewAll = () => {
    const today = moment().format("YYYY-MM-DD");
    console.log(today);

    return db.Course.find({ cdate: { $gt: today } }).then(result => {
        if (result.length > 0) {
            console.log(result);
            return {
                status: true,
                msg: "here are the courses.",
                statusCode: 200,
                data: result
            }
        } else {
            console.log("No courses available.");
            return {
                status: false,
                msg: "No courses available.",
                statusCode: 404
            };
        }
    });
};


view = (cid) => {
    return db.Course.findOne({ cid }).then(result => {
        if (result) {
            console.log(result)
            return {
                status: true,
                msg: result,
                statusCode: 200
            }
        }
        else {
            return {
                status: false,
                msg: "No courses available.",
                statusCode: 404
            }
        }
    })
}


courseRegister = (id, cid) => {

    var today = ""
    var cdate = "";
    var cseats = 0
    var cname = ""
    var duration = ''
    return db.Course.findOne({ cid }).then(result => {
        if (result) {
            today = moment().format("YYYY-MM-DD");
            cdate = result.cdate;
            cseats = result.cseats;
            cname = result.cname;
            duration = result.duration_in_months
            cid=result.cid
            result.cseats = cseats - 1
            console.log(result.duration_in_months)
            result.save();
            console.log(cname)




            return db.userdata.findOne({ id }).then(report => {
                if (report) {
                    // const uid2 = uuidv4().slice(0, 5)

                    report.bookedReport.push({ uid:id,cid: cid, course: cname, startdate: cdate, today: today, duration: duration })
                    // console.log(report.bookedReport)

                    report.save();

                    return {
                        status: true,
                        msg: "course registered",
                        statusCode: 200
                    }
                }
                else {
                    return {
                        status: false,
                        msg: "unable to register.",
                        statusCode: 404
                    }
                }
            })





        }
    })


}

getReports = (id) => {
    return db.userdata.findOne({ id }).then(result => {
        if (result) {
            return {
                status: true,
                reportData: result.bookedReport,
                statusCode: 200
            }
        }
        else {
            return {
                status: false,
                msg: "unable to get user.",
                statusCode: 404
            }
        }
    })
}

getAdmReport=(cid)=>{
    return db.userdata.find({'bookedReport.cid':cid}).then(result=>{
        if(result){

        return{
            status: true,
            data: result,
            statusCode: 200   
        }}
        else{
            return{
                status: false,
                data: "no one booked yet",
                statusCode: 404
            }
        }
    })
}

removeStudent=(id,cid)=>{
    return db.userdata.findOne({id}).then(result=>{
        result.bookedReport=result.bookedReport.filter(i=>i.cid !== cid)
        result.save()
        return{
            status: true,
            data: "student removed",
            statusCode: 200  
        }
    })
}


admLogin = (adm_email, adm_password) => {
    return db.Admindata.findOne({adm_email,adm_password}).then(result => {
        if (result) {
            console.log(result)
            id = result.adm_id;
            uname = result.adm_name;
            return {
                status: true,
                msg: "Login success.",
                statusCode: 200,
                id,
                uname
            }
        }
        else {
            return {
                status: false,
                msg: "Invalid Username or password.",
                statusCode: 404
            }
        }
    })

}


addcourse=(body)=>{
    return db.Course.findOne({cid:body.cid}).then(result=>{
if(result){
    return{
        status:false,
            statusCode:400,
            message:'course already present' 
    }
}
else{
    newCourse =new db.Course({
        cid:body.cid,
        cname: body.cname,
        cphoto:body.cphoto,
        cdescription:body.cdescription,
        cfees: body.cfees,
        cdate: body.cdate,
        cseats:body.cseats,
        duration_in_months:body.duration_in_months   
    })
    newCourse.save()
    return{
        status:true,
                statusCode:200,
                message:"course added"
    }
}
    })
}


editCourse=(body)=>{
    return db.Course.findOne({cid:body.cid}).then(result=>{
        if(result){
console.log(result)
            result.cname=body.cname,
            resultcphoto=body.cphoto,
            resultcdescription=body.cdescription,
            result.fees=body.cfees,
            result.cdate=body.cdate,
            result.cseats=body.cseats,
            result.duration_in_months=body.duration_in_months 
            console.log(result)
result.save()
            return{
                status:true,
                statusCode:200,
                message:"course edited"
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'course not present'
            }
        }
    })
}




admviewAll = () => {

    return db.Course.find().then(result => {
        if (result.length > 0) {
            return {
                status: true,
                msg: "here are the courses.",
                statusCode: 200,
                data: result
            }
        } else {
            console.log("No courses available.");
            return {
                status: false,
                msg: "No courses available.",
                statusCode: 404
            };
        }
    });
};

deleteCourse = (cid)=>{
    return db.Course.deleteOne({cid}).then(result=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                message:"course deleted"
            }
        }
        else{
           return{
            status:false,
            statusCode:400,
            message:'course not deleted'
           } 
        }
    })
}


module.exports = {
    saveUser,
    login,
    viewAll,
    view,
    courseRegister,
    getReports,
    admLogin,
    addcourse,
    editCourse,
    admviewAll,
    deleteCourse,
    getAdmReport,
    removeStudent
}