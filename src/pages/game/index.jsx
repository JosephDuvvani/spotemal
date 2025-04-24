import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpyMap from "./spy-map"
import useFetch from "../../hooks/useFetch";
import TargetBar from "../../components/target-bar";
import { MapProvider } from "./context";
import { useEffect, useState } from "react";
import Timer from "../../components/timer";
import '../../assets/styles/game.css';
import UserForm from "../../components/user-form";

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
                    console.error(data.error.msg);
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
            <header className="game__header">
                <h1 className="game__header__title">SPOTEMAL</h1>
                {!finalTime &&
                    <button onClick={handleStop} className="btn game__header__btn">
                        Exit
                    </button>
                }
            </header>
            <main className="game__main">
                {game &&
                    <MapProvider value={{game, targets, setTargets, setFinalTime}}>
                        <div>
                            <h3 className="caption">{map.name}</h3>
                            {targets && <TargetBar />}
                            {!finalTime && 
                                <div className="game-clock">
                                    <Timer />
                                </div>
                            }
                            
                            <SpyMap /> 

                            {finalTime &&
                                <div className="overlay">
                                    <h4 className="overlay__title">All Targets Spotted</h4>
                                    <p>IN</p>
                                    <p className="final-time">{finalTime.toFixed(2)} s</p>
                                    <UserForm time={finalTime} />
                                    <button
                                        className="overlay__close-btn"
                                        onClick={() => navigate('/', {replace: true})}
                                    >
                                        <span aria-hidden>X</span>
                                    </button>
                                </div>
                            }  
                        </div>
                    </MapProvider>
                }
                {loading && <p>Loading...</p>}
            </main>
        </>
    )
}

export default Game
