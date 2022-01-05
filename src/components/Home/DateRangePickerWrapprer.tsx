import { Grid } from "@mui/material";
import { DATA_TYPE_VALUE } from "../../constants/column-format";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isDatetimeOptions } from "../../functions/customTypeGaurd";
import { IColumnProperties } from "../../types/general";
import DatetimePickerWrapper from "./DatetimePickerWrapper";

interface IDateRangePickerWrapper {
  columnProps: IColumnProperties;
}

const DateRangePickerWrapper = ({ columnProps }: IDateRangePickerWrapper) => {
  const { setOptions } = useColumnProperty();
  const { id, dataFormat, options } = columnProps;

  if (!isDatetimeOptions(options)) return null;

  const handleChangeDate = (newDate: Date | null, isMin: boolean) => {
    const newOptions = { ...options };
    newOptions.range[isMin ? "min" : "max"] = newDate?.getTime() || null;
    setOptions(id, newOptions);
  };

  const datePickerType = () => {
    switch (dataFormat) {
      case DATA_TYPE_VALUE.DATE:
        return "date";
      default:
        return "datetime";
    }
  };

  return (
    <>
      <Grid item xs={3}>
        <DatetimePickerWrapper
          type={datePickerType()}
          label="Min"
          inputFormat={options.format}
          value={options.range.min}
          onChange={(newDate) => handleChangeDate(newDate, true)}
        />
      </Grid>
      <Grid item xs={1}>
        ~
      </Grid>
      <Grid item xs={3}>
        <DatetimePickerWrapper
          type={datePickerType()}
          label="Max"
          inputFormat={options.format}
          value={options.range.max}
          onChange={(newDate) => handleChangeDate(newDate, false)}
        />
      </Grid>
    </>
  );
};

export default DateRangePickerWrapper;
