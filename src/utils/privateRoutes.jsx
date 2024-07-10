import { Outlet, Navigate} from 'react-router-dom'
import { useAuth } from './authContext';


export function PrivateRoutes(){
    const { user } = useAuth();
    return ( user  ? <Outlet/> : <Navigate to='/login'/>
        )
}

