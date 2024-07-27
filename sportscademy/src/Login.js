import React from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup  from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const schema=yup.object().shape({
email: yup.string().email().required(),
password:yup.string().min(8).max(16).required()
})

// import { useForm } from 'react-hook-form'
// import {yupResolver} from "@hookform/resolvers/yup"
// import * as yup from 'yup'



function Login() {
    const location=useNavigate()

const {register, handleSubmit, formState:{errors}, reset}=useForm({
    resolver:yupResolver(schema)
})

const login= (data)=>{
console.log(data)
 axios.post('http://localhost:8000/login',data).then(result=>{
    console.log(data)
    if(result.data.status){
        localStorage.setItem("uid",result.data.id)
        localStorage.setItem("uname", result.data.uname )
        alert("login success")
        location('/viewAll')
    }
 }).catch(errors=>{
    alert(errors.response.data.msg)
 })


}

    return (
        <div className='body d-flex align-items-center justify-content-center  '>
            <form action="" onSubmit={handleSubmit(login)} className=' col-lg-6 col-md-6 col-sm-10 text-center'>
                <div className='w-100 row  '>
                    <div className='col-lg-5 col-md-6 col-sm-9 p-2  m-auto'>
                        <input type="text" name='email' id='email' placeholder='enter your email' className="form-control ms-2 " {...register('email')} />
<p className="text-danger text-start ms-3">{errors.email?.message}</p>
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-9 p-2 m-auto'>
                        <input type="password" name='password' id='password' placeholder='enter password' className="form-control ms-2 " {...register('password')} />
                        <p className="text-danger ms-3 text-start">{errors.password?.message}</p>

                    </div>        </div>
                <button type='submit' id='submit' className='btn btn-info btn-lg w-50 my-5'>Login</button>
                <div className='d-flex '>
                <div className='me-auto'><a className='text-danger btn btn-primary' href="/adminLogin">Login as Admin</a></div>

                <div className='ms-auto'><a className='text-primary me-auto' href="/Register">New to to here? Sign up</a></div>

            </div>
            </form>
           
        </div>
    )
}

export default Login