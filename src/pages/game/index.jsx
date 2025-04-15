import { useParams } from "react-router-dom";
import SpyMap from "./spy-map"
import useFetch from "../../hooks/useFetch";

function Game() {
    const {id} = useParams();
    const {data, loading, error} = useFetch(`http://localhost:3000/maps/${id}`);

    if (error)
        throw new Error(error.msg);

    const map = data?.map;
    const targets = map?.targets;

    return (
        <>
            {map &&
                <div>
                    <h2>{map.name}</h2>
                    <SpyMap targets={targets} />
                </div>
            }
            {loading && <p>Loading...</p>}
        </>
    )
}

export default Game
