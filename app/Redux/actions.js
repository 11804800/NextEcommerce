"use client";
import { showCart } from "../menu/cart";
import { postSave, showSave } from "./save";
import { addCart } from "../menu/cart";
import { postOrder } from "./Order";

export const login = (creds) => (dispatch) => {
    return fetch('https://eccomerce-tazon.onrender.com/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(creds)
    })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                console.log(response.token);
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        });

};


export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    console.log('logged out');
};






export const UpdateQuantity = (Num, id) => (dispatch) => {
    const newCart = {
        Quantity: Num
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/cart/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(newCart),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Status " + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}


export const DeleteCart = (id) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/cart/${id}`,
        {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Status " + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then((response) => response.json())
        .then((data) => dispatch(showCart(data)))
        .catch((error) => console.log(error));
}





export const Updatecart = (include,id,quantity,productid) => (dispatch) => {
    const newCart = {
        ProductId:productid,
        Quantity:quantity,
        include: include
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/cart/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(newCart),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Status " + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then((response) => response.json())
        .then((res)=>showCart(res))
        .catch((error) => console.log(error));
}

export const PostSave = (id, cartId) => (dispatch) => {
    const newCart = {
        ProductId: id
    };
    dispatch(DeleteCart(cartId));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/save`,
        {
            method: "Post",
            body: JSON.stringify(newCart),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Status " + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then((response) => response.json())
        .then((data) => dispatch(postSave(data)))
        .catch((error) => console.log(error));
}


export const DeleteSave = (id) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/save/${id}`,
        {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error("Status " + response.status + " " + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then((response) => response.json())
        .then((data) => dispatch(showSave(data)))
        .catch((error) => console.log(error));
}


export const AddToCart = (id, SaveId) => (dispatch) => {
    const newProduct = {
        ProductId: id
    };
    dispatch(DeleteSave(SaveId));
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
        .then((response) => response.json())
        .then((data) => dispatch(addCart(data)))
        .catch((err) => console.log(err));
}


export const postTemp = (id, quantity) => (dispatch) => {
    const newItem = {
        ProductId: id,
        Quantity: quantity
    };
    
    return fetch('https://eccomerce-tazon.onrender.com/temp', {
        method: "Post",
        body: JSON.stringify(newItem),
        headers: {
            "Content-type": "Application/json"
        }
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export const deleteTemp = () => (dispatch) => {
    return fetch("https://eccomerce-tazon.onrender.com/temp", {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': "application/json"
        }
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export const DelTempItem = (id) => (dispatch) => {
    return fetch(`https://eccomerce-tazon.onrender.com/temp/${id}`,
        {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                'Content-Type': "application/json"
            }
        }).then((response) => response.json())
        .catch((error) => console.log(error));
}

export const Updatetemp = (id, quantity) => (dispatch) => {
    const newItem = {
        Quantity: quantity
    };
    return fetch(`https://eccomerce-tazon.onrender.com/temp/${id}`, {
        method: "Put",
        body: JSON.stringify(newItem),
        headers: {
            "Content-type": "Application/json"
        }
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export const PlaceOrder = (id, quantity, date, type, method, address) => (dispatch) => {
    const newItem = {
        ProductId: id,
        Quantity: quantity,
        deliverydate: date,
        paymentMethod: method,
        address: address
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`https://eccomerce-tazon.onrender.com/order`,
        {
            method: "Post",
            body: JSON.stringify(newItem),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": bearer
            },
            credentials: "same-origin"
        })
        .then((response) => response.json())
        .then((response) => dispatch(postOrder(response)))
        .catch((error) => console.log(error));
}