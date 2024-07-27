
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './FrontPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function View() {



    const [course, setCourse]=useState([])
     const[loginid, setloginid ]=useState('')

    
     const params=useParams()
     const cid=params.id
          const fetchCourse =() => {
          
        axios.get('http://localhost:8000/view/'+cid).then(result=>{
            setCourse(result.data.msg)
        })
     
    }
    
    console.log(course)
    
    
    useEffect(()=>{
        
        fetchCourse()
         setloginid(localStorage.getItem('uid'))
     },[])
    
    
    const location=useNavigate()

    const register=(e)=>{

        e.preventDefault();

        alert("Proceed to pay the fees and Register")

        const data={
            id:loginid,
            cid
        }
        axios.post('http://localhost:8000/courseRegister',data).then(result=>{
            if(result){

console.log(result.data)
fetchCourse()

            }
        })
    }



    return (
        <div>
            {loginid? 
            
                <div>
    
                <Header></Header>
                
                            <section class="py-3">
                                <div class="container px-4 px-lg-5 my-5">
                                    <div class="row gx-4 gx-lg-5 align-items-center ">
                                        <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src={course.cphoto} alt="..." /></div>
                                        <div class="col-md-6">
                                            <h1 class="display-5 fw-bolder">{course.cname}</h1>
                
                                            <p class="lead mt-5">{course.cdescription}</p>
                
                                            <div class="fs-5 mb-5">
                                                <span class="text-info">Seats Available: <strong className='text-danger'>{course.cseats}</strong> </span>
                                            </div>
                                            <ul style={{ listStyleType: "none" }} className=' text-start'>
                                                <li className='my-3 '>Course Fees |<span className="list ">{course.cfees}</span></li>
                                                <li className='my-3'>Start Date|<span className="list">{ course.cdate}</span></li>
                                                <li className='my-3'>Duration|<span className="list">{course.duration_in_months }</span> Months</li>
                
                                            </ul>
                                            <div class="d-flex my-4 row">
                                                <div className="col-5">
                
                                                </div>
                                                <div className='col-7'>
                                                    <button class="btn btn-danger flex-shrink-0 m-3 m-auto " type="button">
                                                        <a style={{ textDecoration: "none" }} class="text-light " href="/viewAll">Back</a>
                
                                                    </button>
                                                    <button onClick={(e)=>register(e)} class={`btn btn-success flex-shrink-0 m-3 me-auto ${course.cseats<=0?"disabled":""}`} type="button">
                
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>




                <Footer></Footer>
                        </div> : location('/') }
        </div>

    
        
    )
}

export default View