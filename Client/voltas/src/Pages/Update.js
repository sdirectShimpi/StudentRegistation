import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function Edit(props) {{

    console.log(props.editData.name)
    const [state,setState]=useState({
        id:"",
        product_name:"",
        product_price:"",
        product_category:""
});

useEffect(() => {
    const changeState = {
        id:props.editData.id,
        product_name:props.editData.product_name,
        product_price:props.editData.product_price,
        product_category:props.editData.product_category
    }
    setState(changeState)
}, [props])

console.log(state.product_name)
    
    const handleState=(e)=>
    {
        e.preventDefault()
        setState({...state,[e.target.name]:e.target.value})
    }
   
const handleSubmit=async(e)=>
{
    e.preventDefault();
    props.setActive(false);
    {
        props.getProduct();
    }
}
   
    console.log(props)
  return (
    <div>
     <h1>EDIT PRODUCTS HERE</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={state.product_name} class="inp2" onChange={handleState} placeholder='ENTER NAME'  />

        <input type="text" name='price' value={state.product_price} class="inp2" onChange={handleState}  required 
          placeholder='ENTER PRICE'/>

        <select name="category"   value={state.product_category} class="inp2" onChange={handleState}  required>
          <option value="">Select category</option>
          <option value="category1">Phone</option>
          <option value="category2">women's Wear</option>
          <option value="category2">Men's wear</option>
        </select>
        <input type="submit"  class="inp4" value="EDIT PRODUCT" />
      </form>
    </div>
  )
}
}
