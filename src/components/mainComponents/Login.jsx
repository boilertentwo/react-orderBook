import { useAuth } from "../../utils/authContext";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

export function Login() {
    const { user, loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


  

    const onSubmit = (data) => {
        
        loginUser(data)
    };
   


    return (
        
        <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-950 to-blue-300">
            
            
            <h1 className='italic overline text-center font-serif text-3xl font-black mb-36'>.orderBook</h1>
           <form className="flex flex-col justify-around font-medium text-2xl" onSubmit={handleSubmit(onSubmit)}> 
                <div>
                    <label htmlFor="phonenumber">Enter your Phone No:</label><br />
                 
                    <input
                        type="text"
                        id="phonenumber"
                        className="h-10 w-full "
                        minLength={13}
                        maxLength={13}
                        {...register('mobileNo', { required: 'Enter your Phone Number', validate: value => value.startsWith('+91')||'Add +91 to your number' })}
                    /><br/>
                    {errors.mobileNo && <p className="text-red">Phone number is required!</p>}
                    <button className="h-12 w-full bg-black font-light text-white mt-3" type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    );
}
