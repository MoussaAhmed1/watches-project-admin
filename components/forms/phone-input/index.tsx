// components/PhoneInput.tsx
import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <PhoneInput
        country={"sa"} // Default country
        value={value}
        onChange={onChange}
        inputProps={{
          required: true,
        }}
        inputStyle={{
          width: "100%",
          height: "35px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
          direction: "ltr",
        }}
        dropdownStyle={{
            direction: "ltr",
            borderRadius: "6px",
        }}
        containerStyle={{
            direction: "ltr",
          width: "100%",
        }}
      />
      {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default CustomPhoneInput;
