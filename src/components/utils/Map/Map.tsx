import { Box } from "@mui/material";
import * as ol from "ol";
import { Extent } from "ol/extent";
import { ReactNode, useEffect, useRef } from "react";
import { useMap } from "../../../context/MapProvider";

interface MapProps {
  children: ReactNode;
  zoom: number;
  center: number[];
  extent?: Extent | null;
  height?: string;
}

const Map = ({ children, zoom, center, extent, height }: MapProps) => {
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
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  useEffect(() => {
    if (!map || !extent) return;
    map.getView().fit(extent, {
      duration: 1000,
      padding: [50, 50, 50, 50],
    });
  }, [extent, map]);

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
