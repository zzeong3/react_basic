import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

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
    <>
        {Open && (
            <aside className="pop">
                <div className="con">{props.children}</div> 
                {/* 팝업 요소의 자식요소를 불러와랑 */}
                <span className="close" onClick={() => { setOpen(false) }}>close</span>
            </aside>
        )}
    </> 
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

