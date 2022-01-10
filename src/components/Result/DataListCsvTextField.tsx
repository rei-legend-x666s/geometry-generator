import { FileDownload, PlayCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { DATE_FORMAT, NEW_LINE_CODE } from "../../constants/utils";
import convertCsvText from "../../functions/csvUtils";
import { useChecked } from "../../hooks/hooks";
import { IDummyDataSet } from "../../types/general";

interface DataListCsvTextFieldProps {
  dataSet?: IDummyDataSet;
}

const DataListCsvTextField = ({ dataSet }: DataListCsvTextFieldProps) => {
  const [csvText, setCsvText] = useState<string>("");
  const [needSerialNumberProps] = useChecked(false);
  const [needHeaderProps] = useChecked(false);
  const [newLineCodeLabel, setNewLineCodeLabel] = useState<string>(
    NEW_LINE_CODE.LF.label
  );

  const handleChangeNewLineCode = ({
    target: { value },
  }: SelectChangeEvent) => {
    setNewLineCodeLabel(value);
  };

  const convertCsvTextValue = () => {
    const newLineCode = (NEW_LINE_CODE as any)[newLineCodeLabel].code;
    const textData =
      dataSet?.columnPropsList && dataSet?.records
        ? convertCsvText(dataSet.columnPropsList, dataSet.records, {
            needSerial: needSerialNumberProps.checked,
            needHeader: needHeaderProps.checked,
            newLineCode,
          })
        : "";
    setCsvText(textData);
  };

  const downloadCsvFile = () => {
    const filename = `${format(new Date(), DATE_FORMAT.TYPE4)}.csv`;
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, csvText], { type: "text/csv" });

    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = filename;
    download.click();
    (window.URL || window.webkitURL).revokeObjectURL(url);
  };

  return (
    <Box width="100%">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item sx={{ p: 2 }}>
          <FormControlLabel
            control={<Checkbox {...needSerialNumberProps} size="small" />}
            label="Serial"
            sx={{ mx: 2 }}
          />
          <FormControlLabel
            control={<Checkbox {...needHeaderProps} size="small" />}
            label="Header"
            sx={{ mx: 2 }}
          />
          <FormControl variant="standard" sx={{ width: 80, mx: 2 }}>
            <InputLabel>New line code</InputLabel>
            <Select
              size="small"
              value={newLineCodeLabel}
              onChange={handleChangeNewLineCode}
              displayEmpty
            >
              {Object.keys(NEW_LINE_CODE).map((key, idx) => (
                <MenuItem key={idx} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlayCircle />}
            onClick={convertCsvTextValue}
            sx={{ mx: 2 }}
          >
            CONVERT
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FileDownload />}
            onClick={downloadCsvFile}
            sx={{ mx: 2 }}
            disabled={!csvText}
          >
            DOWNLOAD
          </Button>
        </Grid>
      </Grid>
      <TextField
        multiline
        fullWidth
        value={csvText}
        rows={dataSet?.records.length || 0}
      />
    </Box>
  );
};

export default DataListCsvTextField;
