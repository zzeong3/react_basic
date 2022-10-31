import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSelector } from 'react-redux';

function Vids() {
    const youtube = useSelector(store => store.youtube.data);

    return (
        <main id="vids" className='myScroll'>
            <Swiper
                modules={[Pagination, Navigation]}
                pagination={
                    {
                        clickable: true,
                    }
                }
                spaceBetween={60}
                navigation={true}
                loop={true}
                slidesPerView={3}
                centeredSlides={true}
            >
                {/* <SwiperSlide><div className="inner">1</div></SwiperSlide>
                <SwiperSlide><div className="inner">2</div></SwiperSlide>
                <SwiperSlide><div className="inner">3</div></SwiperSlide>
                <SwiperSlide><div className="inner">4</div></SwiperSlide>
                <SwiperSlide><div className="inner">5</div></SwiperSlide> */}

                {youtube.map((vid, idx) => {
                    if (idx >= 5) return;
                    return (
                        <SwiperSlide key={idx}><div className="inner">{vid.snippet.title}</div></SwiperSlide>
                    )
                })}
            </Swiper>
        </main>
    );
}
export default Vids;