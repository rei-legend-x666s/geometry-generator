import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { useContext, useEffect } from "react";
import MapContext from "../MapContext";

interface TileLayerProps {
  source: TileSource;
  zIndex: number;
}

const TileLayer = ({ source, zIndex = 0 }: TileLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const tileLayer = new OLTileLayer({
      source,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
};

export default TileLayer;
