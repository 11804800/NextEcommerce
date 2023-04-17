"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import styles from './page.module.css';
import { showOrder } from '../Redux/Order';
import { showProducts } from '../Redux/products';
import { useDispatch, useSelector } from 'react-redux';
import { postTemp } from '../Redux/actions';
import {Auth,users} from '../Redux/auth';
export default function Order() {
    const [activeTab, setTab] = useState('1');

    const toogletab = (tab) => {
        setTab(tab)
    }
    const creds=useSelector((state)=>{
        return state.auth.creds
    });
    const dispatch = useDispatch();

    const Order = useSelector((state) => {
        return state.order.value
    });

    const product = useSelector((state) => {
        return state.product.All
    })
    useEffect(() => {
        const item = async () => {
            const res = await fetch('https://eccomerce-tazon.onrender.com/order');
            const resp = await fetch('https://eccomerce-tazon.onrender.com/product/All');
            const response = await resp.json();
            const data = await res.json();
            dispatch(showOrder(data));
            dispatch(showProducts(response));
            dispatch(users());
        }
        item();
    }, []);

    return (
        <div className='container p-1'>
            <div className='row justify-content-center p-1'>
                <div className='col-12 col-md-12 p-2'>
                    <Nav className='border-bottom '>
                        <NavItem className="nav-link">
                            <button onClick={() => { toogletab('1') }} className={styles.tabbtn}>Orders</button>
                        </NavItem>
                        <NavItem className='nav-link'>
                            <button onClick={() => { toogletab('2') }} className={styles.tabbtn}>Yet To Dispatch</button>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            {
                                Order.filter((item)=>item.buyer.username===creds.username).map((item) => {
                                    return (
                                        <div>
                                            {
                                                product.filter((Elem) => Elem._id === item.ProductId).map((Elem) => {
                                                    return (
                                                        <div className='row justify-content-center p-3' key={item._id}>
                                                            <div className='col-12 col-md-11 rounded-2' style={{ background:"rgb(240, 242, 242)" }}>
                                                                <div className='p-2'>
                                                                    <p style={{width:"50%",fontSize:"smaller"}}>ORDER PLACED</p>
                                                                    <p>{item.orderdate}</p>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <h7 style={{width:"50%",fontSize:"small"}}>TOTAL</h7>
                                                                    <h7>{Elem.price * item.Quantity}</h7>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <p style={{width:"100%",fontSize:"small"}}>SHIP TO</p>
                                                                    <p></p>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <p style={{width:"100%",fontSize:"small"}}>ORDER # {item._id}</p>
                                                                </div>
                                                            </div>
                                                            <div className='col-12 col-md-4 p-2'>
                                                                <img src={`https://eccomerce-tazon.onrender.com/${Elem.preveiw.preveiw1}`} alt={Elem.name} width="100" />
                                                            </div>
                                                            <div className='col-12 col-md-7 p-2'>
                                                                <h7 style={{fontWeight:"500"}}>{Elem.name}</h7>
                                                                {item.deliveryStatus === "delivered" ? <p>Delivered</p> : <p>Yet To Dispatch</p>}
                                                                <div style={{ display: "flex" }}>
                                                                    <div className='p-3'>
                                                                        <Link href="/buy"><Button className='border-0 bg-warning text-dark' style={{ fontSize: "small", boxShadow: "-1px 1px 1px 1px (0,0,0,0.1),1px -1px 1px 1px rgba(0,0,0,0.1)" }}
                                                                        onClick={()=>{dispatch(postTemp(item._id,1))}}>Buy it again</Button></Link>
                                                                    </div>
                                                                    <div className='p-3'>
                                                                        <Link href={`/menu/${Elem._id}`}><Button className=" border-0 text-dark" style={{ background:"rgb(225,225,225)",fontSize: "small", boxShadow: "-1px 1px 1px 1px (0,0,0,0.1),1px -1px 1px 1px rgba(0,0,0,0.1)" }}>Veiw your item</Button></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </TabPane>
                        <TabPane tabId="2">
                            {
                                Order.filter((item) => item.deliveryStatus === "Preparing").map((item) => {
                                    return (
                                        <div>
                                            {
                                                product.filter((Elem) => Elem._id === item.ProductId).map((Elem) => {
                                                    return (
                                                        <div className='row justify-content-center p-3' key={item._id}>
                                                        <div className='col-12 col-md-11 rounded-2' style={{ background:"rgb(240, 242, 242)" }}>
                                                            <div className='p-2'>
                                                                <p style={{width:"50%",fontSize:"smaller"}}>ORDER PLACED</p>
                                                                <p>{item.orderdate}</p>
                                                            </div>
                                                            <div className='p-2'>
                                                                <h7 style={{width:"50%",fontSize:"small"}}>TOTAL</h7>
                                                                <h7>{Elem.price * item.Quantity}</h7>
                                                            </div>
                                                            <div className='p-2'>
                                                                <p style={{width:"100%",fontSize:"small"}}>SHIP TO</p>
                                                                <p></p>
                                                            </div>
                                                            <div className='p-2'>
                                                                <p style={{width:"100%",fontSize:"small"}}>ORDER # {item._id}</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-md-4 p-2'>
                                                            <img src={`https://eccomerce-tazon.onrender.com/${Elem.preveiw.preveiw1}`} alt={Elem.name} width="100" />
                                                        </div>
                                                        <div className='col-12 col-md-7 p-2'>
                                                            <h7 style={{fontWeight:"500"}}>{Elem.name}</h7>
                                                            {item.deliveryStatus === "delivered" ? <p>Delivered</p> : <p>Yet To Dispatch</p>}
                                                            <div style={{ display: "flex" }}>
                                                                <div className='p-3'>
                                                                    <Link href={`/menu/${Elem._id}`}><Button className=" border-0 text-dark bg-warning" style={{fontSize: "small", boxShadow: "-1px 1px 1px 1px (0,0,0,0.1),1px -1px 1px 1px rgba(0,0,0,0.1)" }}>Veiw your item</Button></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    )
}
