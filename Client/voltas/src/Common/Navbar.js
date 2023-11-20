//import { Button } from 'bootstrap'
import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';




const Navbar = (props) => {
  
   const navigate = useNavigate()
  const handleLogout =() =>{
    localStorage.clear()
    navigate('/Login')

  }
  const[show,setShow]=useState()

  const handleClose=()=>
{
  setShow(false)
}
const handleUpdate = () => {
  setShow(true)
}

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3008/changePassword', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
      },
    body: JSON.stringify(formData),
    });
    navigate('/Login')
  }
  catch(err)
  {
    console.log(err)
  }
}
  




// const formik = useFormik({
//   initialValues: {
//     password: '',
//    confirm_password: '',
    
//   },
//   validationSchema: Yup.object({
//     Password: Yup.string().required("Please provide a valid password"),
//     confirm_password:Yup.string().required().oneOf([Yup.ref('Password'),null],"Password must match")
//   }),
//   onSubmit: (values) => {
//     handleClose(values);
//   },
// });

    return (
      <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" href="#">{props.title}</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link"  to="/products">Products</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link"  to="/add-product">Add Product</Link>
              </li>
              {/* <li class="nav-item1">
                <Link class="cart" to="/cart">Cart</Link>
              </li> */}
                <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/cart">Cart</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/order">Order</Link>
              </li>
              
            </ul>
            <div>
              <button className='btn btn-primary logout' onClick={handleLogout}>LOGOUT</button>
            </div>
            <div>
              <button className='btn btn-primary logout' onClick={handleUpdate}>Change Password</button>
            </div>
            
          </div>
        </div>
      </nav>


      <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>UPDATE Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <form onSubmit={formik.handleSubmit}>
        <label htmlFor="product_name">Email</label>
          <br />
          <input
            className="inp1"
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <br></br>
          <label htmlFor="product_name">Password</label>
          <br />
          <input
            className="inp1"
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
           <label htmlFor="product_name">confirm_password</label>
           <input
            className="inp1"
            type="text"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
        </form> */}


<div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Current Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Change Password</button>
       
      </form>
      </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleFormSubmit}>
          Change Password
        </Button> */}
      </Modal.Footer>
    </Modal>
    </>
)
}

export default Navbar