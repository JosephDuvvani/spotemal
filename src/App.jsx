import { createContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

const MapsContext = createContext();

function App() {
  const [maps, setMaps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMap, setActiveMap] = useState(null);

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

  const refreshScorers = (mapId) => {
    const apiUrl = import.meta.env.VITE_SPOTEMAL_API_URL;
    fetch(`${apiUrl}/maps/${mapId}/scorer`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMaps([...maps].map(map => map.id === mapId ? {...map, scorers: data.scorers} : map));
        }
      })
  }

  useEffect(() => {
    const abortController = new AbortController();
    getMaps();

    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <MapsContext.Provider value={{ maps, loading, activeMap, setActiveMap, refreshScorers }}>
      <Outlet />
    </MapsContext.Provider>
  )
}

export default App
export { MapsContext }
