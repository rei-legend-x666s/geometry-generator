import { Geometry } from "ol/geom";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";

interface VectorLayerProps {
  source: VectorSource<Geometry>;
  style?: Style;
  zIndex?: number;
}

const VectorLayer = ({ source, style, zIndex = 0 }: VectorLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
};

export default VectorLayer;
