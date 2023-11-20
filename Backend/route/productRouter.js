const express=require('express')
const router=express.Router()



const {orederItem,getOrder,deletOrder}=require('../controller/orderController')
const {addToCart,getCart,getfromcart,deleteCart,quantityAdd,quantitySub}=require('../controller/cartController')
const{createProduct,getProduct,search,editProduct,deleteProduct,getProductDetails}=require('../controller/productController')
router.post('/product',createProduct)
router.get('/getProduct',getProduct)
router.get('/searchdata',search)
router.post('/find',getProductDetails)
router.post('/editProduct',editProduct)
router.delete('/deleteProduct/:Id',deleteProduct)
router.post('/cart',addToCart)
// router.get('/getCart',getCart)
router.get('/getfromcart',getfromcart)
router.delete('/cartdelete/:Id',deleteCart)
router.post('/order',orederItem)
router.get('/getorder',getOrder)
router.delete('/deletOrder/:Id',deletOrder)
router.post('/quantityAdd',quantityAdd)
router.post('/quantitySub',quantitySub)



module.exports=router