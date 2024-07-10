import { useAuth } from "../../utils/authContext"
import { useEffect, useState } from "react"
import { userDatabase } from "../../appwrite.config"
import { Query } from "appwrite"

export function MyOrders(){
    const {  userDetails } = useAuth()
    const [userOrders, setUserOrders] = useState([]);
    
    useEffect(()=>{
        if(!userDetails){
            setUserOrders([])
        }
       
        let promise = userDatabase.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASEID,
            import.meta.env.VITE_APPWRITE_ORDER_COLLECT,
            [
                Query.equal('userID',[userDetails.$id])
            ]
        )
        promise.then((response)=>{setUserOrders(response.documents)}).catch((error)=>{console.log(error)})
    },[userDetails])
   
   
    return (
        <>  
            <div className='bg-gradient-to-r from-indigo-950 to-indigo-300 min-h-screen min-w-full flex flex-col font-sans text-lg p-3 font-bold'>
                <div><h1 className="text-2xl font-normal m-2">Your Orders</h1></div>
                {userOrders?
                userOrders.map((obj,index)=>(
                    <div key={index} className="min-h-64 min-w-full  bg-slate-700 mb-2 rounded-xl flex flex-col ">
                        {/* <div className="flex flex-row justify-between items-center p-3">from<h1 className="text-sky-400 text-3xl m-2 font-normal leading-7">{obj.username}</h1></div>
                        <hr/>
                        <div className="flex flex-row justify-between items-center p-3">on<h1 className="text-slate-100 font-normal text-lg">{formatDate(obj.datenow)}</h1></div>
                        <hr /> */}
                        <div className="flex flex-row justify-between items-center p-3">Measurement:<span className="text-slate-100 font-normal text-lg">{obj.length}mm*{obj.breadth}mm</span></div>
                        <hr />
                  
                        <div className="flex flex-row justify-between items-center p-3">Model:<span className="text-slate-100 font-normal text-lg">{obj.model}</span></div>
                        <hr />
                       
                        <div className="flex flex-row justify-between items-center p-3">Design:<span className="text-slate-100 font-normal text-lg">{obj.design}</span></div>
                        <hr />
                        <div className="flex flex-row justify-between items-center p-3">Rate:<span className="text-slate-100 font-normal text-lg">{obj.rate}.Rs</span></div>
                        
                    </div>
                ))
                :<p>No orders found!</p>}
            </div>
        </>
    )
}