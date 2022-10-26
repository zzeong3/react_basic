import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Popup =forwardRef ((props, ref) => {

    const [Open, setOpen] = useState(false); // 팝업 열어주는
    useImperativeHandle(ref, ()=>{
        return {
            open : () => setOpen(true),
        };
    });

    useEffect (()=>{
        Open ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = 'auto')
    }, [Open]); //팝업 마운트 될때마다 실행s

    return (
    <AnimatePresence>
        {Open && (
            <motion.aside className="pop" 
            initial={{opacity:0, scale:0}} 
            animate={{opacity:1, scale:1, transition: {duration:.5}}}
            exit={{opacity:0, scale:0, transition: {duration:.5, delay:.5}}}>
                <motion.div className="con"
                initial={{opacity:0}}
                animate={{opacity:1, transition:{duration:.5, delay:1}}}
                exit={{opacity:0, transition:{delay:0}}}
                >{props.children}</motion.div> 
                {/* 팝업 요소의 자식요소를 불러와랑 */}
                <motion.span 
                initial={{x:50, opacity:0}} 
                animate={{x:0, opacity:1, transition:{delay:1}}}
                className="close" onClick={() => { setOpen(false) }}>close</motion.span>
            </motion.aside>
        )}
    </AnimatePresence> 
    );
});
export default Popup;

/*

forwardRef
1단계 - 기존의 컴포넌트 함수를 popup이라는 컴포넌트 함수를 대입형(선업형을 대입형으로 전환해줘야한다.)
2단계 - 해당 화살표함수를 forwardRef로 감쌈, 인수로 전달한다.
3단계 - 화살표함수 (forwardRef로 전달되는) 두번째 인수로 ref추가
4단계 - forwardRef 안쪽에 useImperativeHandle 함수를 호출한다.
5단계 - 해당함수를 객체를 변환해서 해당 객체값을 부모 컨포넌트로 전달
6단계 - 부모 컨포넌트에 useRef로 forwardRef로 전달되는 자식 컴포넌트로 참조한다.
7단계 - 참고 객체는 useImperativeHandle이 리턴하는 객체를 지칭한다.

 */

