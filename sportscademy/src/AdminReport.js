import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./BookedReport.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdmHeader from './AdmHeader';



function AdminReport() {


    const [report, setReports] = useState([])

    const loginid = localStorage.getItem('uid')
    const location = useNavigate()

    const params = useParams()
    const cid = params.id
    const getReports = () => {
        axios.get('http://localhost:8000/admreport/' + params.id).then(result => {
            console.log(result)
            if (result.data.data.length > 0) {

                setReports(result.data.data)
            }
            else {
                setReports([])
            }
        }).catch(error => location('/'))
    }
    console.log(report)


    useEffect(() => {
        getReports();
    }, [])


    const removestudent=(e,id)=>{
e.preventDefault()

const body={ id,cid}

axios.post('http://localhost:8000/removestudent',body).then(result=>{
    alert("this student is been removed !")
    getReports();

}).catch(error=>{
    // getReports();

})
    }

    return (
        <div >

            {loginid ?

                <div>
                    <AdmHeader ></AdmHeader>
                    {
                        report.length > 0 ?
                            <div className='table1'>
                                <div className=' container  mt-5  p-5' >




{/* {report?.map((i, index) => (
                                              i.bookedReport
                                                                .filter((y) => y.cid === cid)
                                                                .map((booking) => (
                                                                    <div >{booking.course}</div>
                                                                ))))} */}



<div><p className='fs-1 my-4 p-3'>{report[0].bookedReport[0].course}
</p>
<p className='fs-2 mb-5'>started on : {report[0].bookedReport[0].startdate}</p>
</div>


                                    
                                    <Table striped bordered hover variant="light" className='  my-5 shadow-lg border-1' responsive='md'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Student Name</th>
                                                <th>Email </th>
                                                <th>Phone Number</th>
                                                <th>Paid and joined on</th>

                                                <th></th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                report?.map((i, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>

                                                        <td>{i.name}</td>
                                                        <td>{i.email}</td>
                                                        <td>{i.phone}</td>

                                                      <td>
                                                            {i.bookedReport
                                                                .filter((y) => y.cid === cid)
                                                                .map((booking) => (
                                                                    <div >{booking.today}</div>
                                                                ))}
    
                                                      </td>
                                                        <td>
                                                            <div className=''>

                                                                <Button onClick={(e)=>removestudent(e, i.id)} className="  btn border-0 bg-danger  ">Remove</Button>
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

export default AdminReport