import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpyMap from "./spy-map"
import useFetch from "../../hooks/useFetch";
import TargetBar from "../../components/target-bar";
import { MapProvider } from "./context";
import { useEffect, useState } from "react";
import Timer from "../../components/timer";

function Game() {
    const {state} = useLocation();
    const {mapId} = state;
    const navigate = useNavigate();

    const [targets, setTargets] = useState();
    const [finalTime, setFinalTime] = useState();

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
        if (map)
            setTargets([...map?.targets].map(target => ({...target, spotted: false})));

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
            {game && !finalTime &&
                <MapProvider value={{game, targets, setTargets, setFinalTime}}>
                    <div>
                        <h2>{map.name}</h2>
                        {targets && <TargetBar />}
                        <>
                            <div className="timer">
                                <Timer />
                            </div>
                            <button onClick={handleStop} className="end-game">
                                Exit
                            </button>
                            <SpyMap />
                        </>
                    </div>
                </MapProvider>
            }
            {loading && <p>Loading...</p>}
            {finalTime &&
                <div className="time-overlay">
                    <p>Spotted All Targets</p>
                    <p>{finalTime.toFixed(2)} s</p>
                </div>
            }
        </>
    )
}

export default Game
