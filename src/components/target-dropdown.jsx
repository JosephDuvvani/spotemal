import { useEffect, useRef} from "react";

const TargetDropdown = ({position, characters, visibility, setVisibility, setSize}) => {
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
                {characters && characters.length > 0 ? (
                    <ul>
                        {characters.map((character, index) => (
                            <li key={index}>
                                <button onClick={handleClick}>{character.name}</button>
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