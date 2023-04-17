"use client";
import { Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardImgOverlay, CardText } from "reactstrap";
import styles from './page.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProducts } from '../Redux/products'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



function RenderFeatured() {
  const product = useSelector((state) => {
    return state.product.All
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const item = async () => {
      const res = await fetch('https://eccomerce-tazon.onrender.com/product/All');
      const data = await res.json();
      dispatch(showProducts(data));
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
    <Carousel responsive={responsive} infinite={true} showDots={true} arrows={false} swipeable={true}>
      {
        product.filter((item) => item.featured===true).map((item) => {
          return (
            <div className="p-4">
              <Card className={styles.featuredcard}>
                <CardImg src={`https://eccomerce-tazon.onrender.com${item.preveiw.preveiw1}`} alt={item.name} className={styles.featuredimg}>
                </CardImg>
                <CardBody>
                  <CardText className={styles.para} style={{ color: "brown" }}>{item.Brand}</CardText>
                  <CardText className={styles.name}>{item.name}</CardText>
                  <CardText className={styles.price}>
                    &#8377;{item.price}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          )
        })
      }
    </Carousel>
  )
}

function Renderpopular() {
  const product = useSelector((state) => {
    return state.product.All
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const item = async () => {
      const res = await fetch('https://eccomerce-tazon.onrender.com/product/All');
      const data = await res.json();
      dispatch(showProducts(data));
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
    <Carousel responsive={responsive} infinite={true} showDots={true} arrows={false} swipeable={true}>
      {
        product.filter((item) => item.SellerType=="Best Seller").map((item) => {
          return (
            <div className="p-4">
              <Card className={styles.featuredcard}>
                <CardImg src={`https://eccomerce-tazon.onrender.com${item.preveiw.preveiw1}`} alt={item.name} className={styles.featuredimg}>
                </CardImg>
                <CardBody>
                  <CardText className={styles.para} style={{ color: "brown" }}>{item.Brand}</CardText>
                  <CardText className={styles.name}>{item.name}</CardText>
                  <CardText className={styles.price}>
                    &#8377;{item.price}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          )
        })
      }
    </Carousel>
  )
}

function RenderSpeical() {
  const product = useSelector((state) => {
    return state.product.All
  });
  const [Countdown, setCountdown] = useState(3500);
  const timer = useRef();


  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min * 60);

    if (min <= 10) min = '0' + min;
    if (sec <= 10) sec = '0' + sec;

    return "00"+" : "+ min + " : " + sec;
  }
  useEffect(() => {
    timer.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer.current);
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
    <Carousel responsive={responsive} infinite={true} showDots={true} arrows={false} swipeable={true}>
      {
        product.filter((item) => item.label === "Deal Of The Day").map((item) => {
          return (
            <div className="p-4">
              <Card className={styles.featuredcard}>
                <CardImg src={`https://eccomerce-tazon.onrender.com${item.preveiw.preveiw1}`} alt={item.name} className={styles.featuredimg}>
                </CardImg>
                <CardImgOverlay>
                  <Badge color="danger">{item.label}</Badge>
                </CardImgOverlay>
                <CardBody>
                  <CardText className={styles.para} style={{ color: "brown" }}>{item.Brand}</CardText>
                  <CardText className={styles.name}>{item.name}</CardText>
                  <CardText>
                    <h7 className={styles.para} style={{color:"brown"}}>left hours</h7>{" : "}<Badge className={styles.para} color="danger">  {formatTime(Countdown)}</Badge>
                  </CardText>
                  <CardText className={styles.price}>
                  <h7 className={styles.cancel}>&#8377;{item.Cprice}</h7> &#8377;{item.price}
                    </CardText>
                </CardBody>
              </Card>
            </div>
          )
        })
      }
    </Carousel>
  )
}









function Home() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toogle = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className="container-fluid p-1">

        <div className=" row justify-content-center p-2">

          <div className="col-12 col-md-6 p-3" >
            <Card className="border-0">
              <CardImg src={"https://eccomerce-tazon.onrender.com/images/Home1.jpg"} alt="Home" className={styles.home1} >

              </CardImg>
               <CardImgOverlay className={styles.home}>
                <h3 className={styles.heading}>SALES</h3>
                <p className={styles.para}>We Have Great Products For You which<br /> can Crave You to Buy Them</p>
                <button className={styles.shopbtn}>Shop Now</button>
              </CardImgOverlay> 
            </Card>
          </div>
          <div className="col-12 col-md-6 m-auto">

            <div className="row justify-content-center">

              <div className="col-12 col-md-6 p-2">
                <div className={styles.box1}>
                  <img src={'https://eccomerce-tazon.onrender.com/images/Asus.png'} alt="div1" className={styles.divimg} />
                  <h7 className={styles.para}>Asus TUF Gaming</h7>
                </div>
              </div>

              <div className="col-12 col-md-6 p-2">
                <div className={styles.box2}>
                  <img src={'https://eccomerce-tazon.onrender.com/images/Fastrack1.png'} alt="div1"className={styles.divimg}  />
                  <h7 className={styles.para}>Fastrack Smart Watch</h7>
                </div>
              </div>

              <div className="col-12 col-md-6 p-2">
                <div className={styles.box3}>
                  <img src={'https://eccomerce-tazon.onrender.com/images/Mobile51.png'} alt="div1" className={styles.divimg} />
                  <h7 className={styles.para}>Oppo A78 5G Lte</h7>
                </div>
              </div>

              <div className="col-12 col-md-6 p-2">
                <div className={styles.box4}>
                  <img src={'https://eccomerce-tazon.onrender.com/images/Laptop41.png'} alt="div1" className={styles.divimg}  />
                  <h7 className={styles.para}>
                    Xiaomi Notebook Pro
                  </h7>
                </div>
              </div>
            </div>

          </div>
          <div className="col-12 col-md-12 p-2">
          </div>
          <div className="col-12 col-md-12 p-4">
            <div className={styles.inline}>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5 m-auto">
                  <img src={"https://eccomerce-tazon.onrender.com/images/Delivery.png"} alt="logo" width="100" />
                </div>
                <div className="col-12 col-md-7 m-auto">
                  <h7 className={styles.para}>Free Shipping</h7>
                  <p className={styles.logotext}>From All Order over &#8377;499</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                  <img src={"https://eccomerce-tazon.onrender.com/images/Gift.png"} alt="logo" width="100" />
                </div>
                <div className="col-12 col-md-7 m-auto">
                  <h7 className={styles.para}>Gift A Product</h7>
                  <p className={styles.logotext}>From All Order over &#8377;499</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                  <img src={"https://eccomerce-tazon.onrender.com/images/Help.png"} alt="logo" width="100" />
                </div>
                <div className="col-12 col-md-7 m-auto">
                  <h7 className={styles.para}>24/7 Help & Support</h7>
                  <p className={styles.logotext}>From All Order over &#8377;499</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                  <img src={"https://eccomerce-tazon.onrender.com/images/Offers.png"} alt="logo" width="100" />
                </div>
                <div className="col-12 col-md-7 m-auto">
                  <h7 className={styles.para}>Regular Discounts</h7>
                  <p className={styles.logotext}>From All Order over &#8377;499</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                  <img src={"https://eccomerce-tazon.onrender.com/images/Card.png"} alt="logo" width="100" />
                </div>
                <div className="col-12 col-md-7 m-auto">
                  <h7 className={styles.para}>Secure Payment</h7>
                  <p className={styles.logotext}>From All Order over &#8377;499</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 p-4 pb-2 border ">
            <h3>Featured Collection</h3>
            <RenderFeatured />
          </div>
          <div className="col-12 col-md-12 p-4 pb-2 border">
            <h3>Special Products</h3>
            <RenderSpeical />
          </div>
          <div className="col-12 col-md-12 p-4  pb-2border">
            <h3>POPULAR PRODUCTS</h3>
            <Renderpopular/>
          </div>
          <div className="col-8 col-md-8 p-3 text-center" >
            <div className="text-center p-3 border rounded-3" style={{background:"rgb(245,245,245"}}>
              <h1>Enjoy Shopping</h1>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;