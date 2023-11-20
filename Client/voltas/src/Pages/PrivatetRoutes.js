import{Navigate,Outlet} from 'react-router-dom'
import Footer from '../Common/Footer'
import Navbar from '../Common/Navbar'

function PrivatetRoutes() {
  const islogin = localStorage.getItem("islogin")
  if(!islogin)
  {
    return <Navigate to="/Login"></Navigate>
    
  }

  return (
    <>
  <Navbar title="E-Commerce"/>
  <Outlet/>
  <Footer/>
  </>
  )
    
}

export default PrivatetRoutes