import{ useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

// Menu components를 화살표함수로 변경해서 forwardRef 메세드의 인수로 저달

const Menu = forwardRef ((props, ref) => {
    const [Open, setOpen] = useState(false);
    const active = {color: 'salmon'};

    useEffect(() => {
        window.addEventListener('resize', ()=>{
            const wid = window.innerWidth;
            if(wid>=1200) setOpen(false);
        })
    }, [])

    // 부모컴포넌트의 참조객체에 담길 객체를 리턴 (해당 객체안에는 함수를 담아서 전달)
    useImperativeHandle (ref, () => {
        return {
            toggle: () => setOpen(!Open)
        }
    })

    return (
        <AnimatePresence>
        {Open && (
            <motion.nav id='mobileMenu'
            initial={{opacity:0, x:-320}}
            animate={{opacity:1, x:0, transition:{duration:.5}}}
            exit={{opacity:1, x:-320, transition:{duration:.5}}}
            onClick={()=>setOpen(false)}
            >
                <h1>
                    <Link to='/'>
                        <img src={process.env.PUBLIC_URL + '/img/logo_w.png'} alt="logo" />
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
            </motion.nav>
        )}
        </AnimatePresence>
    );
})

export default Menu;
