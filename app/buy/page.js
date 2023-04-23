"use client";
import { useEffect, useState } from 'react';
import { Collapse, Card, CardBody, CardFooter, CardTitle, Button, FormGroup, Table, CardText, CardHeader, Form, Modal, ModalHeader } from 'reactstrap';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemp, Updatetemp, DelTempItem, PlaceOrder } from '../Redux/actions';
import { showTemp } from '../Redux/Temp';
import Image from 'next/image';
export default function Order() {
    let newDate = new Date().toDateString();

    const [stage, setStage] = useState(true);
    const [stage1, setStage1] = useState(true);
    const [stage2, setStage2] = useState(false);
    const [stage3, setStage3] = useState(false);
    const [stage4, setStage4] = useState(false);
    const [stage5, setStage5] = useState(false);
    const [stage6, setStage6] = useState(false);
    const [Data, setData] = useState([]);

    const [type, setType] = useState("");
    const [address, setAddress] = useState("");
    const [method, setmethod] = useState("");
    const [product, setId] = useState([]);

    const id = useSelector((state) => {
        return state.temp.value
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const item = async () => {
            const res = await fetch("https://eccomerce-tazon.onrender.com/userdata");
            const resp = await fetch('https://eccomerce-tazon.onrender.com/temp');
            const product = await fetch('https://eccomerce-tazon.onrender.com/product/All');
            const Elem = await product.json();
            const response = await resp.json();
            const data = await res.json();
            dispatch(showTemp(response));
            setData(data);
            setId(Elem);
        }
        item();
    }, []);

    const HandleTemp = () => {

        id.map((item) => {
           return (
             dispatch(PlaceOrder(item.ProductId, item.Quantity, newDate, type, method, address))  
        )
        });
        dispatch(deleteTemp());
        setStage4(!stage4);
    }
    const Products = id.map((item) => {
        return (
            <div key={item._id}>
                {
                    product.filter((Elem) => Elem._id === item.ProductId).map((Elem) => {
                        return (
                            <div className='row justify-content-center p-2' key={item._id}>
                                <div className='col-12 col-md-4'>
                                    <Image src={`https://eccomerce-tazon.onrender.com${Elem.preveiw.preveiw1}`} key={item._id} alt={Elem.name} width="100" height="100"></Image>
                                </div>
                                <div className='col-12 col-md-8'>
                                    <h5>{Elem.name}</h5>
                                    <div className={`${styles.poster} bg-light`}>
                                        <p className={styles.cancelled}>{item.Cprice}</p>
                                        <p className={styles.price}>&#8377;{Elem.price * item.Quantity}</p>
                                        {Elem.Prime === true ? <span className='p-2 bg-dark teext-light'>Prime</span> : ""}
                                    </div>
                                    <select defaultvalue={item.Quantity} className={`${styles.quantity} border-0`} onChange={(e) => dispatch(Updatetemp(item._id, e.target.value))}>
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
                                    {"      "} &nbsp;
                                    <button className='border-0' style={{ color: "rgb(38, 85, 69)", fontWeight: "500", background: "white" }}
                                        onClick={() => dispatch(DelTempItem(item._id))}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    });
    const total = id.reduce((tol, curr) =>
        tol + product.filter((Elem) => Elem._id === curr.ProductId).map((Elem) => Elem.price) * curr.Quantity
        , 0);
    const Charge = (id.reduce((tol, curr) =>
        tol + product.filter((Elem) => Elem._id === curr.ProductId).map((Elem) => Elem.charge) * curr.Quantity
        , 0));
    const togglestage1 = () => {
        setStage(false),
            setStage1(true)
    }
    const togglestage2 = () => {
        setStage1(false),
            setStage2(true)
    }
    const tooglestage3 = () => {
        setStage3(!stage3),
            setStage4(false),
            setStage5(false),
            setStage6(false),
            setmethod("Prepaid")
    }
    const tooglestage5 = () => {
        setStage5(!stage5),
            setStage4(false),
            setStage3(false),
            setStage6(false),
            setmethod("Prepaid")
    }
    const tooglestage6 = () => {
        setStage5(!stage5),
            setStage4(false),
            setStage3(false),
            setStage6(!stage6),
            setmethod("Cash On Delivery")
    }
    return (
        <div className="container p-2">
            <div className="row justify-content-center p-2">
                <div className={`col-12 col-md-12 p-3 ${styles.poster}`}>
                    <h3>Logo</h3>
                    <h4 className="m-auto">Checkout</h4>
                    <h5><span className="fa fa-lock text-secondry"></span></h5>
                </div>
                <div className='col-12 col-md-7 p-3'>
                    <h5 style={{ color: stage ? "brown" : "" }}>1 &nbsp;&nbsp;Select a delivery address</h5>
                    <Collapse isOpen={stage}>
                        <div className='p-4 pt-2'>
                            <Card className='ml-1 border-0'>
                                <CardTitle className='p-2'>
                                    <h5>Your addresses</h5>
                                    <hr />
                                    <select className='p-3 form-control' onChange={(e) => setAddress(e.target.value)}>
                                        {
                                            Data.map((item) => {
                                                return (
                                                    <option style={{ fontWeight: "600" }} key={item._id}>{item.address}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </CardTitle>
                                <CardBody></CardBody>
                                <CardFooter>
                                    <Button className={`btn btn-warning ${styles.payHead}`} type='submit' onClick={togglestage1}>Use this address</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </Collapse>
                    <h5 style={{ color: stage1 ? "brown" : "" }}>2  &nbsp;&nbsp;Payment method</h5>
                    <Collapse isOpen={stage1}>
                        <div className='p-4 pt-2'>
                            <Card>
                                <CardTitle className='p-3'>
                                    <h5>Another payment method</h5>
                                    <hr />
                                </CardTitle>
                                <CardBody className='pl-4'>
                                    <FormGroup className='rounded-3 p-2' style={{ background: stage3 ? "rgba(252, 245, 238,1)" : "", border: stage3 ? "2px solid rgb(251, 216, 180)" : "" }}>
                                        <input type="radio" name='Nikhil' id="Nikhil" onChange={tooglestage3}></input> &nbsp;
                                        <label className={styles.payHead}>Pay with Debit/Credit/ATM Cards</label>
                                        <div className='border-0'>
                                            <p className='p-5 pt-1 pb-0'>You can save your cards as per new RBI guidelines.</p>
                                            <div className={`${styles.poster} p-5 pt-1 pb-0 d-block`}>
                                                <Image src={"https://eccomerce-tazon.onrender.com/images/master.jpg"} alt="mastercard" width="140" height="110" className='p-4' ></Image>
                                                <Image src={"https://eccomerce-tazon.onrender.com/images/maestro.png"} alt="maestro" width="100" height="110" className='p-4' ></Image>
                                                <Image src={"https://eccomerce-tazon.onrender.com/images/bajaj.png"} alt="bajaj" width="100" height="110" className='p-4' ></Image>
                                                <Image src={"https://eccomerce-tazon.onrender.com/images/rupay.jpg"} alt="rupay" width="110" height="130" className='p-4' ></Image>
                                            </div>
                                            <Collapse isOpen={stage3}>
                                                <div className={`p-5 pt-1 pb-2 ${styles.poster}`}>
                                                    <div style={{ display: "flex" }}>
                                                        <input type="text" placeholder='Card Number' className='form-control'
                                                            name='cardno' style={{ width: "50%" }} />
                                                        <input type='text' placeholder='MM/YY' className='form-control' name="expiry" style={{ width: "25%" }} />
                                                        <input type="text" placeholder="CVC" className='form-control' name="cvc" style={{ width: "25%" }} />
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className='rounded-3 p-2' style={{ background: stage5 ? "rgba(252, 245, 238,1)" : "", border: stage5 ? "2px solid rgb(251, 216, 180)" : "" }}>
                                        <input type="radio" name='Nikhil' id="Nikhil" onChange={tooglestage5}></input> &nbsp;
                                        <label className={styles.payHead}>Other UPI Apps</label>
                                        <Collapse isOpen={stage5}>
                                            <div className='p-4 pt-1 pb-0 border-0'>
                                                <p>Please enter your UPI ID</p>
                                                <FormGroup>
                                                    <input type="text" placeholder='Ex:MobileNumber@upi' className='from-control p-1'></input>
                                                    &nbsp;
                                                    <Button className='btn btn-warning p-2'>Verify</Button>
                                                </FormGroup>
                                            </div>
                                        </Collapse>
                                    </FormGroup>
                                    <FormGroup className='rounded-3 p-2' style={{ background: stage6 ? "rgba(252, 245, 238,1)" : "", border: stage6 ? "2px solid rgb(251, 216, 180)" : "" }}>
                                        <input type="radio" name='Nikhil' id="Nikhil" onChange={tooglestage6}></input> &nbsp;
                                        <label className={styles.payHead}>
                                            Cash On Delivery/Pay On Delivery
                                        </label>
                                        <p className='p-4 pt-0 pb-0 '>Scan & Pay using Any app.Cash, UPI ,Cards also accepted </p>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className='p-3'>
                                    <Button className={`btn btn-warning ${styles.payHead}`} onClick={togglestage2}>Use this payment method</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </Collapse>
                    <h5 style={{ color: stage2 ? "brown" : "" }}>3 &nbsp;&nbsp;items and delivery</h5>
                    <Collapse isOpen={stage2}>
                        <div className='p-4 pt-2'>
                            <Card className='p-4'>
                                <CardTitle>
                                    <h5>Delivery date: {newDate}</h5>
                                    <p>If You Place Your Order Right Now</p>
                                    <p style={{ fontWeight: "500" }}>items({id.length}) dispatched by Tazon <span>Fulfilled</span></p>
                                    {Products}
                                </CardTitle>
                            </Card>
                            <div className='p-2'></div>
                            <Card className='p-2'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 col-md-4 m-auto text-center'>
                                        <Button className={`btn btn-warning ${styles.btntxt}`} onClick={HandleTemp}>Place your order</Button>
                                    </div>
                                    <div className='col-12 col-md-8'>
                                        <p className='fs-5 fw-bold' style={{ color: "brown" }}>Order Total: &#8377;{total}</p>
                                        <span>By placing the order you agree to our terms and conditions</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Collapse>
                </div>
                <div className='col-12 col-md-5 p-2'>
                    <Card className='p-2'>
                        <CardTitle className='p-3 text-center'>
                            <p className={`p-3 ${styles.text}`}>Choose a payment method to continue checking out. you will still have
                                a chance to reveiw your order before it&apos;s final
                            </p>
                            <hr/>
                        </CardTitle>
                        <CardBody className='p-3'>
                            <h5 className='fw-bold'>Order Summary</h5>
                            <Table className={styles.text}>
                                <tr>
                                    <td>items:</td>
                                    <td>&#8377;{total}</td>
                                </tr>
                                <tr>
                                    <td>Delivery:</td>
                                    <td>&#8377;{Charge}</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>&#8377;{total + Charge}</td>
                                </tr>
                                <tr>
                                    <td>Promotion Applied:</td>
                                    <td>-&#8377;{total >= 1000 ? 50 : 0}</td>
                                </tr>
                                <hr />
                                <tr className='fs-5' style={{ color: "brown" }}>
                                    <th>Order Total:</th>
                                    <th>&#8377;{total >= 1000 ? total + Charge - ((total)/Charge) : total + Charge}</th>
                                </tr>
                                <hr />
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <Modal isOpen={stage4}>
                    <div className='p-5'>
                        <h3>Order Successfully Placed</h3>
                        <h7 style={{fontSize:"500"}}>
                            Your Order Will be Dilvered on {newDate}
                        </h7>
                        <div className='pt-3'>
                            <button className='btn btn-primary' onClick={()=>setStage4(!stage4)}>Ok</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}