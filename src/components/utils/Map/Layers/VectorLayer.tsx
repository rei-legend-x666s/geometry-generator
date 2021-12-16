import { Geometry } from "ol/geom";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import { useEffect } from "react";
import { useMap } from "../../../../context/MapProvider";

interface VectorLayerProps {
  source: VectorSource<Geometry>;
  id?: string;
  style?: Style;
  zIndex?: number;
}

const VectorLayer = ({ source, id, style, zIndex = 0 }: VectorLayerProps) => {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;
    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    if (id) {
      vectorLayer.setProperties({ id });
    }
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
