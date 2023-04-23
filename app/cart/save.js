"use client";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSave } from "../Redux/save";
import { Card, CardBody,CardImg, CardText } from "reactstrap";
import { DeleteSave, AddToCart } from "../Redux/actions";
import Styles from './page.module.css';
function Save() {
    const dispatch = useDispatch();
    const product = useSelector((state) => {
        return state.product.All
    });
    const id = useSelector((state) => {
        return state.save.value
    });
    const [creds,setCreds]=useState("");
    useEffect(() => {
        const item = async () => {
            const cred=localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null;
            setCreds(cred);
            const res = await fetch("https://eccomerce-tazon.onrender.com/save");
            const resp = await fetch('https://eccomerce-tazon.onrender.com/product/All');
            const data = await res.json();
            const products = await resp.json();
            dispatch(showSave(data));
            console.log(products);
        };
        item();
    }, []);


    return (
        <div className="row justify-content-center">
            <hr/>
            <div className="col-12 col-md-12 p-5 pt-2 pb-2">
                <h4>Your items</h4>
                <p className={Styles.text3}>Saved for later {id.length}</p>
            </div>
            <hr/>
            {
                id.filter((item)=>item.author.username===creds.username).map((item) => {
                    return (
                        <div className="col-12 col-md-3" key={item._id}>
                            {
                                product.filter((Elem) => Elem._id === item.ProductId).map((Elem) => {
                                    return (
                                        <Card className={Styles.box} key={Elem._id}>
                                            <CardImg src={`https://eccomerce-tazon.onrender.com${Elem.preveiw.preveiw1}`} alt={Elem.name} style={{ width: "100%" }}>
                                            </CardImg>
                                            <CardBody>
                                                <CardText className={Styles.heading}>{Elem.name}</CardText>
                                                &#8377;<h7 className={`${Styles.text3}`}>{Elem.price}</h7>
                                                <p className={Styles.text1}>In Stock</p>
                                                <button onClick={() => dispatch(DeleteSave(item._id))} className={Styles.btn}>Delete</button>
                                                &nbsp;
                                                <p></p>
                                                <div className="text-center">
                                                    <button onClick={() => dispatch(AddToCart(item.ProductId, item._id))} className={Styles.btn1}>Move to Cart</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Save;
