import { DatePicker, DateTimePicker } from "@mui/lab";
import { Grid, TextField, TextFieldProps } from "@mui/material";
import { DATA_TYPE_VALUE } from "../../constants/column-format";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isDatetimeOptions } from "../../functions/customTypeGaurd";
import { IColumnProperties } from "../../types/general";

interface IDateRangePickerWrapper {
  columnProps: IColumnProperties;
}

const DateRangePickerWrapper = ({
  columnProps: { id, dataFormat, options },
}: IDateRangePickerWrapper) => {
  const { setOptions } = useColumnProperty();

  if (!isDatetimeOptions(options)) return null;

  const datePicker = (isMin: boolean) => {
    const textField = (props: TextFieldProps) => (
      <TextField
        {...props}
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
    );

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

    switch (dataFormat) {
      case DATA_TYPE_VALUE.DATETIME:
        return (
          <DateTimePicker
            label={isMin ? "Min" : "Max"}
            inputFormat={options.format}
            value={isMin ? options.range.min : options.range.max}
            onChange={isMin ? handleChangeMinDate : handleChangeMaxDate}
            renderInput={textField}
          />
        );
      case DATA_TYPE_VALUE.DATE:
        return (
          <DatePicker
            label={isMin ? "Min" : "Max"}
            inputFormat={options.format}
            value={isMin ? options.range.min : options.range.max}
            onChange={isMin ? handleChangeMinDate : handleChangeMaxDate}
            renderInput={textField}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Grid item xs={3}>
        {datePicker(false)}
      </Grid>
      <Grid item xs={1}>
        ~
      </Grid>
      <Grid item xs={3}>
        {datePicker(true)}
      </Grid>
    </>
  );
};

export default DateRangePickerWrapper;
