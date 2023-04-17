"use client";
import {
    Navbar, Nav, NavItem, Collapse, NavbarToggler, Modal,
    ModalHeader, ModalBody, FormGroup, Row, Label, Input, ModalFooter
} from "reactstrap";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from './page.module.css';
import { useDispatch, useSelector } from "react-redux";
import { LocalForm, Control } from 'react-redux-form';
import { login, logout } from './Redux/actions';

function Header() {
    const dispatch = useDispatch();
    const auth=useSelector((state)=>{
        return state.auth.isAuth
    });
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const Toogle = () => {
        setActive(!active);
    }
    const HandleSubmit = (value) => {
        dispatch(login({ username: value.username, password: value.password }));
        setActive(!active);
    }
    return (
        <React.Fragment>
            <Navbar dark className="bg-dark text-light" expand="md">
                <NavbarToggler navbar onClick={() => setOpen(!open)} />
                <Collapse navbar isOpen={open}>
                    <Nav navbar className="m-auto">
                        <NavItem className="nav-link"><Link href='/' className={styles.navlink}><span className="fa fa-home"></span> Home</Link></NavItem>
                        <NavItem className="nav-link"><Link href='/menu' className={styles.navlink}><span className="fa fa-list"></span> Menu</Link></NavItem>
                        <NavItem className="nav-link"><Link href='/cart' className={styles.navlink}><span className="fa fa-shopping-cart"></span> Cart</Link></NavItem>
                        <NavItem className="nav-link"><Link href='/order' className={styles.navlink}>Orders</Link></NavItem>
                    </Nav>
                    <Nav navbar className="">
                        {
                            auth ?
                                <button className="border border-light p-2 pt-1 pb-1 rounded-1 bg-dark text-light" onClick={()=>dispatch(logout())}>
                                    Logout
                                </button>
                                :
                                <NavItem className="border border-light p-2 pt-1 pb-1 rounded-1" onClick={() => setActive(!active)}>
                                    <span className="fa fa-sign-in"></span> Login
                                </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
            <Modal isOpen={active}>
                <ModalHeader toggle={Toogle}>
                    Welcome To Login Page
                </ModalHeader>
                <ModalBody>
                    <div className="row justify-conten-center">
                        <div className="col-12 col-md-6">
                            <LocalForm onSubmit={(value) => HandleSubmit(value)} className="p-3">
                                <FormGroup className="p-2">
                                    <Label htmlfor="username" className="fw-bold">Username</Label>
                                    <Control.text type="text" id="username" name="username" model=".username"
                                        placeholder="Username" className="form-control" />
                                </FormGroup>
                                <FormGroup className="p-2">
                                    <Label htmlfor="password" className="fw-bold">Password</Label>
                                    <Control.text type="password" id="password" name="password" model='.password'
                                        placeholder="Password" className="form-control" />
                                </FormGroup>
                                <FormGroup className="p-2">
                                    <button type="submit" className={styles.login}>Login</button>
                                </FormGroup>
                            </LocalForm>
                        </div>
                        <div className="col-12 col-md-6">
                            <img src={"http://localhost:3000/images/ux.png"} className={styles.images} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <p>Don't Have Account? Signup</p>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}
export default Header;