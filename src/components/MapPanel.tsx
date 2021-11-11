import { Paper } from "@mui/material";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { useState } from "react";
import Controls from "./Controls/Controls";
import ZoomControl from "./Controls/ZoomControl";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import VectorLayer from "./Layers/VectorLayer";
import Map from "./Map/Map";
import osm from "./Source/osm";
import vector from "./Source/vector";
import Title from "./Title";
import "ol/ol.css";

const MapPanel = () => {
  const [center, setCenter] = useState([140, 35]);
  const [zoom, setZoom] = useState(9);
  const fill = new Fill({
    color: "rgb(255,0,0)",
  });
  const stroke = new Stroke({
    color: "#ff0000",
    width: 1.25,
  });
  const style = new Style({
    image: new Circle({
      fill: fill,
      stroke: stroke,
      radius: 5,
    }),
    fill: fill,
    stroke: stroke,
  });
  const point = new Point(fromLonLat([140, 35]));

  const features = () => {
    const feature = new Feature({
      geometry: point,
    });
    feature.setStyle(style);
    return [feature];
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Map</Title>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer source={vector({ features: features() })} />
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
      </Map>
    </Paper>
  );
};

export default MapPanel;
