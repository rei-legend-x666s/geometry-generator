import { Paper } from "@mui/material";
import { fromLonLat } from "ol/proj";
import { useState } from "react";
import Controls from "./Controls/Controls";
import ZoomControl from "./Controls/ZoomControl";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import Map from "./Map/Map";
import osm from "./Source/osm";
import Title from "./Title";
import "ol/ol.css";

const MapPanel = () => {
  const [center, setCenter] = useState([140, 35]);
  const [zoom, setZoom] = useState(9);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Map</Title>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
      </Map>
    </Paper>
  );
};

export default MapPanel;
