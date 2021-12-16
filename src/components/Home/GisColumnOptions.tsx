import { Map } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Geometry } from "ol/geom";
import OLVectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { useState } from "react";
import { CRS_VALUE } from "../../constants/utils";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { useMap } from "../../context/MapProvider";
import { IColumnProperties, IGisColumnOptions } from "../../types/general";
import LatLongRangeSlider from "./LatLongRangeSlider";
import RangeInputMapDialog from "./RangeInputMapDialog";
import "ol/ol.css";

interface GisColumnOptionsProps {
  columnProps: IColumnProperties;
}

const GisColumnOptions = ({ columnProps }: GisColumnOptionsProps) => {
  const { setOptions } = useColumnProperty();
  const { getLayerById } = useMap();
  const [openMap, setOpenMap] = useState(false);
  const options = columnProps.options as IGisColumnOptions;

  const handleClickMap = () => {
    setOpenMap(true);
  };

  const setRange = () => {
    const layer = getLayerById("dragBoxLayer");
    if (!layer) return;

    const geometry = (layer as OLVectorLayer<VectorSource<Geometry>>)
      .getSource()
      .getFeatureById("box")
      .getGeometry();
    if (!geometry) return;

    const extent = geometry.getExtent();
    if (!extent || extent.length < 4) return;

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
  };

  const handleFullDialogOk = () => {
    setRange();
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
      <RangeInputMapDialog
        open={openMap}
        handleOk={handleFullDialogOk}
        handleCancel={() => setOpenMap(false)}
      />
    </>
  );
};

export default GisColumnOptions;
