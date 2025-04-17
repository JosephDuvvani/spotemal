import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import TargetOverlay from "../../components/target-overlay.jsx";

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
            <h1>Welcome to Spotemal!</h1>
            <p>Click on the links to navigate.</p>  
            <div>
                {loading && <p>Loading...</p>}
                {maps &&
                    maps.map(map => (
                        <div key={map.id}>
                            <button onClick={() => setTargets(map.targets)}>
                                {map.name}
                            </button>
                        </div>
                    ))
                }
            </div>
            {targets && (
                <TargetOverlay
                    targets={targets}
                    close={() => setTargets(null)}
                    start={() => handleStart(targets[0].mapId)}
                />
            )}
        </>
    )
}

export default Home
