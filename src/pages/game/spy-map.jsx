import { useContext, useState } from 'react';
import TargetDropdown from '../../components/target-dropdown';
import MapContext from './context';

function SpyMap() {
    const [targetPosition, setTargetPosition] = useState({x: 0, y: 0, width: 0, height: 0});

    const {game} = useContext(MapContext);
    const {imageUrl} = game.map;

    const handleClick = (e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        const width = containerRect.width;
        const height = containerRect.height;

        setTargetPosition({x, y, width, height});
    };

    return (
        <section className="spymap">
            <img
                className='spymap__image'
                src={imageUrl}
                alt="map"
                onClick={handleClick}
            />
            <TargetDropdown target={targetPosition} />
        </section>
    )
}

export default SpyMap
