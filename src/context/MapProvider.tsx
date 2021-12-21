import * as ol from "ol";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MapContextProps {
  map?: ol.Map;
  setMap: Dispatch<SetStateAction<ol.Map | undefined>>;
  getLayerById: <T>(id: string, layerClass: { new (): T }) => T | null;
}

const MapContext = createContext({} as MapContextProps);
export const useMap = () => useContext(MapContext);

type MapProviderProps = {
  children: ReactNode;
};

const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<ol.Map>();

  const getLayerById = <T extends unknown>(
    id: string,
    layerClass: { new (): T }
  ) => {
    if (!map) return null;
    const layers = map
      .getLayers()
      .getArray()
      .filter((l) => l.get("id") === id);
    if (layers.length !== 1) return null;
    if (!(layers[0] instanceof layerClass)) return null;
    return layers[0];
  };

  return (
    <MapContext.Provider value={{ map, setMap, getLayerById }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
