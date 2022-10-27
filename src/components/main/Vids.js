import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSelector } from "react-redux";


export default function Vids() {
    const { youtube } = useSelector(store => store.youtubeReducer);

    return(
        <main id="vids" className='myScroll'>
           <Swiper
            modules={[Pagination, Navigation]}
            pagination={
                {
                    clickable : true,
                }
            }
            spaceBetween={60}
            loop={true}
            slidesPerView={3}
            centeredSlides={true}
            navigation={true}

        >
                {youtube.map((vid, idx)=>{
                    return(
                        <SwiperSlide key={idx}>
                            <div className="inner">
                                <div className="pic">
                                    <img src={vid.snippet.thumbnails.standard.url} alt="" />
                                </div>
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
        </main>
        
    )
}