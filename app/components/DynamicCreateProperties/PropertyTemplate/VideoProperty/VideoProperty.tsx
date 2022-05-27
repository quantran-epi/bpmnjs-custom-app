import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { useHandleProperty } from '@hooks/useHandleProperty';
import { useUploadFile } from '@hooks/useUploadFile';
import { IVideoPropertyData, VideoPropertySourceType } from '@models/PropertyData/VideoPropertyData';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, styled, Typography } from '@mui/material';
import React, { FunctionComponent, useRef } from 'react';
import { TextInput } from '../../../Form/Input';
import { IBasePropertyTemplateProps } from '../../DynamicCreateProperties.types';

interface IVideoPropertyProps extends IBasePropertyTemplateProps<IVideoPropertyData> {
}

export const VideoProperty: FunctionComponent<IVideoPropertyProps> = ({
    data,
    onSave,
    onRemove,
    readonly = false,
    autoExpand = false,
    allowDelete = true
}) => {
    const { data: _data, valueDirty, keyDirty, setKey, setValue, remove, save } = useHandleProperty<IVideoPropertyData>({ data, onRemove, onSave });
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const { upload } = useUploadFile({
        dest: "http://localhost:5000/upload/"
    })
    const filePickerRef = useRef<HTMLInputElement>(null);

    const _onValueTextBoxBlur = () => {
        if (valueDirty) save();
    }

    const _onValueTextBoxEnter = () => {
        if (valueDirty) save();
    }

    const _onKeyTextBoxBlur = () => {
        if (keyDirty) save();
    }

    const _onKeyTextBoxEnter = () => {
        if (keyDirty) save();
    }

    const _onChangeSourceType = (event: SelectChangeEvent<VideoPropertySourceType>) => {
        setValue({
            ..._data.value,
            sourceType: event.target.value as VideoPropertySourceType
        })
    }

    const _onSourceTypeSelectBlur = () => {
        if (valueDirty) save();
    }

    // const _onVideoSourceUrlInputChanged = (value: string) => {
    //     setValue({
    //         ...data.value,
    //         data: value
    //     })
    // }

    const _onVideoSourceUrlInputBlur = () => {
        if (valueDirty) save();
    }

    const _onFileUploadChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
        let fileToUpload = event.target.files[0];
        upload("uploaded_file", fileToUpload, fileToUpload.name.concat('.svg'))
            .then(res => console.log('upload success', res))
            .catch(err => console.log('err', err));
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
                    {_data.dynamic && <TextInput
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
                    {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Source Type</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={_data.value.sourceType}
                            label="Source Type"
                            onChange={_onChangeSourceType}
                            onBlur={_onSourceTypeSelectBlur}>
                            {Object.keys(VideoPropertySourceType).map(key =>
                                <MenuItem value={VideoPropertySourceType[key]}>{key}</MenuItem>
                            )}
                        </Select>
                    </FormControl> */}
                    {/* {_data.value.sourceType === VideoPropertySourceType.Url &&
                        <TextInput
                            size="small"
                            label="Url"
                            autoFocus
                            placeholder="Enter url"
                            aria-label="Enter url"
                            aria-describedby="basic-addon1"
                            value={_data.value.data}
                            onChangeText={_onVideoSourceUrlInputChanged}
                            onBlur={_onVideoSourceUrlInputBlur} />} */}
                    {_data.value.sourceType === VideoPropertySourceType.Local &&
                        <label htmlFor="contained-button-file">
                            <Input ref={filePickerRef} onChange={_onFileUploadChanged} accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button size="small" variant="contained" component="span">
                                Choose video
                            </Button>
                        </label>}
                </Stack>
            </AccordionDetails>
        </Accordion>
    </React.Fragment>
}

const Input = styled('input')({
    display: 'none',
});
