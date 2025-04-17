import { createContext } from "react";

const MapContext = createContext(null);

const MapProvider = MapContext.Provider;

export { MapProvider };
export default MapContext;