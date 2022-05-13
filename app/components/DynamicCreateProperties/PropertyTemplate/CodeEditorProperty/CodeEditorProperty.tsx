import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { useHandleProperty } from '@hooks/useHandleProperty';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { TextInput } from '../../../Form/Input';
import { IBasePropertyTemplateProps } from '../../DynamicCreateProperties.types';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './CodeEditorProperty.scss';

interface ICodeEditorPropertyProps extends IBasePropertyTemplateProps<string> {

}

export const CodeEditorProperty: FunctionComponent<ICodeEditorPropertyProps> = ({
    data,
    onSave,
    onRemove,
    readonly = false,
    autoExpand = false
}) => {
    const { data: _data, valueDirtyRef, keyDirtyRef, setKey, setValue, saveByRef, removeByRef } = useHandleProperty({ data, onRemove, onSave });
    const inputRef = useRef(null);
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const _onValueTextBoxBlur = () => {
        if (valueDirtyRef.current) saveByRef();
    }

    const _onValueTextBoxEnter = () => {
        if (valueDirtyRef.current) saveByRef();
    }

    const _onKeyTextBoxBlur = () => {
        if (keyDirtyRef.current) saveByRef();
    }

    const _onKeyTextBoxEnter = () => {
        if (keyDirtyRef.current) saveByRef();
    }

    const _onEditorInputChange = (instance: CodeMirror, changeObj: object) => {
        setValue(instance.getValue());
    }

    const _onEditorInputBlur = (instance: CodeMirror, changeObj: object) => {
        _onValueTextBoxBlur();
    }

    useEffect(() => {
        if (!inputRef.current) return;
        let editor = CodeMirror.fromTextArea(inputRef.current, {
            mode: "javascript",
            lineNumbers: true,
        });
        editor.getDoc().setValue(_data.value);

        editor.on('change', _onEditorInputChange);
        editor.on('blur', _onEditorInputBlur);

        return () => {
            editor.off('change', _onEditorInputChange);
            editor.off('blur', _onEditorInputBlur);
        }
    }, [inputRef])

    return <React.Fragment>
        <Accordion expanded={expanded === 'panel1'} style={{ marginLeft: -15, marginRight: -15 }}>
            <AccordionSummary
                expandPosition="left"
                expandButton={<Stack direction="row" spacing={2} alignItems="center">
                    {expanded ? <IconButton onClick={(e) => handleChange('panel1')(e, false)}><ExpandLess /></IconButton> :
                        <IconButton onClick={(e) => handleChange('panel1')(e, true)}><ExpandMore /></IconButton>}
                </Stack>}
                toolbar={<Stack direction="row" spacing={2} alignItems="center">
                    <IconButton color="error" onClick={removeByRef}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>} aria-controls="panel1d-content" id="panel1d-header">
                <Typography style={{ marginLeft: -10 }}>{_data.key}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ borderLeft: "3px solid rgba(0,0,0,0.8)", marginLeft: 15 }}>
                <Stack gap={2} marginTop={0.5}>
                    <TextInput
                        size="small"
                        label="Key"
                        autoFocus
                        placeholder="Enter key"
                        aria-label="Enter key"
                        aria-describedby="basic-addon1"
                        value={_data.key}
                        onChangeText={setKey}
                        onBlur={_onKeyTextBoxBlur}
                        onEnter={_onKeyTextBoxEnter} />
                    {/* <TextInput
                        ref={inputRef}
                        size="small"
                        label="Value"
                        type="text"
                        placeholder="Enter value"
                        aria-label="Enter value"
                        value={_data.value}
                        onChangeText={setValue}
                        onBlur={_onValueTextBoxBlur}
                        onEnter={_onValueTextBoxEnter} /> */}
                    <div style={{ border: "1px solid rgba(0,0,0,0.5)", borderRadius: 4 }}>
                        <textarea ref={inputRef} />
                    </div>
                </Stack>
            </AccordionDetails>
        </Accordion>
    </React.Fragment>
}

