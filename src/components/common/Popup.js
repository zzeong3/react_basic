import { useEffect } from "react";

export default function Popup(props) {
    useEffect (()=>{
        document.body.style.overflow = "hidden";
        return()=>{ // 클린업 함수 호출 다시 없애!
            document.body.style.overflow = "auto";
        }
    }, []); //팝업 처음으로 마운트 되었을땜ㄴ

    return (
        <aside className="pop">
            <div className="con">{props.children}</div> 
            {/* 팝업 요소의 자식요소를 불러와랑 */}
            <span className="close" onClick={() => { props.setOpen(false) }}>close</span>
        </aside>
    );
}

