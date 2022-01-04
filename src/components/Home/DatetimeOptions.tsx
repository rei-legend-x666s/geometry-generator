import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Grid, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isDatetimeOptions } from "../../functions/customTypeGaurd";
import { IColumnProperties } from "../../types/general";
import DateRangePickerWrapper from "./DateRangePickerWrapprer";

interface IDatetimeOptions {
  columnProps: IColumnProperties;
}

const DatetimeOptions = ({ columnProps }: IDatetimeOptions) => {
  const { id, options } = columnProps;
  const { setOptions } = useColumnProperty();

  if (!isDatetimeOptions(options)) return null;

  const handleChangeFormat = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(id, {
      ...options,
      format: event.currentTarget.value,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container alignItems="center" sx={{ m: 1 }}>
        <Grid item xs={4}>
          <TextField
            label="Format"
            defaultValue={options.format}
            onChange={handleChangeFormat}
            size="small"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            sx={{ m: 1, minWidth: 180 }}
          />
        </Grid>
        <DateRangePickerWrapper columnProps={columnProps} />
      </Grid>
    </LocalizationProvider>
  );
};

export default DatetimeOptions;
