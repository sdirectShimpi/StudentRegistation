

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import '../App.css';

const Login = () => {
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = (userData) => {
    axios
      .post('http://localhost:3008/login', userData)
      .then((res) => {
        console.log('login response', res);
        if (res.status === 200) {
          localStorage.setItem('islogin', true);
          localStorage.setItem('token', res.data.token);
          nav('/');
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message + ' 🚫');
        console.log(err);
      });
  };

  const [show, setShow] = React.useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/forgotPassword', {
        email: formik.values.userName,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send email. Please try again later.');
    }
  };

  return (
    <>
      <div className="container">
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
        <div className="body d-md-flex align-items-center justify-content-between">
          <div className="box-1 mt-md-0 mt-5">
            <img
              src="https://images.pexels.com/photos/12558234/pexels-photo-12558234.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              className=""
              alt=""
            />
          </div>
          <div className="box-2 d-flex flex-column h-100">
            <div className="mt-5">
              <p className="mb-1 h-1">Login</p>
              <p className="text-muted mb-2">Login to your account</p>
              <div className="d-flex flex-column ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email/Mobile
                    </label>
                    <input
                      type="text"
                      id="exampleInputEmail1"
                      className={`form-control ${
                        formik.touched.userName && formik.errors.userName ? 'is-invalid' : ''
                      }`}
                      {...formik.getFieldProps('userName')}
                    />
                    {formik.touched.userName && formik.errors.userName && (
                      <div className="invalid-feedback">{formik.errors.userName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="exampleInputPassword1"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                      }`}
                      {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  <div className="acb">
                    <button
                      type="Submit"
                      onClick={handleUpdate}
                      className="btn btn-primary"
                    >
                      Forgot Password
                    </button>
                  </div>

                  <p className="text-center text-muted mt-1 mb-0">
                    Register No{' '}
                    <Link onClick={(e) => e.target.value} to="/Signup">
                      <a href="#!" className="fw-bold text-body">
                        <u>Signup here</u>
                      </a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="i1">
                <input
                  type="email"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <br />
              <div>
                <button className="btn4" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;


