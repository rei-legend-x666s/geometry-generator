import { Map } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { fromLonLat, transform } from "ol/proj";
import { useState } from "react";
import { CRS_VALUE } from "../../constants/utils";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { IColumnProperties, IGisColumnOptions } from "../../types/general";
import FullScreenDialog from "../utils/FullScreenDialog";
import Controls from "../utils/Map/Controls/Controls";
import ZoomControl from "../utils/Map/Controls/ZoomControl";
import DragBoxInteraction from "../utils/Map/Interactions/DragBoxInteraction";
import Layers from "../utils/Map/Layers/Layers";
import TileLayer from "../utils/Map/Layers/TileLayer";
import VectorLayer from "../utils/Map/Layers/VectorLayer";
import MapContent from "../utils/Map/Map";
import osm from "../utils/Map/Source/osm";
import vector from "../utils/Map/Source/vector";
import LatLongRangeSlider from "./LatLongRangeSlider";
import "ol/ol.css";

interface GisColumnOptionsProps {
  columnProps: IColumnProperties;
}

const GisColumnOptions = ({ columnProps }: GisColumnOptionsProps) => {
  const { setOptions } = useColumnProperty();
  const [openMap, setOpenMap] = useState(false);
  const [zoom] = useState(9);
  const [center] = useState([140, 35]);
  const [extent, setExtent] = useState<number[]>();
  const options = columnProps.options as IGisColumnOptions;

  const handleClickMap = () => {
    setOpenMap(true);
  };

  const handleFullDialogOk = () => {
    if (!extent || extent.length < 4) {
      setOpenMap(false);
      return;
    }
    const minLonLat = [extent[0], extent[1]];
    const maxLonLat = [extent[2], extent[3]];
    const minRange = transform(
      minLonLat,
      CRS_VALUE.EPSG_3857,
      CRS_VALUE.EPSG_4326
    );
    const maxRange = transform(
      maxLonLat,
      CRS_VALUE.EPSG_3857,
      CRS_VALUE.EPSG_4326
    );
    const newOptions = {
      ...options,
      range: {
        xMinMax: [minRange[1], maxRange[1]],
        yMinMax: [minRange[0], maxRange[0]],
      },
    };
    setOptions(columnProps.id, newOptions);
    setOpenMap(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LatLongRangeSlider columnProps={columnProps} isLatitude={true} />
          <LatLongRangeSlider columnProps={columnProps} isLatitude={false} />
        </Grid>
        <Grid item xs={6}>
          <IconButton aria-label="map" color="inherit" onClick={handleClickMap}>
            <Map />
          </IconButton>
        </Grid>
      </Grid>
      <FullScreenDialog
        open={openMap}
        title="Drag Map"
        handleClose={() => {
          setOpenMap(false);
        }}
        handleOk={handleFullDialogOk}
      >
        <MapContent center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            <VectorLayer source={vector({ features: [] })} id="dragBoxLayer" />
          </Layers>
          <Controls>
            <ZoomControl />
          </Controls>
          <DragBoxInteraction setExtent={setExtent} />
        </MapContent>
      </FullScreenDialog>
    </>
  );
};

export default GisColumnOptions;
