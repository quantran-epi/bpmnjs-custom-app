import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { useHandleProperty } from '@hooks/useHandleProperty';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { TextInput } from '../../../Form/Input';
import { IBasePropertyTemplateProps } from '../../DynamicCreateProperties.types';

interface ISelectItem {
    value: string;
    label: string;
}

interface ISelectPropertyProps extends IBasePropertyTemplateProps<string> {
    items: ISelectItem[];
}

export const SelectProperty: FunctionComponent<ISelectPropertyProps> = ({
    data,
    onSave,
    onRemove,
    readonly = false,
    autoExpand = false,
    allowDelete = true,
    items
}) => {
    const { data: _data, valueDirty, keyDirty, setKey, setValue, remove, save } = useHandleProperty({ data, onRemove, onSave });
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const _onValueSelectBlur = () => {
        if (valueDirty) save();
    }

    const _onKeyTextBoxBlur = () => {
        if (keyDirty) save();
    }

    const _onKeyTextBoxEnter = () => {
        if (keyDirty) save();
    }

    const _onValueChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value);
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
                        onEnter={_onKeyTextBoxEnter}
                        disabled={!_data.dynamic} />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Value</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={_data.value}
                            label="Value"
                            onChange={_onValueChange}
                            onBlur={_onValueSelectBlur}>
                            {items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </AccordionDetails>
        </Accordion>
    </React.Fragment>
}

