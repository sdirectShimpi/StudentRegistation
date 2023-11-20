// const orderRecord=require('../model/orderModel')
//
// const userRecords=require('../model/userModel')

// exports.orederItem = async (req, res) => {
//     const { userId, productId, productCount, total } = req.body;

//     try {
//       const newOrder = await orderRecord.create({
//         userId,
//         productId,
//         productCount,
//         total: productCount * productRecord.product_price,
//       });

//       res.status(201).json(newOrder);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while creating the order' });
//     }
//   };

const orderRecord = require("../model/orderModel");
const cartRecords = require("../model/cartModel");
const productRecord = require("../model/productModel");
const userRecords = require("../model/userModel");

exports.orederItem = async (req, res) => {
  const { product } = req.body;
  
  const { userId } = req.body;
   try {
    {
      product &&
        product.length > 0 &&
        product.map(async (item) => {
          const order = await orderRecord.create({
            userId: userId,
            productId: item.productId,
            productCount: item.productCount,
            total: item.productCount * item.productRecord.product_price,
          });

          const deletecart = await cartRecords.destroy({
            where: {
              userId: item.userId,
              productId: item.productId
            },
          });
        });
    }
 console.log("try succedd")
    return res.status(200).json({success:true, msg: "order place" });
  } catch (e) {
    console.log("error=", e);
    return res.status(404).json({ msg: " try again " });
  }
};

exports.getOrder = async (req, res) => {
  const { userId } = req.query;
  try {
    const getOrder = await orderRecord.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: productRecord,
        },
      ],
    });

    res.status(200).json(getOrder);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching order data" });
  }
};
exports.deletOrder=async(req,res)=>{
  try{
      const data=await orderRecord.destroy({
          where:{
              Id: req.params.Id
          }
      })
      return res.status(200).json({data:data})
      console.log(data)
  }
  catch(err)
  {
      return res.json({err})
  }

}
