import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./BookedReport.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import moment from 'moment/moment';
function BookedReport() {


        const today = moment().format("YYYY-MM-DD");


    const [report, setReports] = useState([])

    const loginid = localStorage.getItem('uid')
    const location = useNavigate()

    const getReports = () => {
        axios.get('http://localhost:8000/report/' + loginid).then(result => {
            console.log(result)
            if (result.data.reportData.length > 0) {

                setReports(result.data.reportData)
            }
            else {
                setReports([])
            }
        }).catch(error=>location('/'))
    }
    console.log(report)
    useEffect(() => {
        getReports();
    }, [])


    const removestudent=(e,cid)=>{
        e.preventDefault()
        const id=loginid
        const body={ id,cid}
        
        axios.post('http://localhost:8000/removestudent',body).then(result=>{
            alert("This course is been removed !")
            getReports();
        
        }).catch(error=>{
            getReports();
        
        })
            }


    return (
        <div >

            {loginid ?
            
               <div>
                <Header ></Header>
                {
                    report.length > 0 ?
    <div className='table1'>

        <h1 className='my-5 p-5'>My Courses</h1>
                            <div className=' container  mt-5  p-5' >
                                <Table striped bordered hover variant="light" className='  my-5 shadow-lg border-1' responsive='md'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Programme Name</th>
                                            <th>Started Date </th>
                                            <th>Enrolled on</th>
                                            <th>Total Months</th>

                                            <th></th>
        
        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            report?.map((i, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
        
                                                    <td>{i.course}</td>
                                                    <td>{i.startdate}</td>
                                                    <td>{i.today}</td>
                                                    <td>{i.duration}</td>

                                                    <td>
                                                        <div className=''>
                                                            {/* <a href={`/view/${"employee"}`} class="  btn "><li class="font fa fa-eye " style={{ color: 'white' }}></li></a>
                                                    <a href={`/edit/${"employee"}`} class=" btn"><li class="font fa fa-pen" style={{ color: 'white' }}></li></a> */}
                                                         

                                                         
<Button onClick={(e) => removestudent(e, i.cid)} className={`btn border-0 bg-danger ${ Math.floor((new Date(i.startdate) - new Date(today)) / (1000 * 60 * 60 * 24)) <= 7? "disabled"      : ""}`}>
  Leave
</Button>
                                                         
                                                            {/* <Button onClick={(e)=>removestudent(e, i.cid)} className={`  btn border-0 bg-danger ${ console.log(i.startdate, today)}   ${(new Date(i.startdate) - new Date(today)) <= 7 ? "disabled" : " " } `}>Leave</Button> */}
                                                        </div>
        
        
                                                    </td>
        
                                                </tr>
        
                                            ))}
                                    </tbody>
                                </Table>
                            </div>
        
    </div>
    
                        : <img width="45%" className='img' src="https://cdn.vectorstock.com/i/preview-1x/04/40/no-data-empty-data-concept-vector-41830440.jpg" alt="" />
                                           
                                           }
                                                                                      <Footer ></Footer>

               </div>
                : location('/')}

        </div>
    )
}

export default BookedReport