import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpyMap from "./spy-map"
import useFetch from "../../hooks/useFetch";
import TargetBar from "../../components/target-bar";
import { MapProvider } from "./context";
import { useEffect } from "react";

function Game() {
    const {state} = useLocation();
    const {mapId} = state;
    const navigate = useNavigate();

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mapId,
        })
    }

    const {data, loading, error} = useFetch(`http://localhost:3000/game`, options);

    if (error)
        console.log(error);

    const game = data?.game;
    const map = game?.map;
    const targets = map?.targets;

    const endGame = (id) => {
        fetch(`http://localhost:3000/game/${id}/end`, {method: 'POST'})
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
            })
    }

    useEffect(() => {
        if (game?.id) {
            window.onbeforeunload = () => {
                endGame(game.id);
            }
        }
        return () => {
           if (game?.id) {
                endGame(game.id);
                window.onbeforeunload = null;
            }
        }
    }, [game?.id])
    
    const handleStop = () => {
        navigate('/', {replace: true});
    }

    return (
        <>
            {map &&
                <MapProvider value={{map, targets}}>
                    <div>
                        <h2>{map.name}</h2>
                        <TargetBar />
                        <>
                            <button onClick={handleStop} className="end-game">
                                Exit
                            </button>
                            <SpyMap />
                        </>
                    </div>
                </MapProvider>
            }
            {loading && <p>Loading...</p>}
        </>
    )
}

export default Game
