import { useEffect, useRef} from "react";

const TargetDropdown = ({position, targets, visibility, setVisibility, setSize}) => {
    const menuRef = useRef();

    useEffect(() => {
        if (!visibility) {
            const {width, height} = menuRef.current.getBoundingClientRect();

            setSize({width, height});
        }
    }, [visibility])

    const handleClick = (e) => {
        setVisibility(false);
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
                                <button onClick={handleClick}>{target.name}</button>
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