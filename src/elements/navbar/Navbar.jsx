import React, {useEffect} from 'react';
import {HashLink} from "react-router-hash-link";
import './navbar.css';


const Navbar = ({active}) => {


    return (
            <nav className="nav">
                <HashLink smooth to={'/#'} className={active <=1?("lnk-primary active"): ("lnk-primary")}><i className="fa fa-solid fa-book"></i></HashLink>
                <HashLink smooth to={'/#2'} className={active ===2?("lnk-primary active"): ("lnk-primary")}><i className="fa fa-solid fa-list"></i></HashLink>
                <HashLink smooth to={'/#3'} className={active ===3?("lnk-primary active"): ("lnk-primary")}><i className="fa fa-solid fa-hourglass-start"></i></HashLink>
                <HashLink smooth to={'/#4'} className={active >=4?("lnk-primary active"): ("lnk-primary")}><i className="fa fa-solid fa-envelope"></i></HashLink>
            </nav>

    );
};

export default Navbar;
