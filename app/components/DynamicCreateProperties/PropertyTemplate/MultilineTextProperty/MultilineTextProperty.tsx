import React, { FunctionComponent } from 'react';
import { ITextPropertyProps, TextProperty } from '../TextProperty';

interface IMultilineTextPropertyProps extends ITextPropertyProps {

}

export const MultilineTextProperty: FunctionComponent<IMultilineTextPropertyProps> = (props) => {
    return (
        <TextProperty {...props} multiline autoExpand />
    )
}