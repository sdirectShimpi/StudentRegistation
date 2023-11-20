
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const nav = useNavigate();
  const formik = useFormik({
   initialValues : {
    firstName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validationSchema : Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    mobileNumber: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  }),
  onSubmit: async (values, { resetForm }) => {
    axios
      .post('http://localhost:3008/Signup', values)
      .then((res) => {
        console.log('login response', res.data);
        toast.success(res.data.Message);
        
        nav('/login')
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error(error.response.data.Message + ' 🚫');
        resetForm();
      });
  }
});

  return (
    <>
      <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center">Create an account</h2>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-outline">
                        <input
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">First Name</label>
                        {formik.touched.firstName && formik.errors.firstName ? (
                          <div className="invalid-feedback">{formik.errors.firstName}</div>
                        ) : null}
                        <br/>
                        <input
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">Last Name</label>
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <div className="">{formik.errors.lastName}</div>
                        ) : null}
                        <br/>
                        <input
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">Address</label>
                        {formik.touched.address && formik.errors.address ? (
                          <div className="">{formik.errors.address}</div>
                        ) : null}
                        <br/>
                         <input
                          name="mobileNumber"
                          value={formik.values.mobileNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.mobileNumber && formik.errors.mobileNumber ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">mobileNumber</label>
                        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                          <div className="">{formik.errors.mobileNumber}</div>
                        ) : null}
                      </div>
                      <br/>
                      <input
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.emailpassword && formik.errors.email ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">email</label>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="">{formik.errors.email}</div>
                        ) : null}
                        <br/>
                        <input
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">password</label>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="">{formik.errors.password}</div>
                        ) : null}
                        <br/>
                        <input
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          id="form3Example1cg"
                          className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : 'null'}`}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">confirmPassword</label>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                          <div className="">{formik.errors.confirmPassword}</div>
                        ) : null}
                    
                      
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-1 mb-0">
                        Have already an account?
                        <Link to="/">
                          <a href="#!" className="fw-bold text-body">
                            <u>Login here</u>
                          </a>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;

