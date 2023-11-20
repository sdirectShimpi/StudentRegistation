const userRecords=require('../model/userModel')
const cartRecords = require('../model/cartModel');
const productRecords = require('../model/productModel');


exports.addToCart = async (req, res) => {
  const {userId, productId, productCount } = req.body;
 
  try {
    const existingCartItem = await cartRecords.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      await existingCartItem.update({ 
        productId: productId,
        productCount: productCount ,
      });
      return res.status(200).json({
        success: true,
        message: 'Product count updated in the cart',
      });
    } else {
      await cartRecords.create({
        userId: userId,
        productId: productId,
        productCount: productCount,
      });
      return res.status(201).json({
        success: true,
        message: 'Product added to the cart',
      });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getfromcart = async (req, res) => {
  const { userId } = req.query;
  
  try {
    const getcart = await cartRecords.findAll({
      where: {
        userId: userId,
      },
      include: 
        [{
          model: productRecords,
           
        },]
      
    });
    
    res.status(200).json(getcart)
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching cart data" });
  }
};
exports.deleteCart=async(req,res)=>{
  try{
      const data=await cartRecords.destroy({
          where:{
              Id: req.params.Id
          }
      })
      return res.status(200).json({success:true, data:data, message: ' cart delete successfully'})
      console.log(data)
  }
  catch(err)
  {
      return res.json({err})
  }

}
exports.quantityAdd = async (req, res) => {
  const { productId } = req.body
  const { userId } = req.body;
  try {

      const item = await cartRecords.findOne({
          where:
          { userId: userId,
              productId: productId,
              
          }
      })
     
      const product = await cartRecords.update({
          productCount:+(item.productCount) + 1
     },
     {
      where:{
        productId:productId,
           userId:userId
        }})
  return res.status(200).json({success:true,product:product})
  }
catch(e)
{
  console.log("error=",e)
  return res.status(404).json({success:false,msg:"error"})
}
}

exports.quantitySub = async (req, res) => {
  
  const { productId } = req.body
  const { userId } = req.body;
  
  try {

      const item = await cartRecords.findOne({
          where:
          { userId: userId,
              productId: productId,
              
          }
      })
    
      if(item){

          if(item.productCount>1)
          {
  
              const product = await cartRecords.update({
                  
                  productCount:item.productCount-1
             },
             {where:{
              productId:productId,
              userId:userId
        }})
         return res.status(200).json({success:true,product:product})
             }
      }
         
  }
catch(e)
{
  console.log("error=",e)
  return res.status(404).json({success:false,msg:"error"})
}
}





