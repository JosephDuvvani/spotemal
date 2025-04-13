import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <h1>Welcome to Spotemal!</h1>
            <p>Click on the links to navigate.</p>  
            <div>
                <Link to="/game">Game</Link>
            </div>
        </>
    )
}

export default Home
