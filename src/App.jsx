import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Login } from './components/mainComponents/Login'
import { Register } from './components/mainComponents/Register'
import { Trial } from './components/mainComponents/Trail'
import { PrivateRoutes } from './utils/privateRoutes'
import Home from './Home'
import { AuthProvider } from './utils/authContext'
import GeolocationComponent from './components/mainComponents/Map'
import { Details } from './components/mainComponents/Details'
import { MyOrders } from './components/mainComponents/Orders'

export default function App(){
  return(
    <>
      <Router>

      <AuthProvider>
        <Routes>
        
                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register/>} />
                 
            <Route element={<PrivateRoutes/>}>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/server' element={<Trial/>} />
                    <Route path='/details' element={<Details/>}></Route>
                    <Route path='/orders' element={<MyOrders/>}></Route>
                    <Route path='/maps' element={<GeolocationComponent/>}/>
            </Route>
              
        </Routes>
      </AuthProvider>
        
      </Router>


    </>
  )
}
