import TimePicker from 'react-time-picker';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';
interface IProps {
    val: string | undefined;
    setval?: (val: string) => void;
    _disabled?: boolean;
}

function CustomTimePicker({ val, setval, _disabled = false }: IProps) {
    const [value, setValue] = useState(val ?? null);

    const handleChange = (newValue: string) => {
        // Format the time string from 22.00 to 22:00
        if (newValue) {
            const formattedValue = newValue.toString().replace(':', '.');
            setValue(formattedValue);
            if (setval) setval(formattedValue)
        }
    };

    // Function to parse time value back to 22.00 format
    const parseValue = (value: string) => {
        return value.replace('.', ':');
    };

    return (
        <div className="custom-time-picker dir-ltr" dir='ltr'>
            <TimePicker
                onChange={(e) => handleChange(e as string)}
                value={value ? parseValue(value) : null}
                className="w-[200px] p-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-600"
                clearIcon={null} // Optionally remove the clear icon
                disabled={_disabled}

            />
        </div>
    );
}

export default CustomTimePicker