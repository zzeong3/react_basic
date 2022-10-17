import React from "react";
import { NavLink, Link  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faBars } from '@fortawesome/free-solid-svg-icons' 

export default function Header(props) {
    const active = {color: 'salmon'};

    return(
        <header className={props.type}>
            <div className="inner">
                <h1>
                    {/* <NavLink exact to='/' activeStyle={active}>LOGO</NavLink> */}
                    <Link to='/'>LOGO</Link>
                </h1>
                <ul id="gnb">
                    <li>
                        <NavLink to='/department' activeClassName="on">department</NavLink>  
                    </li>
                    <li>
                        <NavLink to='/community' activeClassName="on">community</NavLink>
                    </li>
                    <li><NavLink to='/gallery' activeStyle={active}>gallery</NavLink></li>
                    <li><NavLink to='/youtube' activeStyle={active}>youtube</NavLink></li>
                    <li><NavLink to='/location' activeStyle={active}>location</NavLink></li>
                    <li><NavLink to='/Member' activeStyle={active}>Member</NavLink></li>
                </ul>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    )
}