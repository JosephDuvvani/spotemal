import { useContext, useEffect, useState } from 'react';
import TargetDropdown from '../../components/target-dropdown';
import '../../assets/styles/spy-map.css';
import { contentOverflow } from '../../utils/utils';
import MapContext from './context';

function SpyMap() {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({x: 0, y: 0, width: 0, height: 0});
    const [menuSize, setMenuSize] = useState(null);

    const {map ,targets} = useContext(MapContext);

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
            <img src={map.imageUrl} alt="wall" onClick={handleClick} />
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
