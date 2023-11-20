import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Product.css";
import "bootstrap/dist/css/bootstrap.css";
import jwt_decode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

function Product() {
  const token = localStorage.getItem("token");
  var decodeToken = jwt_decode(token);
  console.log(decodeToken, "DT");
  const user = decodeToken.user.Id;
  
  console.log(decodeToken);
  const userid = decodeToken;
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [con, setCon] = useState("");
  const [editData, setEditData] = useState([]);
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [productCount, setProductCount] = useState(1);
  const [show, setShow] = useState(false);
  const [addProduct, setAddProduct] = useState({
    product_name: "",
    product_category: "",
    product_price: "",
  });

  const handleClose = () => {
    setShow(false);
  };
  const handelAdd = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
  };
  const handleFind = async (product_name) => {
    const res = await axios.post(
      `http://localhost:3008/find?name=${product_name}`
    );
    if (res.data.success === true) {
      console.log(res.data.product);
      await setEditData(res.data.product);
      console.log("edit data");
      await console.log(editData);
    }
  };
  const handleupdate = (e) => {
    e.preventDefault();
    const { product_name, product_price, product_category } = con;

    axios
      .patch(`http://localhost:3008/editProduct`, {
        product_name,
        product_price,
        product_category,
      })
      .then((response) => {
        console.log(response);
      });
  };
  const handleSearch = async (e) => {
    const item = e.target.value;
    setVal(item);

    const res = await axios.get(
      `http://localhost:3008/searchdata?product_name=${item}`
    );
    console.log("searched", res.data);

    setData(res.data);
  };

  const getProduct = async () => {
    return axios
      .get(`http://localhost:3008/getProduct`)
      .then((response) => {
        console.log("this is response:", response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [update, setUpdate] = useState([]);
  const handleUpdate = (product) => {
    setShow(true);
    console.log("product=", product);

    setUpdate(product);

    console.log("Update state: ", state);
  };

  const handleDelete = async (Id) => {
    try {
      const ProductDelete = await axios.delete(
        `http://localhost:3008/deleteProduct/${Id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      getProduct();
      console.log(ProductDelete);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleDelete();
  }, []);

  const [state, setState] = useState({
    uname: "",
    uprice: "",
    ucategory: "",
    U_id: "",
  });
  useEffect(() => {
    const changeState = {
      U_id: update.Id,
      uname: update.product_name,
      uprice: update.product_price,
      ucategory: update.product_category,
    };
    setState(changeState);
  }, [update]);

  const handleCHange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleUSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3008/editProduct", state);
    console.log("Update response: ", res);

    getProduct();
  };
  const nav = useNavigate();
const handleCart = async (productId) => {
    try {
      if (isNaN(userId) || isNaN(productId) || isNaN(productCount)) {
        throw new Error("Invalid input data");
      }

      const res = await axios.post("http://localhost:3008/cart", {
        userId: parseInt(decodeToken.user.Id),
        productId: parseInt(productId),
        productCount: parseInt(productCount),
      });
      console.log("Cart response: ", res.data);
      nav("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const addToCartEmoji = String.fromCodePoint(0x1F6D2);
  
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>
          <input
            type="text"
            name="search_bar"
            value={val}
            onChange={handleSearch}
            placeholder="Search...."
          ></input>
          <br></br>
          <p>Welocme:{decodeToken.user.firstName}</p>

          <div className="row">
            {data.map((product) => (
              <div
                className="card col-3 m-2"
                editProductstyle={{ width: "50rem" }}
              >
                <img
                  src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=400"
                  class="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_name}</h5>
                  <h5 className="card-title">{product.product_price}</h5>
                  <h5 className="card-title">{product.product_category}</h5>
                  <p className="card-text"></p>
                  <div className="div">
                    <button
                      className="btn1"
                      onClick={() => handleDelete(product.Id)}
                    >
                      DELETE
                    </button>

                    <button
                      className="btn2"
                      type="button"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                  </div>
                  <br />
                 
                  <button className="bc1" onClick={() => handleCart(product.Id, productCount)}>
                    {addToCartEmoji}
                  </button>
                  
                  <select className="sel"
                    name="productCount"
                    onChange={(e) => {
                      setProductCount(parseInt(e.target.value)); 
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label for="product_name">Product_name</label>
            <br></br>

            <input
              className="inp1"
              type="text"
              name="uname"
              value={state.uname}
              onChange={handleCHange}
            />
            <label for="product_category">Product_category</label>
            <br></br>
            <input
              className="inp2"
              type="text"
              name="ucategory"
              value={state.ucategory}
              onChange={handleCHange}
            />
            <br></br>
            <label for="product">Product_Price</label>
            <br></br>

            <inputstate
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUSubmit}>
            UPDATE PRODUCT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Product;
