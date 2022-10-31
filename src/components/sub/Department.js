import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

export default function Department(){
    const Members = useSelector(store=> store.members.data)
    return(
        <Layout name={'Department'}>
            {Members.map((data, index)=>{
                return (
                    <article key={index}>
                        <div className="inner">
                            <div className="pic">
                                <img src={`${process.env.PUBLIC_URL}/img/${data.pic}`} alt={data.name} />
                            </div>
                            <h3>{data.name}</h3>
                            <p>{data.position}</p>
                        </div>
                    </article>
                );
            })} 
        </Layout>
    );
}



// import React from "react"
// export default function Department() {
//     return(
//         <section className="content department">
//             <figure></figure>
//             <div className="inner">
//                 <h1>Department</h1>
//             </div>
//         </section>
//     )
// }