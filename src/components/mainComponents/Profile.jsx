import {useEffect, useState, useRef} from 'react'
import { account } from '../../appwrite.config'
import { useAuth } from '../../utils/authContext'
import { useNavigate } from 'react-router-dom'

export function Profile(){
    const {user,userDetails, getAvatar , logoutUser} = useAuth()
    const [avatar, setAvatar] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            getAvatar(setAvatar)
        }
        
    },[user,getAvatar])

    return(
        <>
           
                    <div className='h-fit rounded-lg size-36 self-center m-3'>

                        <img className='rounded-full' src={avatar} alt="avatar" />
                    </div>
                    <div className='h-16 text-center text-xl italic text-white flex flex-row justify-center  mb-3'>
                        <img src="src/assets/user-avatar-profile-svgrepo-com.svg" className='w-5 mx-3 pb-2' alt="" />
                        <h1>{userDetails.name}</h1>
                       
                    </div>
                   
                    <div className='h-16 text-center text-xl italic  flex flex-row justify-center  mb-3'>
                        <img src="src/assets/email-svgrepo-com.svg" className='w-5 mx-3 pb-2' alt="" />
                        <h1>{userDetails.email}</h1>
                       
                    </div>
                   
                    <div className='h-16 text-center text-xl italic  flex flex-row justify-center mb-3'>
                        <img src="src/assets/phone-svgrepo-com.svg" className='w-5 mx-2 pb-2' alt="" />
                        <h1>{userDetails.phone}</h1>
                        
                    </div>
                   
                        <div className='h-dvh flex flex-col justify-between mt-5'>
                                <div className='h-100'>
                                            <div onClick={()=>navigate('/orders')} className=' h-16 text-center content-center bg-slate-700 text-2xl rounded-md border-2 border-slate-500 active:bg-sky-700 '><p>My Orders</p></div>
                                            <div className=' h-16 text-center content-center bg-slate-700 text-2xl rounded-md border-2 border-slate-500 active:bg-sky-700'><p>My Address</p></div>
                                </div>
                       
                                <div>
                                        
                                            <div className=' h-16 text-center rounded-md content-center bg-slate-700 text-2xl  border-2 border-slate-500 active:bg-sky-700'><p>Payments</p></div>
                                            <div className=' h-16 text-center rounded-md content-center bg-slate-700 text-2xl  border-2 border-slate-500 active:bg-sky-700'><p>Preferences</p></div>
                                 </div>
                                <div>
                                        
                                            <div className=' h-16 text-center rounded-md content-center bg-slate-700 text-2xl  border-2 border-slate-500 active:bg-sky-700'><p>About us</p></div>
                                            <div className=' h-16 text-center rounded-md content-center bg-slate-700 text-2xl  border-2 border-slate-500 active:bg-sky-700'><p>Contact us</p></div>
                                 </div>
                       
                                <div>
                                            <div className='w-full h-16 text-center rounded-md flex flex-row justify-center bg-red-700 text-2xl text-black  border-2 border-slate-500 active:bg-sky-700' onClick={logoutUser}> 
                                                <img src="src/assets/logout-svgrepo-com (1).svg" className='w-12 ' alt="" />
                                            </div>
                                </div>
                        </div>
                   
                    
                    
    

        </>
    )
}