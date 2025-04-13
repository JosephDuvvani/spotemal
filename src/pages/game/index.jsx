import SpyMap from "./spy-map"

const characters = [
    { name: "Bird" },
    { name: "Duck" },
    { name: "Glass" },
    { name: "Horse" },
]

function Game() {
    return (
        <>
            <h1>Game</h1>
            <SpyMap characters={characters} />
        </>
    )
}

export default Game
