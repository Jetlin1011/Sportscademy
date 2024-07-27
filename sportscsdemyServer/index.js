const express=require('express')
const ds=require('./services/ds')
const cors=require('cors')
const app = express()



app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}))


app.post("/register", (req,res)=>{
    console.log(req.body)
ds.saveUser(req.body.name,req.body.age,req.body.gender,req.body.email,req.body.phone,req.body.password).then(result=>{
    res.status(result.statusCode).json(result)
})
})


app.post("/login", (req,res)=>{
    ds.login(req.body.email, req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.get("/viewAll",(req,res)=>{
    ds.viewAll().then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get("/admviewAll",(req,res)=>{
    ds.admviewAll().then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get("/view/:id",(req,res)=>{

    ds.view(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post("/courseRegister",(req,res)=>{
console.log(req.body.id,req.body.cid)

    ds.courseRegister(req.body.id,req.body.cid).then(result=>{

        res.status(result.statusCode).json(result)
    })
})


app.get("/report/:loginid", (req,res)=>{
    ds.getReports(req.params.loginid).then(result=>{
         res.status(result.statusCode).json(result)
    })
})

app.post("/admLogin", (req,res)=>{
    console.log(req.body.adm_email, req.body.adm_password)
    ds.admLogin(req.body.adm_email, req.body.adm_password).then(result=>{
        
        res.status(result.statusCode).json(result)
        console.log(result)
    })
})

app.post('/addcourse', (req,res)=>{
    ds.addcourse(req.body).then(result=>{
        res.status(result.statusCode).json(result)
    })
})



app.post('/editcourse',(req,res)=>{
    ds.editCourse(req.body).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deletecourse/:id', (req,res)=>{
    ds.deleteCourse(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get('/admreport/:id', (req,res)=>{
    ds.getAdmReport(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)

    })
})

app.post('/removestudent',(req,res)=>{
    ds.removeStudent(req.body.id, req.body.cid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(8000, ()=>{
    console.log("server running...")
})