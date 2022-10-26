


export default function Visual() {

    return(
        <figure id="visual" className='myScroll'>
            <video src={process.env.PUBLIC_URL + '/img/vid1.mp4'} loop autoPlay muted></video>
        </figure>
    )
}