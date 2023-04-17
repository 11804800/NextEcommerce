"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle, Button, Table } from "reactstrap";
import { showCart, addCart } from "../menu/cart";
import { showProducts } from "../Redux/products";
import { UpdateQuantity, DeleteCart, PostSave, postTemp, Updatecart } from '../Redux/actions';
import Save from "./save";
import Link from "next/link";
import Styles from './page.module.css';
import { useState } from "react";
import {Auth,users} from '../Redux/auth';

export default function cart() {
    const product = useSelector((state) => {
        return state.product.All
    });
    const dispatch = useDispatch();
    const id = useSelector((state) => {
        return state.cart.value
    });
    const creds=useSelector((state)=>{
        return state.auth.creds
    });
    //const [total,setTotal]=useState(0);
    const [state, setState] = useState(true);
    useEffect(() => {
        const item = async () => {
            const res = await fetch("https://eccomerce-tazon.onrender.com/cart");
            const resp = await fetch('https://eccomerce-tazon.onrender.com/product/All');
            const data = await res.json();
            const products = await resp.json();
            dispatch(showProducts(products));
            dispatch(showCart(data));
            dispatch(users());
            console.log(products);
        };
        item();
    }, []);

    const HandleTemp = () => {
        id.filter((item)=>item.buyer.username===creds.username).filter((item)=>item.include===true).map((item) => {
            return (
                dispatch(postTemp(item.ProductId, item.Quantity))
            )
        })
    }
    const total = id.filter((item)=>item.buyer.username===creds.username).filter((item) => item.include === true).reduce((tol, curr) =>
        tol + product.filter((Elem) => Elem._id === curr.ProductId).map((Elem) => Elem.price) * curr.Quantity
        , 0);


    const deletecart = (Id, quantity,productid) => {
        dispatch(Updatecart(false, Id,quantity,productid))
    }
    const HandleSelect = (id,quantity,productid) => {
        dispatch(Updatecart(true, id,quantity,productid))
    }
    // const total = this.props.orderdish.reduce((a, v) => a + v.price * v.quantity, 0);

    return (
        <div className="container p-2">
            <div className="row justify-content-center p-4" >
                <div className="col-12 col-md-12 p-2">
                    <h1>Shopping Cart</h1>
                    <h7 className={Styles.text3}>Cart items :({id.length} items)</h7>
                </div>
                <div className="col-12 col-md-9 p-2">
                    <div className={Styles.align}>
                        <p className={`${Styles.text3} p-5 pt-0 pb-0`}>Price</p>
                    </div>
                    <hr />
                    {
                        id.filter((item)=>item.buyer.username===creds.username).map((item) => {
                            return (
                                <div>
                                    {
                                        product.filter((ELem) => ELem._id === item.ProductId).map((ELem) => {
                                            return (
                                                <div className={`${Styles.box1} p-3 row  justify-content-center`}>
                                                    <div className="col-1 col-md-1 m-auto">
                                                        {item.include ?
                                                            <input type="checkbox" defaultChecked onChange={() => deletecart(item._id,item.Quantity,ELem._id)}>
                                                            </input> :
                                                            <input type="checkbox" onChange={() => HandleSelect(item._id,item.Quantity,ELem._id)}>
                                                            </input>
                                                        }
                                                    </div>
                                                    <div className="col-11 col-md-4">
                                                        <img src={`https://eccomerce-tazon.onrender.com${ELem.preveiw.preveiw1}`} alt="ELem" className={Styles.cartImg} />
                                                    </div>
                                                    <div className="col-12 col-md-5">
                                                        <h7 className={Styles.heading}>{ELem.name}</h7>&nbsp;
                                                        ({ELem.color}{" "}{ELem.Ram} RAM, {ELem.storage} Storage)
                                                        <p className={Styles.text1}>In Stock</p>
                                                        {ELem.charge === 0 ? <p className={Styles.paragraph}>Eligible for FREE Shipping</p> : ""}
                                                        {ELem.Ram ? <p className={Styles.text3}><span className="fw-bold">Size: </span>{ELem.Ram} RAM, {ELem.storage} Storage</p> : <></>}
                                                        <div className="row">
                                                            <div className="col-12 col-md-4">
                                                                <select placeholder="Qty" defaultValue={item.Quantity} className={Styles.quantity}
                                                                    onChange={(e) => dispatch(UpdateQuantity(e.target.value, item._id))}>
                                                                    <option>1</option>
                                                                    <option>2</option>
                                                                    <option>3</option>
                                                                    <option>4</option>
                                                                    <option>5</option>
                                                                    <option>6</option>
                                                                    <option>7</option>
                                                                    <option>8</option>
                                                                    <option>9</option>
                                                                    <option>10</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-12 col-md-4 ">
                                                                <button onClick={() => dispatch(DeleteCart(item._id))} className={Styles.btn} style={{ fontSize: "small" }}>Delete</button>
                                                            </div>
                                                            <div className="col-12 col-md-4">
                                                                <button onClick={() => dispatch(PostSave(item.ProductId, item._id))} className={Styles.btn} style={{ fontSize: "small" }}>Save for Later</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-md-2 ">
                                                        &#8377;<span className="fa-4 fw-bold ">{ELem.price * item.Quantity}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}

                </div>
                <div className={`col-12 col-md-3 p-3 text-center ${Styles.box}`}>
                    <h7 className={Styles.text1}><span className="fa fa-right-tick"></span>Your order is eligible for FREE Delivery.</h7>
                    <p className={Styles.text3}>Select this option at checkout.</p>
                    <h5 className="p-2 pt-1">Subtotal ({id.length} items): &#8377;{total}</h5>
                    {total===0 ?"":<Link href="/buy"><Button className="btn btn-warning" onClick={HandleTemp}>Proceed to Buy</Button></Link>}
                </div>
                <Save />
            </div>
        </div>
    )
}