import { Zoom } from "ol/control";
import { useEffect } from "react";
import { useMap } from "../../../../context/MapProvider";

const ZoomControl = () => {
  const { map } = useMap();

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
