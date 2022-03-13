import { Add } from "@mui/icons-material";
import { Chip, Grid, IconButton, Stack, TextField } from "@mui/material";
import { KeyboardEventHandler } from "react";
import { useColumnProperty } from "../../context/ColumnPropertyProvider";
import { isStringsColumnOptions } from "../../functions/customTypeGaurd";
import { useInput } from "../../hooks/hooks";
import { IColumnProperties } from "../../types/general";

interface IStringsOptions {
  columnProps: IColumnProperties;
}

const StringsOptions = ({ columnProps }: IStringsOptions) => {
  const { setOptions } = useColumnProperty();
  const { id, options } = columnProps;
  const [stringValueProps, resetStringValue] = useInput("");

  if (!isStringsColumnOptions(options)) return null;

  const addValue = () => {
    setOptions(id, {
      strings: [...options.strings, stringValueProps.value],
    });
    resetStringValue();
  };

  const handleDelete = (idx: number) => {
    setOptions(id, {
      strings: options.strings.filter((_, i) => i !== idx),
    });
  };

  const handleClickAddIcon = () => {
    addValue();
  };

  const handleKeyDownTextField: KeyboardEventHandler<HTMLInputElement> = (
    e
  ): void => {
    if (!e.nativeEvent.isComposing && e.key === "Enter" && e.code === "Enter") {
      addValue();
    }
  };

  return (
    <>
      <Grid container sx={{ m: 1 }}>
        <Stack direction="row" spacing={1}>
          {options.strings.map((value, idx) => (
            <Chip label={value} key={idx} onDelete={() => handleDelete(idx)} />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="value"
          variant="standard"
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ mx: 1 }}
          {...stringValueProps}
          onKeyDown={handleKeyDownTextField}
        />
        <IconButton aria-label="add value" onClick={handleClickAddIcon}>
          <Add color="primary" />
        </IconButton>
      </Grid>
    </>
  );
};

export default StringsOptions;
