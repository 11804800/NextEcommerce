"use client"
import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
import { LocalForm,Control } from 'react-redux-form';
import Styles from './page.module.css';
function Footer(){
    return (
        <div className={`container-fluid p-5 ${Styles.footdiv}`}>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-3 p-3'>
                    <img src={"http://localhost:3000/images/chef.png"} alt="logo" width="100" height="100" className={Styles.footlogo} />
                    <h5>STARBELLY</h5>
                    <p className='text-left'>StartBelly is the best website for explore new Snacks and Recipes of food and drinks.
                        it is very simple to use and the best way to find new with help of us</p>
                </div>
                <div className='col-12 col-md-2 text p-3'>
                    <h4>Delivery Time</h4>
                    <h6 className='p-2'>Sunday &ndash; Thursday</h6>
                    <p>11:00am - 10:00pm</p>
                    <h6 className='p-2'>Friday &ndash; Saturday</h6>
                    <p className='text'>Off day</p>
                </div>
                <div className='col-12 col-md-3 text-left p-3'>
                    <h4>Contact</h4>
                    <p>Location: 121, Clear Water Bay Road
                        Clear Water Bay, Kowloon
                        HONG KONG</p>
                    <div>
                        <h8 className="">Phone: 0122345890</h8>
                    </div>
                    <h8 className="">Email: exampl@gmail.com</h8>
                </div>
                <div className='col-12 col-md-4 text-left p-3'>
                    <h5>NewsLetter</h5>
                    <p>Subscribe our newsletter</p>
                    <LocalForm>
                                <FormGroup>
                                    <label htmlFor='search'></label>
                                    <Control.text type="text" placeholder="Enter Your Email"
                                        className='from-control p-2 rounded-1'
                                        id="search"
                                        name="search"
                                        model=".search"
                                    />
                                    <button className='btn btn-warning' type='submit'><span className='fa fa-send'></span></button>
                                </FormGroup>
                            </LocalForm>
                </div>
            </div>
            <hr />
            <div className='row p-2 border-top'>
                <div className='col-12 col-md-7 text-left offset-sm-1'>
                    <p className="fw-bold">CopyRight - 2023 website Made by Nikhil Pathak, All Rights Reserved</p>
                </div>
                <div className='col-12 col-md-3'>
                    <h8 className="fw-bold">Follow: </h8>
                    <span className="p-2"><span className='fa fa-instagram p-2 footer-logo'></span></span>
                    <span className='p-2'><span className='fa fa-google-plus p-2 footer-logo'></span></span>
                    <span className='p-2'><span className='fa fa-linkedin p-2 footer-logo'></span></span>
                    <span className='p-2'><span className='fa fa-github p-2 footer-logo'></span></span>
                </div>
            </div>
        </div>
    )
}
export default Footer;