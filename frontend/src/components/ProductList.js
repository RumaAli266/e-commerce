import React, { useEffect, useState } from 'react'


const ProductList = () =>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    }, [])

    const getProducts = async() =>{
        let result = await fetch("http://localhost:5000/products");
        result = await result.json(); 
        setProducts(result)
    }
    return(
    <div className='product-list'>
    <h1 class="display-1" style={{margin:"20px"}}>Products Listing</h1>
        <div class="row row-cols-3 g-4">
        {products.map((data, key)=>{
            return(
                <div class="col" key={key}>
                    <div class="card" style={{margin:"20px"}}>
                    {/* <img src="..." class="card-img-top" alt="..."/> */}
                    <div class="card-body">
                        <h5 class="card-title">{data.name}</h5>
                        <h4 class="card-title">{data.price}</h4>
                        <h3 class="card-title">{data.category}</h3>
                        <p class="card-text">{data.company}</p>
                    </div>
                    </div>
                </div>
        )})}
        </div>
    </div>
)}

export default ProductList