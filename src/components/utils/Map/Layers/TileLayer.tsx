import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { useEffect } from "react";
import { useMap } from "../../../../context/MapProvider";

interface TileLayerProps {
  source: TileSource;
  zIndex: number;
}

const TileLayer = ({ source, zIndex = 0 }: TileLayerProps) => {
  const { map } = useMap();

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
