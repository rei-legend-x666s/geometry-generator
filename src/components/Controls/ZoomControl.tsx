import { Zoom } from "ol/control";
import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";

const ZoomControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const zoomControl = new Zoom();
    map.addControl(zoomControl);
    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]);
  return null;
};

export default ZoomControl;
