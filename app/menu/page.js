"use client";
import Link from 'next/link';
import styles from './page.module.css';
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { showProduct, showProducts } from '../Redux/products';
import {
    Badge, Card, CardBody, CardImg,NavItem,
    Pagination, PaginationItem, PaginationLink, CardText,Row,Col, CardImgOverlay
} from 'reactstrap';
import { LocalForm, Control } from 'react-redux-form';

export default function Menu() {

    const dispatch = useDispatch();
    const product = useSelector((state) => {
        return state.product.value
    });
    const product1 = useSelector((state) => {
        return state.product.All
    });
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [brand, setbrand] = useState("All");
    const [color,setcolor]=useState("All");
    const [sort,setSort]=useState("");
    const pages = Math.ceil(total / 10);

    const Handleform = (value) => {
        setSearch(value.search);
    }
    const fade = useSpring({
        from: {
            opacity: 0.1,
            transform: "opacity(0.1)"
        },
        to: {
            opacity: 1,
            transform: "opacity(1)"
        },
        config: { duration: 1000 }
    });
    const [Category, set] = useState([]);
    const [Brand, setBrand] = useState([]);
    const [Color,setColor]=useState([]);
    useEffect(() => {
        const item = async () => {
            const res = await fetch(`https://eccomerce-tazon.onrender.com/product?category=${category}&brand=${brand}&search=${search}&color=${color}&sort=${sort}&page=${page}`);
            const resp = await fetch('https://eccomerce-tazon.onrender.com/product/All');
            const All = await resp.json();
            const data = await res.json();
            dispatch(showProduct(data.product));
            dispatch(showProducts(All));
            setTotal(data.total);
            set(data.cat);
            setBrand(data.Brand);
            setColor(data.color);
            console.log(data);
        };
        item();
    }, [page, search, category, brand,sort,color]);

    const products = product.map((item) => {
        return (
            <animated.div className='col-12 col-md-4 p-3' style={fade} key={item._id}>
                <Link href={`/menu/${item._id}`} className={styles.link}>
                    <Card key={item._id} style={{ background: "rgb(247, 247, 247)" }}>
                        <CardImg src={`https://eccomerce-tazon.onrender.com${item.preveiw.preveiw1}`} className={styles.image}></CardImg>
                        <CardBody>
                        {item.label ? <Badge color="danger">{item.label}</Badge>:""}
                            {item.SellerType ?<Badge color="danger">{item.SellerType}</Badge>:""}
                            <CardText style={{fontWeight:"500"}}>{item.name}</CardText>
                            <CardText>&#8377;<span className='fw-bold fs-3 '>{item.price}</span></CardText>
                        </CardBody>
                    </Card>
                </Link>
            </animated.div>
        )
    });
    return (
        <animated.div className="container-fluid p-2" style={fade}>
            <div className="row justify-content-center p-4">
                <div className="col-12 col-md-12 text-center">
                    <h1 className={styles.h3}>Products</h1>
                </div>
                <div className='col-12 col-md-12 p-3'>
                    <div className='row'>
                        <div className='col-12 col-md-9 p-2'>
                            <LocalForm onSubmit={(value) => Handleform(value)}>
                                <Row className="form-group">
                                    <label htmlFor='search'></label>
                                    <Col md={4}>
                                        <Control.text model=".search" className='form-control'
                                        placeholder="Search Products" id="search" name="search"/>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                        <div className='col-12 col-md-3 p-2'>
                            <select model=".category" name="category" className='form-control' onChange={(e) => setSort(e.target.value)}>
                                <option disabled>Default (Low to High)</option>
                                <option value="price,asc">Price (Low To High)</option>
                                <option value="price,desc">Price (High To Low)</option>
                                <option value="name,asc">A to Z</option>
                                <option value="name,desc">Z to A</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div className={`col-md-3 col-12 p-2 border ${styles.divleft}`}>
                    <LocalForm onSubmit={(value) => Handleform(value)}>
                    </LocalForm>
                    <h4 className='p-2'>Category</h4>
                    <div className={` ${styles.filter}`}>
                        {
                            Category.map((item) => {
                                return (
                                    <NavItem className='nav-link' key={item}>
                                        <button  key={item} className={styles.cbtn} onClick={() => setCategory(item)}>{item}</button>
                                    </NavItem>
                                )
                            })
                        }
                    </div>
                    <hr />
                    <h5 className='p-2'>Brand</h5>
                    <div className='p-2'>
                        <select defaultValue={brand} className='form-control' 
                        onChange={(e)=>setbrand(''+e.target.value)}>
                            <option disabled>All</option>
                            {
                                Brand.map((item) => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <hr/>
                    <h5 className='p-2'>Color</h5>
                    <div className='p-2'>
                        <select defaultValue={brand} className='form-control' 
                        onChange={(e)=>setcolor(''+e.target.value)}>
                              <option disabled>All</option>
                            {
                                Color.map((item) => {
                                    return (
                                        <option key={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='col-12 col-md-9 p-2'>
                    <div className={`row justify-content-center ${styles.scroll}`}>
                    {products}
                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-auto'>
                    <Pagination aria-label="Page navigation example">
                        {
                            [...new Array(pages)].map((val, index) => {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink onClick={() => setPage(index + 1)}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                    </Pagination>
                </div>
            </div>
        </animated.div>
    )
}
