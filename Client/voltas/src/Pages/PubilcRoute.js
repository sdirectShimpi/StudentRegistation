import {Navigate, Outlet} from 'react-router-dom'
function PubilcRoute() {
    const islogin =localStorage.getItem("islogin")
    if(islogin)
    {
      return<Navigate to="/"></Navigate>
    }
  return <Outlet/>
    }

export default PubilcRoute