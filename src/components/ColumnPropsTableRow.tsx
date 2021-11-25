import { Delete, MoreVert } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import {
  COLUMN_FORMAT_LIST,
  DATA_TYPE_VALUE,
} from "../constants/column-format";
import { IColumnProperties } from "../types/general";
import GisColumnOptionForm from "./GisColumnOptionForm";

interface ColumnPropsTableRowProps {
  idx: number;
  columnProperty: IColumnProperties;
  handleChangeColumnProperty: (
    id: string,
    prop: keyof IColumnProperties
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  deleteColumnProperties: (id: string) => void;
}

const ColumnPropsTableRow = ({
  idx,
  columnProperty,
  handleChangeColumnProperty,
  deleteColumnProperties,
}: ColumnPropsTableRowProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const optionForm = () => {
    switch (columnProperty.dataFormat) {
      case DATA_TYPE_VALUE.LATITUDE:
      case DATA_TYPE_VALUE.LONGITUDE:
        return <GisColumnOptionForm columnProps={columnProperty} />;
    }
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {idx + 1}
        </TableCell>
        <TableCell align="center">
          <TextField
            placeholder="Row name"
            variant="outlined"
            size="small"
            value={columnProperty.name}
            onChange={handleChangeColumnProperty(columnProperty.id, "name")}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            select
            size="small"
            sx={{ minWidth: 240, textAlign: "left" }}
            value={columnProperty.dataFormat}
            onChange={handleChangeColumnProperty(
              columnProperty.id,
              "dataFormat"
            )}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {COLUMN_FORMAT_LIST.map((dataFormat) => (
              <MenuItem key={dataFormat.value} value={dataFormat.value}>
                {dataFormat.label}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => deleteColumnProperties(columnProperty.id)}
          >
            <Delete />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="options"
            color="primary"
            onClick={() => setOpen(!open)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {optionForm()}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ColumnPropsTableRow;