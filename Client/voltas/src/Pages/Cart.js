import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import jwt_decode from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";
import "../App.css";

import { useNavigate } from "react-router-dom";

function Cart() {
  const addCart = JSON.parse(localStorage.getItem("addCart"));
  

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const user = decodeToken.user.Id;
  const [data, setData] = useState([]);

  const getfromcart = async () => {
    const addCart = JSON.parse(localStorage.getItem("addCart"));
    return axios
      .get(`http://localhost:3008/getfromcart?userId=${user}`)

      .then((response) => {
        localStorage.setItem("addCart", JSON.stringify(response.data));
        console.log("this is response:", response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getfromcart();
  }, []);

  const orederItem = async (cart) => {
    return axios
      .post(`http://localhost:3008/order`, { cart: cart })

      .then((response) => {
        console.log("this is response:", response);
        setData(response.data);
        getfromcart();
      })
      .catch((err) => console.log(err));
  };

  const addorederItem = async (card) => {
    try {
      console.log("cart=", card);
      const response = await axios.post("http://localhost:3008/order", {
        product: card,
        userId: user,
      });
      // console.log('this is response:', response.data);

      if (response.data.success) {
        setData(response.data);
        navigate("/order");
        getfromcart();
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    data.length > 0 &&
      data.forEach((product) => {
        const productPrice = product.productRecord.product_price;
        const productCount = product.productCount;
        total += Number(productPrice) * Number(productCount);
      });
    return total;
  };
  const handleDelete = async (Id) => {
    try {
      const CartDelete = await axios.delete(
        `http://localhost:3008/cartdelete/${Id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(CartDelete);

      getfromcart();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleDelete();
  }, []);

  const handleAdd = async (product) => {
    const res = await axios.post("http://localhost:3008/quantityAdd", {
      productId: product.productRecord?.Id,
      userId: user,
    });
    console.log(res);
    getfromcart();
  };
  const handleSub = async (product) => {
    const res = await axios.post("http://localhost:3008/quantitySub", {
      productId: product.productRecord?.Id,
      userId: user,
    });
    console.log(res);
    getfromcart();
  };
  const smileEmoji = String.fromCodePoint(0x1f604);
  const crossEmoji = String.fromCodePoint(0x274c);

  const mankePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OEPA3SJhVOesViQDMUSp8DDBamezr3mxwRpDI1IxUmMSjcso2zt8U5vnOOHmZoIKp7hWotU58yEIbiTfMfbAFnC00emwTIsUb"
    );

    const body = {
      products: addCart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:3008/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    navigate('/success')
    if (result.error) {
      console.log(result.error);
      navigate('/Cancle')
    }
  };

  return (
    <>
      <section class="h-100 h-custom" style={{ backgroundColor: "d2c9ff" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div
                class="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 class="mb-0 text-muted">
                            item:-{addCart?.length}
                          </h6>
                        </div>
                        <hr class="my-4" />
                        {data.map((product) => (
                          <div class="row mb-4 d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=400"
                                class="img-fluid rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              {/* <h6 class="text-muted">Shirt</h6>
                                <h6 class="text-black mb-0">Cotton T-shirt</h6> */}
                              <h7>
                                Product-name:{" "}
                                <h8 className="card-title">
                                  {product.productRecord.product_name}
                                </h8>
                              </h7>

                              <h6>
                                {addCart.length}
                                Quantity:{" "}
                                <h5 className="card-title">
                                  {product.productCount}
                                </h5>
                              </h6>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                class="button "
                                onClick={() => {
                                  handleAdd(product);
                                }}
                                style={{
                                  marginTop: "2%",
                                  marginRight: "7%",
                                  height: "10%",
                                  width: "15%",
                                }}
                              >
                                +
                              </button>
                              Que:- {product.productCount}
                              <button
                                class="button "
                                onClick={() => {
                                  handleSub(product);
                                }}
                                style={{
                                  marginTop: "2%",
                                  marginRight: "7%",
                                  height: "10%",
                                  width: "15%",
                                }}
                              >
                                -
                              </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h5 className="card-title">
                                € :
                                {product.productCount *
                                  product.productRecord.product_price}
                              </h5>
                              <button
                                className="btn5"
                                onClick={() => handleDelete(product.Id)}
                              >
                                {crossEmoji}
                              </button>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" class="text-muted">
                                <i class="fas fa-times"></i>
                              </a>
                            </div>
                          </div>
                        ))}

                        <hr class="my-4" />

                        <div class="pt-5">
                          <h6 class="mb-0">
                            <a href="#!" class="text-body">
                              <i class="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 bg-grey">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">
                            items {addCart?.length}
                          </h5>
                          {/* <h5>€ 132.00</h5> */}
                        </div>

                        {/* <h5 class="text-uppercase mb-3">Shipping</h5>

                        <div class="mb-4 pb-2">
                          <select class="select">
                            <option value="1">Standard-Delivery- €5.00</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                          </select>
                        </div> */}

                        {/* <h5 class="text-uppercase mb-3">Give code</h5>

                        <div class="mb-5">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Examplea2"
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="form3Examplea2">
                              Enter your code
                            </label>
                          </div>
                        </div> */}

                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-5">
                          <h5 class="text-uppercase">Total price</h5>
                          <h3> ${calculateTotalPrice()}</h3>
                        </div>

                        <button
                          type="button"
                          class="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={() => {
                            addorederItem(data);
                          }}
                        >
                          Order Now
                        </button>
                        <div style={{ marginTop: "3%" }}>
                          <button
                            type="button"
                            class="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            onClick={() => {
                              mankePayment(data);
                            }}
                          >
                            CheeckOut
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Cart;
