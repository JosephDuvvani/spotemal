import { useEffect, useState } from 'react';
import TargetDropdown from '../../components/target-dropdown';
import '../../assets/styles/spy-map.css';
import image from '../../assets/wall-of-art.jpg';
import { contentOverflow } from '../../utils/utils';

function SpyMap({targets}) {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({x: 0, y: 0, width: 0, height: 0});
    const [menuSize, setMenuSize] = useState(null);

    useEffect(() => {
            if (menuSize) {
                const {width, height} = menuSize;
    
                const overflow = contentOverflow(
                    {width, height},
                    dropdownPosition
                )
                let newPos = {...dropdownPosition};
        
                if (overflow.x)
                    newPos = {...newPos, x: dropdownPosition.x - width};
        
                if (overflow.y)
                    newPos = {...newPos, y: dropdownPosition.y - height};
        
                setDropdownPosition(newPos);
                setDropdownVisibility(true);
            }
        }, [dropdownPosition.x, dropdownPosition.y])

    const handleClick = (e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        const width = containerRect.width;
        const height = containerRect.height;

        setDropdownVisibility(false);
        setDropdownPosition({x, y, width, height});
    };

    return (
        <section className="spymap">
            <img src={image} alt="wall" onClick={handleClick} />
                <TargetDropdown 
                setSize={setMenuSize}
                targets={targets}
                position={dropdownPosition}
                visibility={dropdownVisibility}
                setVisibility={setDropdownVisibility}
            />
        </section>
    )
}

export default SpyMap
