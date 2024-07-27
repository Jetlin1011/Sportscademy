import React from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup  from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const schema2=yup.object().shape({
adm_email: yup.string().email().required(),
adm_password:yup.string().min(4).max(16).required()
})

// import { useForm } from 'react-hook-form'
// import {yupResolver} from "@hookform/resolvers/yup"
// import * as yup from 'yup'



function AdmLogin() {
    const location=useNavigate()

const {register, handleSubmit, formState:{errors}}=useForm({
    resolver:yupResolver(schema2)
})

const admLogin= (data)=>{

 axios.post('http://localhost:8000/admLogin',data).then(result=>{
    console.log(result)
    if(result.data.status){
        localStorage.setItem("uid",result.data.id)
        localStorage.setItem("uname", result.data.uname )
        alert("login success")
        location('/admviewAll')
    }
 }).catch(errors=>{
    alert(errors.response.data.msg)
    // alert("invalid")
 })


}

    return (
        <div className='body d-flex align-items-center justify-content-center  '>
            <form action="" onSubmit={handleSubmit(admLogin)} className=' col-lg-6 col-md-6 col-sm-10 text-center'>
                <div className='w-100 row  '>
                    <div className='col-lg-5 col-md-6 col-sm-9 p-2  m-auto'>
                        <input type="text" name='adm_email' id='adm_email' placeholder='enter your email' className="form-control ms-2 " {...register('adm_email')} />
<p className="text-danger text-start ms-3">{errors.adm_email?.message}</p>
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-9 p-2 m-auto'>
                        <input type="adm_password" name='adm_password' id='adm_password' placeholder='enter password' className="form-control ms-2 " {...register('adm_password')} />
                        <p className="text-danger ms-3 text-start">{errors.adm_password?.message}</p>

                    </div>        </div>
                <button type='submit' id='submit' className='btn btn-info btn-lg w-50 my-5'>Login</button>
                <div className='d-flex '>
                <div className='me-auto'><a className='text-danger btn btn-primary' href="/login">Login as User</a></div>


            </div>
            </form>
           
        </div>
    )
}

export default AdmLogin