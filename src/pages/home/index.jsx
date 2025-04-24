import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Overlay from "../../components/overlay.jsx";

function Home() {
    const [maps, setMaps] = useState(null);
    const [targets, setTargets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scores, setScores] = useState(null);
    const navigate = useNavigate();

    const getMaps = () => {
        const apiUrl = import.meta.env.VITE_SPOTEMAL_API_URL;
        fetch(`${apiUrl}/maps`)
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
                            <button className="card__scores-btn" onClick={() => setScores({scorers: map.scorers, title: map.name})}>
                                VIEW TOP SCORES
                            </button>
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
            {scores && 
                <Overlay>
                    {scores.scorers.length > 0 ?
                        <table>
                            <caption>{scores.title} Top 10</caption>
                            <tr>
                                <th>Player Name</th>
                                <th>TIME (s)</th>
                            </tr>
                            {scores.scorers.map(scorer => (
                                <tr key={scorer.id}>
                                    <td>{scorer.username}</td>
                                    <td>{scorer.time}</td>
                                </tr>
                            ))}
                        </table> : 
                        <div>No Scorers</div>
                    }
                    <button className="overlay__close-btn" onClick={() => setScores(null)}>
                        <span aria-hidden>X</span>
                    </button>
                </Overlay>
            }
        </>
    )
}

export default Home
