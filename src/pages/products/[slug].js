import React, { useState } from 'react';
import { client,urlFor } from 'lib/client';
import { AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import getStripe from 'lib/getStripe';


const ProductDetails = ({product,products}) => {
    const {image,name,details,price,_id}=product;
    const [index,setIndex]=useState(0);
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const handleCheckout = async () => {
      const item=[{
        _id:_id,
        image:image,
        name:name,
        price:price,
        qty:qty
      }]
      const stripe = await getStripe();
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      if(response.statusCode === 500) return;
      
      const data = await response.json();
  
      // toast.loading('Redirecting...');
  
      stripe.redirectToCheckout({ sessionId: data.id });
    }
  
    const addQty=()=>{
      if(qty===100){return}
      setQty(qty+1);
    };
    const decQty=()=>{
      if(qty===1){return}
      setQty(qty-1);
    };
    const onAdd=()=>{
      const item={
        _id:_id,
        image:image,
        name:name,
        price:price,
        qty:qty
      }
      dispatch(cartActions.onAddtoCart(item));
    }
  return (
    <div>
      <div className='product-detail-container'>
        <div>
        <div className='image-container'>
            <img src={urlFor(image && image[index])}
            className='product-detail-image'/>
        </div>
        <div className='small-images-container'>
            {image?.map((item,i)=>(
                <img
                key={i}
                src={urlFor(item)}
                className={i===index ? 'small-image selected-image':'small-image'}
                onMouseEnter={()=>setIndex(i)}
                />
            ))}
        </div>
        </div>
        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
               <div>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
               </div>
               <p>(20)</p>
            </div>
             <h4>Details:</h4>
              <p>{details}</p>
              <p className='price'>Rs.{price}</p>
              <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                   <span className='minus' onClick={decQty}>
                    <AiOutlineMinus/>
                   </span>
                   <span className='num'>
                    {qty}
                   </span>
                   <span className='plus' onClick={addQty}>
                    <AiOutlinePlus/>
                   </span>
                </p>
              </div>
              <div className='buttons'>
                <button type='button'
                className='add-to-cart'
                onClick={onAdd}>Add to Cart</button>
                <button type='button'
                className='buy-now'
                onClick={handleCheckout}>Buy Now</button>
              </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
              {products.map((item)=>(
                <Product key={item._id}
                product={item}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths=async()=>{
    const query=`*[_type=="product"]{
        slug{
            current
        }
    }`;
    const products=await client.fetch(query);
    const paths=products.map((product)=>({
        params:{
                slug:product.slug.current
        }
    }));

    return{
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps=async ({params:{slug}})=>{
    const query=`*[_type=="product" && slug.current=='${slug}'][0]`;
    const productQuery='*[_type=="product"]'
    const product=await client.fetch(query);
    const products=await client.fetch(productQuery);

    return {
       props:{products,product}
    }
}
export default ProductDetails
