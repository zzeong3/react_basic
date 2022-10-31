import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSelector } from "react-redux";
import Popup from '../common/Popup';
import {useRef, useState} from 'react';


export default function Vids() {
    const pop = useRef(null);
    const swperRef = useRef(null);
    const [Index, setIndex] = useState(0);

    const { youtube } = useSelector(store => store.youtubeReducer);

    return(
        <>

        <main id="vids" className='myScroll'>
             {youtube.length !==0 && (
                <Swiper ref={swperRef}
                modules={[Pagination, Navigation, Autoplay]}
                pagination={
                    {
                        clickable : true,
                    }
                }
                spaceBetween={60}
                loop={true}
                slidesPerView= {"auto"}
                centeredSlides={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                breakpoints={{
                    320: {
                      slidesPerView: 1,  
                    },
                    580: {
                      slidesPerView: 'auto', 
                    },
                  }}
    
            >
                    {youtube.map((vid, idx)=>{
                        return(
                            <SwiperSlide key={idx}>
                                <div className="inner">
                                    <div className="pic" onClick={()=>{
                                            pop.current.open();
                                            setIndex(idx);
                                            swperRef.current.swiper.autoplay.stop();
                                        }}>
                                        <img src={vid.snippet.thumbnails.standard.url} alt="" />
                                    </div>
                                    <h2>{vid.snippet.title}</h2>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    {/* <SwiperSlide><div className="inner">1</div></SwiperSlide>
                    <SwiperSlide><div className="inner">2</div></SwiperSlide>
                    <SwiperSlide><div className="inner">3</div></SwiperSlide>
                    <SwiperSlide><div className="inner">4</div></SwiperSlide>
                    <SwiperSlide><div className="inner">5</div></SwiperSlide> */}
               </Swiper>
             )}
           
        </main>

        <Popup ref={pop}>
            {youtube.length !== 0 && (
                <iframe src={`https://www.youtube.com/embed/${youtube[Index].snippet.resourceId.videoId}`} frameborder="0"></iframe>    
                )
            }
        </Popup>

        </>
        
    )
}