import { Map } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Extent } from "ol/extent";
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
  const [extent, setExtent] = useState<Extent | null>(null);
  const options = columnProps.options as IGisColumnOptions;

  const handleClickMap = () => {
    const { xMinMax, yMinMax } = options.range;
    const [yMin, xMin] = transform(
      [yMinMax[0], xMinMax[0]],
      CRS_VALUE.EPSG_4326,
      CRS_VALUE.EPSG_3857
    );
    const [yMax, xMax] = transform(
      [yMinMax[1], xMinMax[1]],
      CRS_VALUE.EPSG_4326,
      CRS_VALUE.EPSG_3857
    );
    setExtent([yMin, xMin, yMax, xMax]);
    setOpenMap(true);
  };

  const setRange = () => {
    const layer = getLayerById("dragBoxLayer", OLVectorLayer);
    if (!layer) return;

    const source = layer.getSource();
    if (!(source instanceof VectorSource)) return;

    const geometry = source.getFeatureById("box").getGeometry();
    if (!geometry) return;

    const extent = geometry.getExtent();
    if (!extent || extent.length < 4) return;

    const [yMin, xMin] = transform(
      [extent[0], extent[1]],
      CRS_VALUE.EPSG_3857,
      CRS_VALUE.EPSG_4326
    );
    const [yMax, xMax] = transform(
      [extent[2], extent[3]],
      CRS_VALUE.EPSG_3857,
      CRS_VALUE.EPSG_4326
    );

    const newOptions = {
      ...options,
      range: {
        xMinMax: [xMin, xMax],
        yMinMax: [yMin, yMax],
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
        extent={extent}
        handleOk={handleFullDialogOk}
        handleCancel={() => setOpenMap(false)}
      />
    </>
  );
};

export default GisColumnOptions;
