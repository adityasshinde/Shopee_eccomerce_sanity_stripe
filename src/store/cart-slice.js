
import { createSlice } from "@reduxjs/toolkit";
// import toast from 'react-hot-toast';

const cartSlice=createSlice({
    name:'cart',
    initialState:{cartItems:[],totalPrice:0,totalQuantities:0,showCart:false},
    reducers:{
    setShowCart(state){
       state.showCart=!state.showCart;
    },
    onAddtoCart(state,action){
        const newItem=action.payload;
        state.totalPrice+=newItem.price*newItem.qty;
        state.totalQuantities+=newItem.qty;
        const existingItem=state.cartItems.find(item=>item._id===newItem._id);
        if(!existingItem){
            state.cartItems.push(newItem);
        }else{
            existingItem.qty+=newItem.qty;
        }
        // toast.success('added to cart');
    },
    increaseQuan(state,action){
        const newItem=action.payload;
        state.totalPrice+=newItem.price;
        state.totalQuantities+=1;
        const existingItem=state.cartItems.find(item=>item._id===newItem._id);
        existingItem.qty+=1;
    },
    decreaseQuan(state,action){
        const newId=action.payload;
        const decreaseItem=state.cartItems.find(item=>item._id===newId);
        state.totalPrice-=decreaseItem.price;
        state.totalQuantities-=1;
        if(decreaseItem.qty===1){
            state.cartItems=state.cartItems.filter(item=>item._id!==newId);
             return;
        }
        decreaseItem.qty-=1;
    },
    removeItem(state,action){
            const newId=action.payload;
        const deleteItem=state.cartItems.find(item=>item._id===newId);
            state.totalPrice-=deleteItem.price*deleteItem.qty;
            state.totalQuantities-=deleteItem.qty;
            state.cartItems=state.cartItems.filter(item=>item._id!==newId);
    },
    clearCart(state){
       state.cartItems=[];
       state.totalPrice=0;
       state.totalQuantities=0;
    }
    }
})

export const cartActions=cartSlice.actions;
export default cartSlice;