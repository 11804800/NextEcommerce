"use client";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardImg } from 'reactstrap';
import styles from '../page.module.css';
export default function RelatedItem({ Category }) {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const item = async () => {
            const res = await fetch('http://localhost:3000/product/All');
            const data = await res.json();
            setProduct(data);
        }
        item();
    }, []);
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
    return (
        <div className="col-12 col-md-12 p-2">
            <Carousel responsive={responsive}>
                {
                    product.filter((item) => item.Category === Category).map((item) => {
                        return (
                            <Link href={`/menu/${item._id}`} className={styles.link}>
                                <Card key={item._id}>
                                    <CardImg src={`http://localhost:3000${item.preveiw.preveiw1}`} alt={item.name} className={styles.reveiwimg}>

                                    </CardImg>
                                    <CardHeader>
                                        <h7 style={{ fontWeight: "500" }}>{item.name}</h7>
                                    </CardHeader>
                                </Card>
                            </Link>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}