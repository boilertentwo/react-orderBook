import {useContext,createContext,useEffect,useState} from 'react'
import { account, userDatabase, avatar  } from '../appwrite.config'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/subComponents/Loader'
import { ID, Query } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userId , setUserId] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate();
    const [error,setError] = useState();
    
    
    useEffect(()=>{
        checkUserStatus()  
    },[])



  
    const getAvatar = async (method) =>{
        setLoading(true)
        setError(null)
        try {
            const result = await avatar.getInitials(userDetails.name);
            method(result)
           
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    const updateDetails = async (name, email, password) => {
        setLoading(true);
        setError(null);
      
        try {
          let result, result2;
          try {
            result = await account.updateName(name);
          } catch (nameError) {
            setError(prev => ({ ...prev, nameError: nameError.message }));
          }
       
          try {
            result2 = await account.updateEmail(email, password);
          } catch (emailError) {
            setError(prev => ({ ...prev, emailError: emailError.message }));
          }
      
          if (result2) {
            setUserDetails(result2);  
          } else {
            setUserDetails(result); 
          }
      
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    const session = async(userInfo)=>{
        setLoading(true)
        try {
            await account.createSession(
                userId,
                userInfo.secret,
            )
            const result = await account.get()
            setUserDetails(result)
            setUser(result)
            
           
        } catch (error) {
            console.log('error occured:',error)
        }
        setLoading(false)
    }

    const loginUser = async (userInfo)=>{
        setLoading(true)
        try {
            const response = await account.createPhoneToken(
                ID.unique(),
                userInfo.mobileNo,
            )
            
            setUserId(response.userId)
            navigate('/register')
        } catch (error) {
            console.log(error)
        }
        
        setLoading(false)
    }

 



    const logoutUser = () => {
        setLoading(true)
        account.deleteSession('current')
        setUser(null)
        setUserId('')
        setUserDetails({})
        setLoading(false)
    }

   
    

    const checkUserStatus = async () => {
            try {
                const accountDeps = await account.get()
                setUserDetails(accountDeps)
                setUser(accountDeps)
                navigate('/')
            } catch (error) {
                navigate('/login')
            }
            setLoading(false)
    }

    const contextData = {
        user,
        userId,
        userDetails,
        loginUser,
        logoutUser,
        checkUserStatus,
        session,
        updateDetails,
        avatar,
        getAvatar,
        
    }

    return (
        <AuthContext.Provider value={contextData}>
                {loading? <Loader></Loader> :children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}