import { useContext, useEffect, useRef, useState} from "react";
import MapContext from "../pages/game/context";
import { contentOverflow } from "../utils/utils";

const TargetDropdown = ({target}) => {
    const [position, setPosition] = useState(target);
    const [visibility, setVisibility] = useState(false);
    const {game, targets, setTargets, setFinalTime} = useContext(MapContext);

    const menuRef = useRef();

    useEffect(() => {
        const {width, height} = menuRef.current.getBoundingClientRect();
            
        const overflow = contentOverflow(
            {width, height},
            target
        )
        let newPos = {...target};

        if (overflow.x)
            newPos = {...newPos, x: target.x - width};

        if (overflow.y)
            newPos = {...newPos, y: target.y - height};

        setPosition(newPos);
        setVisibility(true);
    }, [target.x, target.y])

    const spotTarget = (targetId) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                targetId,
                position: {
                    x: target.x,
                    y: target.y,
                },
                mapSize: {
                    width: target.width,
                    height: target.height,
                }
            })
        }

        fetch(`http://localhost:3000/game/${game.id}/spot`, options)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    console.log(error);
                else if (!data.verified) {
                    console.log(data.msg);
                } else if (data.time) {
                    const startTime = new Date(data.time.start).getTime();
                    const endTime = new Date(data.time.end).getTime();
                    const time = endTime - startTime;
                    const finalTime = time / 1000;
                    setFinalTime(finalTime);
                }
                else {
                    let newTargets = targets.map(target => {
                        if (!target.spotted && data.spotted.includes(target.id))
                            return {...target, spotted: true};
                        return target;
                    })
                    setTargets(newTargets);
                }
            })
            .finally(() => {
                setVisibility(false);
            })
    }

    return (
        <>
        {position && (
            <div
                className="dropdown"
                style={{
                top: position.y,
                left: position.x,
                visibility: visibility ? "visible" : "hidden",
                }}
                ref={menuRef}
            >
                {targets && targets.length > 0 ? (
                    <ul>
                        {targets.map((target, index) => (
                            <li key={index}>
                                <button onClick={(e) => spotTarget(target.id)}>{target.name}</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No characters available</p>
                )}
            </div>
        )}
        </>
    );
};

export default TargetDropdown;