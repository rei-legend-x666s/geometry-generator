import { Box, FormGroup, InputLabel, Slider, TextField } from "@mui/material";
import { DATA_TYPE_VALUE } from "../constants/column-format";
import { CRS_VALUE } from "../constants/utils";
import { useColumnProperty } from "../context/ColumnPropertyProvider";
import { IColumnProperties, IGisColumnOptions } from "../types/general";

interface GisColumnOptionFormProps {
  columnProps: IColumnProperties;
}

const GisColumnOptionForm = ({ columnProps }: GisColumnOptionFormProps) => {
  const { id, dataFormat } = columnProps;
  const { range } = columnProps.options as IGisColumnOptions;
  const { setOptions } = useColumnProperty();

  const isLatitude = dataFormat === DATA_TYPE_VALUE.LATITUDE;
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
      ...columnProps.options,
      range: {
        xMinMax: isLatitude ? newRange : range.xMinMax,
        yMinMax: isLatitude ? range.yMinMax : newRange,
      },
      crs: CRS_VALUE.ESPG_4326,
    };
    setOptions(id, newOptions);
  };

  return (
    <Box sx={{ m: 1 }}>
      <FormGroup row sx={{ textAlign: "center" }}>
        <InputLabel sx={{ mx: 1 }}>Range</InputLabel>
        <TextField value={minMax[0]} size="small" sx={{ mx: 1 }} />
        <span>~</span>
        <TextField value={minMax[1]} size="small" sx={{ mx: 1 }} />
      </FormGroup>
      <FormGroup row sx={{ width: 500 }}>
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

export default GisColumnOptionForm;
