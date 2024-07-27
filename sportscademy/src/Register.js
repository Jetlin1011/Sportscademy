import React, { useState } from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'


const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().min(10).max(16).required(),
    gender: yup.string().required(),
    phone: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
    confirmPassword:yup.string().oneOf([yup.ref("password"), null]).required()        


})

function Register() {


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })


    const [user, setUser] = useState("")

    const submitForm = (data) => {

        setUser(data)
        axios.post('http://localhost:8000/register', data).then(result => {
            if (result) {
                alert("new user added")
                reset();

            }
            else {
                alert(result.data.message)
            }
        }).catch(result => {
            alert("user alredy present")
        })

    }
    return (
        <div className='body d-flex align-items-center justify-content-center w-100 '>
            <form onSubmit={handleSubmit(submitForm)} action="" className='col-10 col-lg-6 col-md-7 col-sm-10 bg-primary p-3 shadow-lg rounded-3'>
                <input type="text" name='name' id='name' placeholder='enter name' className="mt-5 form-control" {...register('name')} />
                <p className="text-danger text-start ms-2">{errors.name?.message}</p>
                <input type="text" name='age' id='age' placeholder='enter age in number' className="my-3 form-control" {...register('age')} />
                <p className="text-danger text-start ms-2">{errors.age?.message}</p>

                <div className='w-25 text-info'>
                    <div className="form-check ">
                        <input className="form-check-input bg-success" type="radio" name="gender" value={'boy'} id="boy" {...register('gender')} />
                        <label class="form-check-label " for="boy">
                            <strong>Boy</strong>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input bg-success" type="radio" name="gender" id="girl" value={'girl'} checked {...register('gender')} />
                        <label class="form-check-label" for="girl">
                            <strong>Girl</strong>
                        </label>
                    </div>
                </div>
                <input type="text" name='phone' id='phone' placeholder='Phone Number' className=" my-3 form-control" {...register('phone')} />
                <p className="text-danger text-start ms-2">{errors.phone?.message}</p>

                <input type="email" name='email' id='email' placeholder='Email' className="my-3 form-control" {...register('email')} />
                <p className="text-danger text-start ms-2">{errors.email?.message}</p>

                <input type="password" name='password' id='password' placeholder='create passowrd' className="my-3 form-control  " {...register('password')} />
                <p className="text-danger text-start ms-2">{errors.password?.message}</p>

                <input type="password" name='confirmPassword' id='confirmPassword' placeholder='confirm password' className="my-3 form-control" {...register('confirmPassword')} />
                <p className="text-danger text-start ms-2">{errors.confirmPassword?.message}</p>

                <div className="d-flex mb-3">
                    <div className="me-auto"><button type='submit' className="btn rounded-pill btn-info">Sumbit</button></div>
                    <div className="ms-auto"><a href="/login" className='link-underline-success text-info'>Sign in</a></div>
                </div>


            </form>
        </div>
    )
}

export default Register