const productRecords=require('../model/productModel')
 
const { Op } = require("sequelize")

exports.createProduct=async(req,res)=>{
    console.log(req.body, "..body")
   
    try {
        
        const{Id,product_name,product_price,product_category,UserId}=req.body
        const findProduct = await productRecords.findOne({ where: { product_name: product_name } });
       
  
      if (!findProduct) {
    
        const createProduct = await productRecords.create({
            Id:Id,
            product_name: product_name,
            product_price:product_price,
            product_category:product_category,
            UserId:UserId,
          
          })
        if (createProduct) {
            return res.status(200).json({ msg: "Product created successfully." })
        }
    }
    else{
        return res.status(409).json({ msg: "Product all ready exist." })

     }
    } catch (err) {
        console.log(err)
    }
}
exports.getProduct=async(req,res)=>
{
try {
            const getProduct = await productRecords.findAll({
                
            })       
            res.json(getProduct)
 }
    catch(err){
        console.log(err)

    }
}
exports.search=async(req,res)=>
{
    try{
        const{product_name}=req.query;
        console.log('product_name',product_name)
        const result=await productRecords.findAll({
            where:{
                product_name:{
                    [Op.like]: "%"+product_name+"%"
                }
            }
        })
        res.json(result)
    }
    catch(err)
    {
        console.log(err)
    }
}






exports.getProductDetails=async(req,res)=>
{
    console.log('request')
    const {product_name}=req.query
    console.log(product_name)
    try{
   const product=await productRecords.findOne({where:{product_name:product_name}})
   return res.status(200).json({success:true,product:product})
    }
    catch(error)
    {
        console.log(error)
    }
}
// exports.editProduct = async(req,res) =>{
//     const { id } = req.query;
//     const {product_name,product_category,product_price}=req.body
//     try{
//     const viweData = await productRecords.update(
//         { product_name, product_price, product_category },
//         { where: { id: { [Op.like]: id } } }
//       );
//     }
//     catch(err){
//         console.log(err)
//         if(viweData){
//             console.log("Update succesfuly")

//         }
//         else{
//             console.log("Product are not Update")
//         }
//     }
// }
exports.deleteProduct=async(req,res)=>{
    try{
        const data=await productRecords.destroy({
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
    
exports.editProduct = async (req, res) => {
    const { uname, uprice, ucategory, U_id } = req.body
    console.log(uname, uprice, ucategory,U_id )
    try {
        const product = await productRecords.update({
            product_name:uname ,
            product_price:uprice ,
            product_category:ucategory
        },
            { where: { Id:U_id} })

        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "not upate" })
    }
}
exports.changePassword=async(req,res)=>{
    


}


