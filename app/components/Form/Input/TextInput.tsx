import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';

interface ITextInputProps extends Omit<FormControlProps, "onChange" | "onBlur"> {
    onChangeText?: (value: string) => void;
    onBlur?: () => void;
    onEnter?: () => void;
    autoFocus?: boolean;
}

export const TextInput: FunctionComponent<ITextInputProps> = ({
    onChangeText,
    onBlur,
    onEnter,
    ...props
}) => {
    const _onKeyUp = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") onEnter();
    }

    const _onChangeText = (event: ChangeEvent<any>) => {
        if (onChangeText) onChangeText(event.target.value);
    }

    const _onBlur = () => {
        if (onBlur) onBlur();
    }

    return <FormControl {...props} onChange={_onChangeText} onBlur={_onBlur} onKeyUp={_onKeyUp} />
}