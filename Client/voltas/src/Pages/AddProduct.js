

import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
  const [addProduct, setAddProduct] = useState({
    product_name: '',
    product_category: '',
    product_price: '',
    UserId: '',
  });
  const nav = useNavigate();

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      product_name: '',
      product_category: '',
      product_price: '',
      UserId: '',
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required('Product name is required'),
      product_category: Yup.string().required('Product category is required'),
      product_price: Yup.number().required('Product price is required').positive('Product price must be positive'),
      UserId: Yup.string().required('User ID is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post('http://localhost:3008/product', values);
        console.log(res);
        toast.success('Product added successfully!');
        nav('/products')
         // Reset the form to its initial state
      } catch (error) {
        toast.error(error.response.data.msg + ' 🚫');
        resetForm();
        console.log('Error:', error);
      }
    },
  });

  return (
    <>
      <center>
        <form className="form-horizontal" onSubmit={formik.handleSubmit}>
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
          <div className="form-group mt-2">
            <label className="col-md-4 control-label" htmlFor="product_id">
              User ID
            </label>
            <div className="col-md-4">
              <input
                id="product_id"
                name="UserId"
                value={formik.values.UserId}
                onChange={formik.handleChange}
                placeholder="User Id"
                className={`form-control input-md ${
                  formik.touched.UserId && formik.errors.UserId ? 'is-invalid' : ''
                }`}
                required
                type="text"
              />
              {formik.touched.UserId && formik.errors.UserId && (
                <div className="invalid-feedback">{formik.errors.UserId}</div>
              )}
            </div>
          </div>
          <div className="form-group mt-2">
            <label className="col-md-4 control-label" htmlFor="product_name">
              PRODUCT NAME
            </label>
            <div className="col-md-4">
              <input
                id="product_name"
                name="product_name"
                value={formik.values.product_name}
                onChange={formik.handleChange}
                placeholder="PRODUCT NAME"
                className={`form-control input-md ${
                  formik.touched.product_name && formik.errors.product_name ? 'is-invalid' : ''
                }`}
                required
                type="text"
              />
              {formik.touched.product_name && formik.errors.product_name && (
                <div className="invalid-feedback">{formik.errors.product_name}</div>
              )}
            </div>
          </div>
          <div className="form-group mt-2">
            <label className="col-md-4 control-label" htmlFor="product_categorie">
              PRODUCT CATEGORY
            </label>
            <div className="col-md-4">
              <select
                id="product_categorie"
                name="product_category"
                value={formik.values.product_category}
                onChange={formik.handleChange}
                className={`form-control ${
                  formik.touched.product_category && formik.errors.product_category
                    ? 'is-invalid'
                    : ''
                }`}
              >
                <option value="">select category</option>
                <option value="Phone">Phone</option>
                <option value="women's Wear">women's Wear</option>
                <option value="Men's Wear">Men's wear</option>
              </select>
              {formik.touched.product_category && formik.errors.product_category && (
                <div className="invalid-feedback">{formik.errors.product_category}</div>
              )}
            </div>
          </div>
          <div className="form-group mt-2">
            <label className="col-md-4 control-label" htmlFor="product_categorie">
              PRODUCT PRICE
            </label>
            <div className="col-md-4">
              <input
                className={`form-control ${
                  formik.touched.product_price && formik.errors.product_price ? 'is-invalid' : ''
                }`}
                type="text"
                name="product_price"
                value={formik.values.product_price}
                onChange={formik.handleChange}
                placeholder="Product_price"
              />
              {formik.touched.product_price && formik.errors.product_price && (
                <div className="invalid-feedback">{formik.errors.product_price}</div>
              )}
            </div>
          </div>
          <div className="form-group mt-2">
            <div className="col-md-4 mt-4 justify-item">
              <button type="submit" id="singlebutton" name="singlebutton" className="btn btn-primary logout">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </center>
    </>
  );
}

export default AddProduct;
