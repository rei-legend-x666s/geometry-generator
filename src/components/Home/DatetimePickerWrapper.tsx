import { DatePicker, DateTimePicker, TimePicker } from "@mui/lab";
import { TextField, TextFieldProps } from "@mui/material";

interface IDatetimePickerWrapper {
  type: "datetime" | "date" | "time";
  label?: string;
  inputFormat: string;
  value: number | null;
  onChange: (newDate: Date | null) => void;
}

const DatetimePickerWrapper = ({
  type,
  label,
  inputFormat,
  value,
  onChange,
}: IDatetimePickerWrapper) => {
  const datePicker = () => {
    const textField = (props: TextFieldProps) => (
      <TextField
        {...props}
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
    );

    switch (type) {
      case "datetime":
        return (
          <DateTimePicker
            label={label ? label : "Datetime"}
            inputFormat={inputFormat}
            onChange={onChange}
            value={value}
            renderInput={textField}
          />
        );
      case "date":
        return (
          <DatePicker
            label={label ? label : "Date"}
            inputFormat={inputFormat}
            onChange={onChange}
            value={value}
            renderInput={textField}
          />
        );
      case "time":
        return (
          <TimePicker
            label={label ? label : "Time"}
            inputFormat={inputFormat}
            onChange={onChange}
            value={value}
            renderInput={textField}
          />
        );
    }
  };
  return <>{datePicker()}</>;
};

export default DatetimePickerWrapper;
