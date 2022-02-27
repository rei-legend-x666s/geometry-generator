import { Grid, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { INTEGER } from "../../constants/regex-constant";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isNumberRangeColumnOptions } from "../../functions/customTypeGaurd";
import { IColumnProperties } from "../../types/general";

interface INumberOptionsProps {
  columnProps: IColumnProperties;
}

const NumberOptions = ({ columnProps }: INumberOptionsProps) => {
  const { setOptions } = useColumnProperty();
  const { id, options } = columnProps;

  if (!isNumberRangeColumnOptions(options)) return null;

  const handleChangeRange =
    (isMin: boolean) => (event: ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      const newOptions = { ...options };
      newOptions.range[isMin ? "min" : "max"] = isNumber(value)
        ? Number(value)
        : null;
      setOptions(id, newOptions);
    };

  const isNumber = (value: string) => {
    return INTEGER.test(value);
  };

  return (
    <Grid container alignItems="center" sx={{ m: 1 }}>
      <Grid item xs={3}>
        <TextField
          label="min"
          value={options.range.min}
          onChange={handleChangeRange(true)}
          size="small"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          sx={{ m: 1, minWidth: 100 }}
        />
      </Grid>
      <Grid item xs={1}>
        ~
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="max"
          value={options.range.max}
          onChange={handleChangeRange(false)}
          size="small"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          sx={{ m: 1, minWidth: 100 }}
        />
      </Grid>
    </Grid>
  );
};

export default NumberOptions;
