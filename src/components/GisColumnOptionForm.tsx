import { Box, FormGroup, InputLabel, Slider, TextField } from "@mui/material";
import { DATA_TYPE_VALUE } from "../constants/column-format";
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
  const minDistance = 1;

  const handleChangeRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const newOptions = {
      ...columnProps.options,
      range:
        activeThumb === 0
          ? [Math.min(newValue[0], range[1] - minDistance), range[1]]
          : [range[0], Math.max(newValue[1], range[0] + minDistance)],
    };
    setOptions(id, newOptions);
  };

  return (
    <Box sx={{ m: 1 }}>
      <FormGroup row sx={{ textAlign: "center" }}>
        <InputLabel sx={{ mx: 1 }}>Range</InputLabel>
        <TextField value={range[0]} size="small" sx={{ mx: 1 }} />
        <span>~</span>
        <TextField value={range[1]} size="small" sx={{ mx: 1 }} />
      </FormGroup>
      <FormGroup row sx={{ width: 500 }}>
        <Slider
          value={range}
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
