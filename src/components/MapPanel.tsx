import { Paper } from "@mui/material";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { useState } from "react";
import { useDummyData } from "../context/DummyDataProvider";
import { getIndexLatLonDataType } from "../functions/gisUtils";
import Controls from "./Controls/Controls";
import ZoomControl from "./Controls/ZoomControl";
import Layers from "./Layers/Layers";
import TileLayer from "./Layers/TileLayer";
import VectorLayer from "./Layers/VectorLayer";
import Map from "./Map/Map";
import osm from "./Source/osm";
import vector from "./Source/vector";
import { styles } from "./Styles/styles";
import Title from "./Title";
import "ol/ol.css";

const MapPanel = () => {
  const { dummyDataSet } = useDummyData();
  const [center] = useState([140, 35]);
  const [zoom] = useState(9);

  const lonLatArray = () => {
    if (!dummyDataSet) return [];
    const [lonIndex, latIndex] = getIndexLatLonDataType(dummyDataSet);
    if (lonIndex === -1 || latIndex === -1) return [];
    return dummyDataSet.records.map(({ record }) => {
      return [record[lonIndex].data as number, record[latIndex].data as number];
    });
  };

  const features = lonLatArray().map((item) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(styles.point);
    return feature;
  });

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Title>Map</Title>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer source={vector({ features })} />
        </Layers>
        <Controls>
          <ZoomControl />
        </Controls>
      </Map>
    </Paper>
  );
};

export default MapPanel;
