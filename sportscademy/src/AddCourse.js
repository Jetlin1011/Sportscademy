import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import './AddCourse.css'
import AdmHeader from './AdmHeader'
import Footer from './Footer'


function AddCourse() {

const location =useNavigate()

    const [cid, setCid] = useState('')
    const [cname, setCname] = useState('')
    const [cphoto, setCphoto] = useState('')
    const [cdescription, setCdescription] = useState('')
    const [cfees, setCfees] = useState(0)
    const [cdate, setCdate] = useState('')
    const [cseats, setCseats] = useState(0)
    const [duration_in_months, setduration_in_months] = useState('')

    const [loginid, Setloginid]=useState('')


    useEffect(() => {
        setCid(uuidv4().slice(0, 3))
        Setloginid(localStorage.getItem('uid'))
    }, [])


    const addCourse = async (e) => {
        e.preventDefault()
        setCid(uuidv4().slice(0, 3))
        const body = {
           cid,
           cname,
           cphoto,
           cdescription,
           cfees,
           cdate,
           cseats,
           duration_in_months  

        }
        const result = await axios.post('http://localhost:8000/addcourse',body)
        alert(result.data.message)
window.location.reload(false);
    }

    return (
        <div>
            {loginid ? <div>

<AdmHeader></AdmHeader>
                <div className='container d-flex align-items-center justify-content-center mt-5'>
    
    <div className=' box_div shadow-lg p-2 my-5 rounded-3 '>
        <form action="" className='.form m-3 p-3 text-start '>
            <label className='my-2' htmlFor="cname">Programe Name </label>
            <input onChange={(e) => setCname(e.target.value)} type="text" id="cname" name="cname" className="form-control border-1" />
            <label className='my-2' htmlFor="cphoto">Enter Image</label>
            <input onChange={(e) => setCphoto(e.target.value)} type="text" id="cphoto" name="cphoto" className="form-control" />
            <label className='my-2' htmlFor="cdescription">Short Description </label>
            <input onChange={(e) => setCdescription(e.target.value)} type="text" id="cdescription" name="cdescription" className="form-control" />
            <label className='my-2' htmlFor="cfees">Fees</label>
            <input onChange={(e) => setCfees(e.target.value)} type="text" id="cfees" name="cfees" className="form-control" />
            <label className='my-2' htmlFor="cdate">Course starting date</label>
            <input onChange={(e) => setCdate(e.target.value)} type="date" id="cdate" name="cdate" className="form-control"   min={(new Date().toISOString().split('T')[0])}
            //   value={cdate ? cdate.split('-').join('/') : ''}

            />

            <label className='my-2' htmlFor="cseats">Number Seats</label>
            <input onChange={(e) => setCseats(e.target.value)} type="text" id="cseats" name="cseats" className="form-control" />

            <label className='my-2' htmlFor="duration_in_months">Total Months for the programme</label>
            <input onChange={(e) => setduration_in_months(e.target.value)} type="text" id="duration_in_months" name="duration_in_months" className="form-control" />
            <div className='d-flex justify-content-between'>
                <div className='mt-4 text-end'> <Link to={'/admviewAll'}><button className='btn ms-3  btn-dark  rounded-pill'>Back</button></Link></div>
                <div className='mt-4 text-start'> <button onClick={(e) => addCourse(e)} className='btn btn-success me-3 rounded-pill'>Add</button></div>
            </div>


        </form>
    </div>


</div>
<Footer></Footer>
            </div> :  location('/')}

        </div>
    )

}

export default AddCourse