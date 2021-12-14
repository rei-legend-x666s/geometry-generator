import * as ol from "ol";
import { ReactNode, useEffect, useRef, useState } from "react";
import MapContext from "./MapContext";

interface MapProps {
  children: ReactNode;
  zoom: number;
  center: number[];
}

const Map = ({ children, zoom, center }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<ol.Map>();

  useEffect(() => {
    if (!mapRef.current) return;
    const options = {
      view: new ol.View({ zoom, center }),
      layer: [],
      controls: [],
      overlays: [],
    };
    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
