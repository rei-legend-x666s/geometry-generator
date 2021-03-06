import {
  Box,
  FormGroup,
  Grid,
  InputLabel,
  Slider,
  TextField,
} from "@mui/material";
import { CRS_VALUE } from "../../constants/utils";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { IColumnProperties, IGisColumnOptions } from "../../types/general";

interface GisColumnOptionFormProps {
  columnProps: IColumnProperties;
  isLatitude: boolean;
  labelName?: string;
}

const LatLongRangeSlider = ({
  columnProps,
  isLatitude,
  labelName = "Range",
}: GisColumnOptionFormProps) => {
  const { id, options } = columnProps;
  const { range } = options as IGisColumnOptions;
  const { setOptions } = useColumnProperty();

  const minMax = isLatitude ? range.xMinMax : range.yMinMax;

  const minDistance = 1;

  const handleChangeRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const newRange =
      activeThumb === 0
        ? [Math.min(newValue[0], minMax[1] - minDistance), minMax[1]]
        : [minMax[0], Math.max(newValue[1], minMax[0] + minDistance)];
    const newOptions = {
      ...options,
      range: {
        xMinMax: isLatitude ? newRange : range.xMinMax,
        yMinMax: isLatitude ? range.yMinMax : newRange,
      },
      crs: CRS_VALUE.EPSG_4326,
    };
    setOptions(id, newOptions);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Grid container alignItems="center">
        <InputLabel
          title={labelName}
          sx={{ mx: 1, width: 80, color: "inherit" }}
        >
          {labelName}
        </InputLabel>
        <TextField value={minMax[0]} size="small" sx={{ mx: 1 }} />
        <span>~</span>
        <TextField value={minMax[1]} size="small" sx={{ mx: 1 }} />
      </Grid>
      <FormGroup row sx={{ width: "100%" }}>
        <Slider
          value={minMax}
          onChange={handleChangeRange}
          min={isLatitude ? -90 : -180}
          max={isLatitude ? 90 : 180}
          disableSwap
        />
      </FormGroup>
    </Box>
  );
};

export default LatLongRangeSlider;
