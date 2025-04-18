import { useEffect, useState } from "react";


const Timer = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 0.01)
        }, 10);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>{time.toFixed(2)}</div>
    )
}

export default Timer;