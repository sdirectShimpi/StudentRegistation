const express = require("express");
const app = express();
const route = require("./route/router");
const router = require("./route/productRouter");
const cartRecords = require("./model/cartModel");
const stripe = require("stripe")(
  "sk_test_51OEPA3SJhVOesViQVHqHGS6mHEjjU4AkTL4Sbe18FHcsFpPoweyAAjotD9ENlbijHKTLM9oMt6SmA7g2jAWHn6zk00w9mbj0uP"
);

require("./config/db");

const cors = require("cors");
const syncingTable = require("./model/tableSync");
app.use(cors({ origin: "http://localhost:3000" }));

syncingTable();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create-checkout-session", async (req, res) => {
    
  const { products } = req.body;
  console.log("products",products)
  const lineItems = products.map((product) => {
    const price = parseFloat(product.productRecord.product_price); 
    console.log("Product Price: ", price);
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.productRecord.product_name,
        },
        unit_amount: price * 100,
      },
      quantity: parseInt(product.productCount),
    };
  });
  
  


//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: product.product_name,
//         //images:[product.imgdata]
//       },
//       unit_amount: product.product_price * 100,
//     },
//     quantity: product.productCount,
//   }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({id:session.id})
});



app.use("/", route);
app.use("/", router);

app.listen(3008, console.log("server is runing"));
