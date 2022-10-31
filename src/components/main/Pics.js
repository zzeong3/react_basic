import { useSelector } from 'react-redux';

function Pics({ Scrolled, start }) {
    const Pics = useSelector(store => store.flickr.data);
    const position = Scrolled - start || 0;
    return (
        <main id="pics" className='myScroll'>
            <p
                style={{
                    left: 100 + position,
                }}
            >FLICKR</p>
            <h3
                style={{
                    left: 100 + position / 2,
                }}
            >FLICKR</h3>

            <ul>
                {Pics.map((pic, idx) => {
                    if (idx >= 4) return;
                    return (
                        <li key={idx}>
                            <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} />
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}
export default Pics;