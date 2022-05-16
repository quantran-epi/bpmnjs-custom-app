import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface ITextInputProps extends Omit<TextFieldProps, "onChange" | "onBlur"> {
    onChangeText?: (value: string) => void;
    onBlur?: () => void;
    onEnter?: () => void;
}

export const TextInput = React.forwardRef<HTMLDivElement, ITextInputProps>(({
    onChangeText,
    onBlur,
    onEnter,
    ...props
}, ref) => {
    const _onKeyUp = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") onEnter();
    }

    const _onChangeText = (event: ChangeEvent<any>) => {
        if (onChangeText) onChangeText(event.target.value);
    }

    const _onBlur = () => {
        if (onBlur) onBlur();
    }

    return <TextField ref={ref} {...props} variant={props.variant} onChange={_onChangeText} onBlur={_onBlur} onKeyUp={_onKeyUp} />
})