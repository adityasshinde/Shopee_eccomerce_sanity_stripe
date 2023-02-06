import React from 'react';
import Link from 'next/link';
import Cart from './Cart';
import {AiOutlineShopping} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart-slice';


const Navbar = () => {
  const totalQuantity=useSelector(state=>state.cart.totalQuantities);
  const showCart=useSelector(state=>state.cart.showCart);
  const dispatch=useDispatch();
  const showCartHandler=()=>{
    dispatch(cartActions.setShowCart());
  }
  return (
    <div className='navbar-container'>
       <p className='logo'>
           <Link href='/'>Shopify</Link>
       </p>
       <button type='button'
       className='cart-icon' onClick={showCartHandler}>
        <AiOutlineShopping/>
      <span className='cart-item-qty'>{totalQuantity}</span>
       </button>
       {showCart && <Cart/>}
    </div>
  )
}

export default Navbar
