/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-21 13:35:06
 * @modify date 2024-02-21 13:35:06
 * @desc [description]
 */
import React, { useState } from 'react';
import TimePickerPicker from 'react-time-picker';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function TimePicker() {
  const [value, onChange] = useState(new Date());

     return (
        <div>
            <TimePickerPicker onChange={onChange} value={value} />
        </div>
    );
}


function CurrentTimePicker({ value, onChange }) {
    return (
        <>
            <TimePickerPicker onChange={onChange} value={value} />
        </>
    );
}

export {CurrentTimePicker};
export default TimePicker;