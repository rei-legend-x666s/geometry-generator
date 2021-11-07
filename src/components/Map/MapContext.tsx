import * as ol from "ol";
import { createContext } from "react";

interface MapContextProps {
  map?: ol.Map;
}

const MapContext = createContext({} as MapContextProps);

export default MapContext;
