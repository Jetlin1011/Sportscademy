import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './FrontPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function FrontPage() {


const [courses, setCourses]=useState([])


const[loginid, setloginid ]=useState('')





const fetchCourses =() => {
    axios.get('http://localhost:8000/viewAll').then(result=>{
        if(result){
        setCourses(result.data.data)
    }
    else{
        setCourses([])
    }
    }).catch(result=>{
        setCourses([])
    })
      
 
}

console.log(courses)


useEffect(()=>{
    
    fetchCourses()
     setloginid(localStorage.getItem('uid'))
 },[])


const location=useNavigate()

  return (
    <div >
 {loginid? <div>
    <Header></Header>
    <div className='corousel  d-flex align-items-center justify-content-center fw-bolder'>
        <div className='col-9 col-lg-7 col-md-7'><p className='cor_text '>Fuel Your child's Passion for Sports: Join our Training Academy!</p></div>
    </div >
    
    
    <div className='row text-center p-4 container-fluid my-4'>
        <div className="col-12 col-lg-6 col-md-6 col-sm-10 m-auto modify"><p className='fs-5'>
        Sportscademy is a professional sports academy to impart high-quality coaching to children interested in learning various sports. Currently, we offers coaching programs for Badminton, Basketball, Table Tennis, Squash, Football, Cricket and multi-sport program for 8-16-year-olds. Sportscademy has tied up with partners to provide coaching in Tennis, Skating and Chess etc. Currently our training center is at Kochi, Ernakulam
            </p></div>
    <div className="col-12 col-lg-6 col-md-6 col-sm-10 m-auto ">
    <div className='abou_img_div'>
        <img className='about_img 'width={"70%"} src="https://images.unsplash.com/photo-1627540458907-47a427507e20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="" />
    </div>
    </div>
    
    </div>
    
    
    <div className="container-fluid">
    
        <h3 className='text-start ms-4'>Our Courses:</h3>
         <div className="row d-flex aligh-items-center justify-content-center my-3 p-2">
    

{courses?.map(i=> ( 
    
    
    <div class="card col-lg-3 col-md-4 col-sm-12 shadow-lg border-0 m-3" >
    <img src={i.cphoto} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">{i.cname}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Fees: {i.cfees}</li>
      <li class="list-group-item">Duration: {i.duration_in_months} months</li>
      <li class="list-group-item">Seats avaibale: {i.cseats}</li>
    </ul>
    <div class="card-body">
      <a href={`/view/${i.cid}`} class="btn btn-success">View</a>
    </div>
  </div>
    
)
    
    )}

           </div>
    </div>
    
    
    <Footer></Footer>
</div>

: location('/')}


    </div>
  )
}

export default FrontPage