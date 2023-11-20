import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
function Order() {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const user=decodeToken.user.Id
  const [data, setData] = useState([]);

  const getOrdercart = async () => {
    return axios
      .get( `http://localhost:3008/getorder?userId=${user}`)
     
      
      .then((response) => {
        console.log("this is response:", response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  

  useEffect(() => {
    getOrdercart();
  }, []);
  const handleDelete = async (Id) => {
    try {
      const orderDelete = await axios.delete(
        `http://localhost:3008/deletOrder/${Id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
     getOrdercart()
      console.log(orderDelete);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateTotalPrice = () => {
    let total = 0;
    data.length > 0 &&
      data.map((product) => {
        const productPrice = product.productRecord.product_price;
        const productCount = product.productCount;
        total += Number(productPrice) * Number(productCount);
      });
    return total;
  };
  
  const smileEmoji = String.fromCodePoint(0x1F604);
  const crossEmoji = String.fromCodePoint(0x274C);

return (
    <>
    <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>
         
   
           <h1>{smileEmoji} Order Record {smileEmoji} </h1>
          <p>Welocme:{decodeToken.user.firstName}</p>

          <div className="row">
            {data&&data.length>0&&data.map((product) => (
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
               <h3>Product-name: <h5 className="card-title">{product.productRecord.product_name}</h5></h3> 
               {/* <h3>Product-Price:   <h5 className="card-title">{product.productRecord.product_price}</h5></h3> */}
               <h5 className="card-title">€ :
                                    {(product.productCount)*(product.productRecord.product_price)}
                                  </h5>
               <h3>Quantity:   <h5 className="card-title">{product.productCount}</h5></h3>
              </div>
                <button className="btn5" onClick={() => handleDelete(product.Id)}>
                 {crossEmoji}
               </button> 
               
                 </div>
                   ))}
          </div>
          <h1>Total-Price:- <h3> ${calculateTotalPrice()}</h3></h1>
         
         
        </div>
      </section>
    
    
    </>
  )
}

export default Order