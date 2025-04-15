import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch.js";

function Home() {
    const {data, loading, error} = useFetch("http://localhost:3000/maps");

    if (error)
        throw new Error(error.msg);
    
    const maps = data?.maps;
    return (
        <>
            <h1>Welcome to Spotemal!</h1>
            <p>Click on the links to navigate.</p>  
            <div>
                {loading && <p>Loading...</p>}
                {maps &&
                    maps.map(map => (
                        <div key={map.id}>
                            <Link to={`/maps/${map.id}`}>
                                {map.name}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Home
