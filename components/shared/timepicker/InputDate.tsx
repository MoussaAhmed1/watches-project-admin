"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

type InputDateProps = {
  value?: string | null;
  defaultValue?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  disableFuture?: boolean;
  maxWidth?: string;
};
export default function InputDate({
  value,
  onChange,
  disabled,
  defaultValue,
  disableFuture,
  maxWidth = "250px"
}: InputDateProps) {
  return (
   <div dir="ltr">
     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
       <DatePicker
         value={value ? dayjs(value) : undefined}
         defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
         onChange={(newValue) => {
           onChange(newValue!.format("YYYY-MM-DD"));
         }}
         disabled={disabled}
         disableFuture={disableFuture}
         sx={{ "& .MuiInputBase-root": {
                  height: 48,
                  borderRadius: "0.5rem",
                  border: "1px solid #E2E8F0",
                }, }}
         //decresed the padding of the date picker
         slotProps={{
          popper: { dir:"ltr"},
           textField: {
             size: "small",
             sx: {
               directon:"ltr",
               padding: "0px",
               maxWidth,
               width: "100%",
               '& svg': {
                 color: 'gray',
               },
               '& input': {
                 color: 'gray',
                 direction:"ltr",
               },
               "& .MuiInputBase-root": {
                  height: 48,
                  borderRadius: "0.5rem",
                  border: "1px solid #E2E8F0",
                },
             },
           },
         }}
       />
     </LocalizationProvider>
   </div>
  );
}
