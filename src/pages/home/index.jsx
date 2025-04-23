import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Overlay from "../../components/overlay.jsx";

function Home() {
    const [maps, setMaps] = useState(null);
    const [targets, setTargets] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getMaps = () => {
        fetch("http://localhost:3000/maps")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMaps(data.maps);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        const abortController = new AbortController();
        getMaps();

        return () => {
            abortController.abort();
        }
    }, [])

    const handleStart = (mapId) => {
        navigate("/game", {
            state: {
                mapId,
            }
        });
    }

    return (
        <>
            <h1 className="title">SPOTEMAL</h1>
            <h2 className="caption">CAN YOU SPOT THE TARGET?</h2>
            <div className="games">
                {loading && <p>Loading...</p>}
                {maps &&
                    maps.map(map => (
                        <div key={map.id} className="card">
                            <h2 className="card__title">{map.name}</h2>
                            <img src={map.imageUrl} alt="" className="card__image" />
                            <button
                                className="btn card__btn"
                                onClick={() => setTargets(map.targets)}
                            >
                                PLAY GAME
                            </button>
                        </div>
                    ))
                }
            </div>
            {targets && (
                <Overlay>
                    <h3 className="overlay__title">Targets</h3>
                    <div className="targets">
                        {targets.map((target, index) => (
                            <div key={index} className='target'>
                                <img src={target.imageUrl} alt="" className="target__image" />
                                <p className="target__name">{target.name}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className='btn'
                        onClick={() => handleStart(targets[0].mapId)}
                    >
                        START GAME
                    </button>
                    <button
                        className="overlay__close-btn"
                        onClick={() => setTargets(null)}
                        aria-label="Close overlay"
                    >
                        <span aria-hidden>X</span>
                    </button>
                </Overlay>
            )}
        </>
    )
}

export default Home
