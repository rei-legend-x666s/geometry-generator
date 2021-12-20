import { Box } from "@mui/material";
import * as ol from "ol";
import { ReactNode, useEffect, useRef } from "react";
import { useMap } from "../../../context/MapProvider";

interface MapProps {
  children: ReactNode;
  zoom: number;
  center: number[];
  height?: string;
}

const Map = ({ children, zoom, center, height }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, setMap } = useMap();

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
    <Box
      component="div"
      ref={mapRef}
      sx={{ width: "100%", height: height ? height : "100% !important" }}
    >
      {children}
    </Box>
  );
};

export default Map;
