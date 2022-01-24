import { Map } from "@mui/icons-material";
import { Grid, IconButton, InputLabel } from "@mui/material";
import dynamic from "next/dynamic";
import { Extent } from "ol/extent";
import OLVectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import { useState } from "react";
import { CRS_VALUE } from "../../constants/utils";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { useMap } from "../../context/MapProvider";
import { IColumnProperties, IGisColumnOptions } from "../../types/general";
import LatLongRangeSlider from "./LatLongRangeSlider";
import "ol/ol.css";

const RangeInputMapDialog = dynamic(() => import("./RangeInputMapDialog"), {
  ssr: false,
});

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
    const extent = getLayerById("dragBoxLayer", OLVectorLayer)
      ?.getSource()
      .getFeatureById("box")
      .getGeometry()
      .getExtent();
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
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={7}>
          <LatLongRangeSlider
            columnProps={columnProps}
            isLatitude={true}
            labelName="latitude"
          />
          <LatLongRangeSlider
            columnProps={columnProps}
            isLatitude={false}
            labelName="longitude"
          />
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent="center">
            <InputLabel sx={{ color: "inherit" }}>From Map</InputLabel>
            <IconButton
              aria-label="map"
              color="inherit"
              onClick={handleClickMap}
            >
              <Map fontSize="large" />
            </IconButton>
          </Grid>
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
