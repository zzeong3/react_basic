import React from "react";
import { NavLink, Link  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faBars } from '@fortawesome/free-solid-svg-icons' 
import {useRef} from 'react';
import Menu from "./Menu";

export default function Header(props) {
    const menu = useRef(null);
   
    const active = {color: 'salmon'};

    let url = ' ';
    props.type === 'main'
        ? (url = process.env.PUBLIC_URL + '/img/logo_w.png')
        : (url = process.env.PUBLIC_URL + '/img/logo_b.png');

    return(
        <header className={props.type}>
            <div className="inner">
                <h1>
                    {/* <NavLink exact to='/' activeStyle={active}>LOGO</NavLink> */}
                    <Link to='/'>
                        <img src={url} alt="logo" />
                    </Link>
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
                {/* 토글 버튼 클릭스 참조된 토글함수 호출 */}
                <FontAwesomeIcon icon={faBars} onClick={() => menu.current.toggle()} />
            </div>

            {/* menu.current 담기는 값은 자식컴포넌트에서 useImperativeHandle이 내보내주고 있는 toggle 함수 */}
            <Menu ref={menu} />
        </header>
    )
}