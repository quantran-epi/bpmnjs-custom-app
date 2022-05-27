import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { useHandleProperty } from '@hooks/useHandleProperty';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { TextInput } from '../../../Form/Input';
import { IBasePropertyTemplateProps } from '../../DynamicCreateProperties.types';

export interface ITextPropertyProps extends IBasePropertyTemplateProps<string> {
    multiline?: boolean;
    rows?: number;
    type?: React.InputHTMLAttributes<unknown>['type'];
}

export const TextProperty: FunctionComponent<ITextPropertyProps> = ({
    data,
    onSave,
    onRemove,
    readonly = false,
    autoExpand = true,
    allowDelete = true,
    multiline = false,
    rows = 5,
    type = "text"
}) => {
    const { data: _data, valueDirty, keyDirty, setKey, setValue, remove, save } = useHandleProperty({ data, onRemove, onSave });
    const [expanded, setExpanded] = React.useState<string | false>(autoExpand ? 'panel1' : false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const _onValueTextBoxBlur = () => {
        if (valueDirty) save();
    }

    const _onValueTextBoxEnter = () => {
        if (multiline) return;
        if (valueDirty) save();
    }

    const _onKeyTextBoxBlur = () => {
        if (keyDirty) save();
    }

    const _onKeyTextBoxEnter = () => {
        if (keyDirty) save();
    }

    return <React.Fragment>
        <Accordion expanded={expanded === 'panel1'} style={{ marginLeft: -15, marginRight: -15 }}>
            <AccordionSummary
                expandPosition="left"
                expandButton={<Stack direction="row" spacing={2} alignItems="center">
                    {expanded ? <IconButton onClick={(e) => handleChange('panel1')(e, false)}><ExpandLess /></IconButton> :
                        <IconButton onClick={(e) => handleChange('panel1')(e, true)}><ExpandMore /></IconButton>}
                </Stack>}
                toolbar={<Stack direction="row" spacing={2} alignItems="center">
                    {allowDelete && <IconButton color="error" onClick={remove}>
                        <DeleteIcon />
                    </IconButton>}
                </Stack>} aria-controls="panel1d-content" id="panel1d-header">
                <Typography style={{ marginLeft: -10 }}>{_data.key}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ borderLeft: "3px solid rgba(0,0,0,0.8)", marginLeft: 15 }}>
                <Stack gap={2} marginTop={0.5}>
                    {data.dynamic && <TextInput
                        size="small"
                        label="Key"
                        autoFocus
                        placeholder="Enter key"
                        aria-label="Enter key"
                        aria-describedby="basic-addon1"
                        value={_data.key}
                        onChangeText={setKey}
                        onBlur={_onKeyTextBoxBlur}
                        onEnter={_onKeyTextBoxEnter} />}
                    <TextInput
                        multiline={multiline}
                        rows={rows}
                        size="small"
                        label="Value"
                        type={type}
                        placeholder="Enter value"
                        aria-label="Enter value"
                        value={_data.value}
                        onChangeText={setValue}
                        onBlur={_onValueTextBoxBlur}
                        onEnter={_onValueTextBoxEnter} />
                </Stack>
            </AccordionDetails>
        </Accordion>
    </React.Fragment>
}

