"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Row, Col, Label, Button, Table, Modal, ModalBody, ModalHeader, Card, CardHeader, CardText, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { LocalForm, Control, Errors } from "react-redux-form";
import { showComments } from "../comments";
import styles from './page.module.css';
import { redirect } from 'next/navigation';
import { useState } from "react";
import { PostComment, AddToCart } from "../action";
import { postTemp } from '../action'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RelatedItem from "./related";


function RenderComments({ id }) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const comments = useSelector((state) => {
        return state.comment.value
    });
    const dispatch = useDispatch();

    const submit = (value) => {
        dispatch(PostComment(id, value.rating, value.comment));
    }
    const [active, setActive] = useState(false);

    const Toogle = () => {
        setActive(!active)
    };

    useEffect(() => {
        const item = async () => {
            const res = await fetch('http://localhost:3000/comments');
            const data = await res.json();
            dispatch(showComments(data));
            console.log(data);
        };
        item();
    }, []);
    return (
        <div className="row justify-content-center">
            <h4>Reveiws</h4>
            <hr />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 p-2">
                        <Carousel responsive={responsive} showDots={true}>
                            {
                                comments.filter((comment) => comment.dish === id).map((comment) => {
                                    return (
                                        <Card key={comment._id}>
                                            <CardHeader>
                                                <h6>{comment.author}</h6>
                                            </CardHeader>
                                            <CardBody>
                                                <CardText>
                                                    <h7 style={{ fontWeight: "500" }}>Rating :{comment.rating}</h7>
                                                    <h6 style={{ fontWeight: "500" }}>Reveiw</h6>
                                                    <p style={{ fontSize: "small", fontWeight: "500" }}>{comment.comment}</p>
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="col-12 col-md-3 p-2">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-12 p-2">
                                <button style={{ background: "rgb(225,225,225", fontWeight: "600", fontSize: "medium" }}
                                    className="btn text-dark" onClick={Toogle}>
                                    Write a reveiw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={active}>
                <ModalHeader toggle={Toogle}>
                    <h5>Write a Reveiw</h5>
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={submit}>
                        <Row className="form-group p-2">
                            <Col md={{ size: 5, offset: 5 }}>
                                <span className="fa fa-user fs-2 p-3 bg-primary rounded-circle text-light"></span>
                            </Col>
                        </Row>
                        <Row className="form-group p-2">
                            <Label htmlFor="rating" md={2} style={{ fontWeight: "500" }}>Rating</Label>
                            <Col md={10}>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group p-2">
                            <Label htmlFor="reveiw" md={2} style={{ fontWeight: "500" }}>Reveiw</Label>
                            <Col md={10}>
                                <Control.textarea model=".reveiw" name="reveiw" id="reveiw" placeholder="Write something ....." className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group p-2">
                            <Col md={{ size: 4, offset: 2 }}>
                                <Button className="btb btn-primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    )

}




function RenderPrice({ price, id, Category }) {
    const dispatch = useDispatch();
    const [plan, setPlan] = useState([]);
    const [PlanPrice, setPrice] = useState(0);
    const [quantity, SetQuan] = useState(1);
    const product = useSelector((state) => {
        return state.product.All
    });
    useEffect(() => {
        const item = async () => {
            const res = await fetch('http://localhost:3000/plan');
            const data = await res.json();
            setPlan(data);
        }
        item();
    }, []);

    const Plan = product.filter((item) => item._id === id).map((item) => {
        return (
            <div>
                {
                    plan.filter((Elem) => Elem.Category === item.Category).map((Elem) => {
                        return (
                            <label style={{ color: "rgba(41, 83, 76)" }}>
                                <input type="checkbox" onChange={() => setPrice(Elem.price)} />
                                {" "}
                                <h7 className={styles.text}>{Elem.name} </h7><h7 className={`${styles.text} text-dark`}>for</h7> <h7 className={styles.text} style={{ color: "brown" }}>&#8377;{Elem.price}</h7>
                            </label>
                        )
                    })
                }
            </div>
        )
    })

    return (
        <div className={`col-12 col-md-12 ${styles.box}`}>
            <div className="border p-4 rounded-4">
                <ul className={`list-unstyled ${styles.inline}`}>
                    <li className="pt-1">&#8377;</li>
                    <li><h2>{price + PlanPrice}</h2></li>
                    <li className="pt-1">00</li>
                </ul>
                <button className={styles.mapbtn} ><span className="fa fa-map-marker"></span> Select delivery location</button>
                <h5 className="text-success pt-3">In Stock</h5>
                <p className={styles.width}>Sold by Appario Retail private Ltd and Fulfiled by Amazon</p>
                {plan == [] ? "" : <h7 className="fw-bold">Add a Protection Plan:</h7>}
                {Plan}
                {Category === "Mobile" ? "" :

                    <p className={styles.lightbold}>Quantity : &nbsp;
                        <select className={styles.quantity} onChange={(e) => SetQuan(e.target.value)}>
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
                    </p>}
                <div>
                    <div className="col-auto p-2">
                        <button className={styles.cartbtn} onClick={() => dispatch(AddToCart(id))}>Add to Cart</button>
                    </div>
                    <div className="col-auto p-2">
                        <Link href='/buy' className={styles.buybtn}><button className={styles.buybtn} onClick={() => dispatch(postTemp(id, quantity))}>Buy Now</button></Link>
                    </div>
                </div>
                <span className={styles.text}><span className={`fa fa-lock`}></span> Secure transaction</span>
            </div>
            <div>
                <hr />
                <button className={styles.wishbtn}>Add to Wishlist</button>
            </div>
        </div>
    )
}

function RenderImage({ image }) {
    return (
        <div>
            <img src={`http://localhost:3000${image}`} alt={image} className={styles.image} />
        </div>
    )
}

export default function Menu({ params }) {

    const [product, setProduct] = useState([]);
    useEffect(() => {
        const item = async () => {
            const res = await fetch('http://localhost:3000/product/All');
            const data = await res.json();
            setProduct(data);
        }
        item();
    }, []);
    const [ravi, setRavi] = useState(false);
    if (ravi) {
        redirect('/menu');
    }
    const [image, setImage] = useState("");
    return (
        <div className="container-fluid p-5">
            <div className="row justify-content-center">
                <div className="col-1 col-md-1 p-1 m-auto d-md-block">
                    {
                        product.filter((item) => item._id === params.id).map((item) => {
                            return (
                                <div>
                                    <figure onClick={() => setImage(item.preveiw.preveiw1)} className="p-3">
                                        <img src={`http://localhost:3000${item.preveiw.preveiw1}`}
                                            alt={item.name}
                                            width="60" className="border rounded-3 p-2"
                                        />
                                    </figure>
                                    <figure onClick={() => setImage(item.preveiw.preveiw2)} className="p-3">
                                        <img src={`http://localhost:3000${item.preveiw.preveiw2}`}
                                            alt={item.name}
                                            width="60" className="border rounded-3"
                                        />
                                    </figure>
                                    <figure onClick={() => setImage(item.preveiw.preveiw3)} className="p-3">
                                        <img src={`http://localhost:3000${item.preveiw.preveiw3}`}
                                            alt={item.name}
                                            width="60"
                                            className="border rounded-3"
                                        />
                                    </figure>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-9 col-md-6 p-2 m-auto">
                    <RenderImage image={image} />

                </div>
                <div className="col-12 col-md-5 p-2">
                    {
                        product.filter((item) => item._id === params.id).map((item) => {
                            return (
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-6 p-2 m-auto">
                                        <h5>{item.fullname}</h5>
                                        <hr />
                                        &#8377;<span className='fw-bold fs-4 '>{item.price}</span>
                                        <hr />
                                        <tr>
                                            <td><h6>Colour: </h6></td>
                                            <td className="fw-bold">&nbsp;{item.color}</td>
                                        </tr>
                                        <tr>
                                            <td><h6>Size: </h6></td>
                                            <td className="fw-bold">&nbsp;{item.Ram} RAM, {item.storage} Storage</td>
                                        </tr>
                                        <hr />
                                        <h6>Specifications</h6>
                                        <div className="p-2">
                                            <Table className={`${styles.text} p-3`}>
                                                <tr className="p-3">
                                                    <th>Brand</th>
                                                    <td>{item.Brand}</td>
                                                </tr>
                                                <tr className="p-3">
                                                    <th>Model Name</th>
                                                    <td>{item.Model}</td>
                                                </tr>
                                                <tr>
                                                    <th>Os</th>
                                                    <td>{item.os}</td>
                                                </tr>
                                                <tr>
                                                    <th>Size</th>
                                                    <td>{item.size} inch</td>
                                                </tr>
                                                <tr>
                                                    <th>Weight</th>
                                                    <td>{item.weight} gram</td>
                                                </tr>
                                            </Table>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <RenderPrice price={item.price} id={item._id} Category={item.Category} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <h6>Features :</h6>
            <div className="col-12 col-md-12 text-left p-3 pt-0">
                {
                    product.filter((item) => item._id === params.id).map((item) => {
                        return (
                            <div className={styles.description}>
                                <p>{item.description}</p>
                            </div>)
                    })
                }
            </div>
            <RenderComments id={params.id} />
            <div className="col-12 col-md-12 p-3">
                <h4>Related Items</h4>
                <hr />
                {
                    product.filter((item) => item._id === params.id).map((item) => {
                        return (
                            <RelatedItem Category={item.Category}/>
                            )
                    })
                }
            </div>
        </div >
    )
}
