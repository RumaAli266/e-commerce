import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const AddProduct = () =>{
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const addProduct = async () =>{
        debugger
        if(!name || !price || !category || !photo || !company){
            setError(true)
            return false
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({
                name, price, category, photo, company, userId
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        navigate('/')
    }

 return(
  <div className='product'>
    <h1>Add Product</h1>
    <input type="text" placeholder='enter product name' className='inputBox'
    onChange={(e)=>{setName(e.target.value)}} value={name} />
    {error && !name && <span className='invalid-input'>Enter valid name</span>}

    <input type="text" placeholder='enter product price' className='inputBox'
    onChange={(e)=>{setPrice(e.target.value)}} value={price} />
    {error && !price && <span className='invalid-input'>Enter valid price</span>}

    <input type="text" placeholder='enter product category' className='inputBox' 
    onChange={(e)=>{setCategory(e.target.value)}} value={category} />
    {error && !category && <span className='invalid-input'>Enter valid category</span>}
    
    <input type="file" accept=".png, .jpg, .jpeg" name='photo' placeholder='upload photo' className='inputBox' 
    onChange={(e) => setPhoto(e.target.files[0])}  />
    {error && !photo && <span className='invalid-input'>upload image</span>}

    <input type="text" placeholder='enter product company' className='inputBox'
    onChange={(e)=>{setCompany(e.target.value)}} value={company} />
    {error && !company && <span className='invalid-input'>Enter valid company</span>}

    <button onClick={addProduct} className='addProductButton'>Add Product</button>
  </div>  
 )   
}

export default AddProduct