import { useContext } from "react";
import MapContext from "../pages/game/context";

const TargetBar = () => {
    const {targets} = useContext(MapContext);

    return (
        <div className="target-bar">
            {targets.map(target => (
                <div 
                    key={target.id}
                    className={target.spotted ? "target spotted" : "target"}
                >
                    <img src={target.imageUrl} alt="" />
                    <p>{target.name}</p>
                </div>
            ))}
        </div>
    )
}

export default TargetBar;