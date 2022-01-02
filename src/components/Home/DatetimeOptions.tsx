import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Grid, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isDatetimeOptions } from "../../functions/customTypeGaurd";
import { IColumnProperties } from "../../types/general";

interface IDatetimeOptions {
  columnProps: IColumnProperties;
}

const DatetimeOptions = ({
  columnProps: { id, options },
}: IDatetimeOptions) => {
  const { setOptions } = useColumnProperty();

  if (!isDatetimeOptions(options)) return null;

  const handleChangeFormat = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(id, {
      ...options,
      format: event.currentTarget.value,
    });
  };

  const handleChangeMinDate = (newDate: Date | null) => {
    const newOptions = { ...options };
    newOptions.range.min = newDate?.getTime() || null;
    setOptions(id, newOptions);
  };

  const handleChangeMaxDate = (newDate: Date | null) => {
    const newOptions = { ...options };
    newOptions.range.max = newDate?.getTime() || null;
    setOptions(id, newOptions);
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
        <Grid item xs={3}>
          <DateTimePicker
            label="Min"
            inputFormat="yyyy/MM/dd hh:mm:ss"
            value={options.range.min}
            onChange={handleChangeMinDate}
            renderInput={(props) => (
              <TextField
                {...props}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          ~
        </Grid>
        <Grid item xs={3}>
          <DateTimePicker
            label="Max"
            inputFormat="yyyy/MM/dd hh:mm:ss"
            value={options.range.max}
            onChange={handleChangeMaxDate}
            renderInput={(props) => (
              <TextField
                {...props}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DatetimeOptions;
