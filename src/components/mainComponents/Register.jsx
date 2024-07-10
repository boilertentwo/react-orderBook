import {useState , useEffect} from 'react'
import { useAuth } from '../../utils/authContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function Register(){
    const {session,user, userDetails} = useAuth()
    const {register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            if(!userDetails.name){
                navigate('/details')
            }
            else{
                navigate('/');
            }
            
        }
    }, [user, userDetails, navigate]);

    const onSubmit = (data)=>{
        session(data)
    }

    return(    
        <>
            <div className='h-screen w-full font-bold text-xl flex flex-row justify-center items-center bg-gradient-to-r from-blue-950 to-blue-300'>
                <form onSubmit={handleSubmit(onSubmit)} className='h-96 w-1/2 flex flex-col justify-around p-2'>
                    <div >
                        <label htmlFor="otp">Enter OTP:</label>
                        <input type="text" className='w-48' minLength={6} maxLength={6} {...register('secret',{required:'OTP is must!'})} /><br/>
                        {errors.secret&&<p className='text-red'>Please enter the OTP</p>}
                        <div className='w-48 h-10 bg-black text-white text-center content-center'><button type='submit'>Login</button></div>
                    </div>

                </form>
            </div>
                    
        </>
    )
}