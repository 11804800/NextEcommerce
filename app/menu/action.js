"use client";
import { PostComments } from "../menu/comments";
import { addCart } from "./cart";
export const PostComment = (Id, rating,comment) => (dispatch) => {
    const newComment = {
        productId: Id,
        rating:rating,
        comment: comment
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch('https://eccomerce-tazon.onrender.com/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": bearer
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((comments) => dispatch(PostComments(comments)))
        .catch((err) => {console.log(err),alert("Could not post your comment")});
};


export const AddToCart = (id) => (dispatch) => {
    const newProduct = {
        ProductId: id
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch('https://eccomerce-tazon.onrender.com/cart', {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'Application/json',
            "Authorization": bearer
        },
        credentials: "same-origin"
    }).
        then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Status' + response.statusCode + " Text " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => { throw error }
        )
        .then((response)=>response.json())
        .then((cart)=>dispatch(addCart(cart)))
        .catch((err)=>console.log(err));
}




export const postTemp=(id,quantity)=>(dispatch)=>{
    const newItem={
        ProductId:id,
        Quantity:quantity
    };
    return fetch('https://eccomerce-tazon.onrender.com/temp',{
     method:"Post",
     body:JSON.stringify(newItem),
     headers:{
        "Content-type":"Application/json"
     }  
    })
    .then((response)=>response.json())
    .catch((error)=>console.log(error));
}
