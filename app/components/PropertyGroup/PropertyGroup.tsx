import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { IPropertyGroup } from '@models/PropertyGroup';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { FunctionComponent } from 'react';
import { useMenu } from '@hooks/useMenu';
import { PropertyType } from '@constants';
import { IProperty } from '@models/Property';
import { nanoid } from '@helpers/nanoid';
import { IVideoPropertyData, VideoPropertySourceType } from '@models/PropertyData/VideoPropertyData';
import template from '@config/property-template.json';

interface IPropertyGroupProps {
    data: IPropertyGroup;
    expanded: boolean;
    onExpanedChange: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void;
    children: React.ReactNode;
    onAddProperty: (property: IProperty) => void;
}

export const PropertyGroup: FunctionComponent<IPropertyGroupProps> = ({
    data,
    expanded,
    onExpanedChange,
    children,
    onAddProperty
}) => {
    const { anchor, removeAnchor, setAnchor } = useMenu();

    const _onAddTextProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.textInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.textInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Text,
            dynamic: true,
            group: data.key
        }
        onAddProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddCodeEditorProperty = () => {
        let newProperty: IProperty = {
            id: template.advanced.codeEditor.key.prefix.concat("_").concat(nanoid()),
            key: template.advanced.codeEditor.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.CodeEditor,
            dynamic: true,
            group: data.key
        }
        onAddProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddVideoProperty = () => {
        let newProperty: IProperty<IVideoPropertyData> = {
            id: template.advanced.video.key.prefix.concat("_").concat(nanoid()),
            key: template.advanced.video.key.prefix.concat("_").concat(nanoid(10)),
            value: {
                sourceType: VideoPropertySourceType.Local,
                data: null
            },
            valueType: PropertyType.Video,
            dynamic: true,
            group: data.key
        }
        onAddProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddMultilineTextProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.multilineTextInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.multilineTextInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.MultilineText,
            dynamic: true,
            group: data.key
        }
        onAddProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddNumberProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.numberInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.numberInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Number,
            dynamic: true,
            group: data.key
        }
        onAddProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    return <Accordion expanded={expanded} onChange={onExpanedChange}>
        <AccordionSummary
            expandButton={<Stack direction="row" spacing={2} alignItems="center">
                {expanded ? <IconButton onClick={(e) => onExpanedChange(e, false)}><ExpandLess /></IconButton> :
                    <IconButton onClick={(e) => onExpanedChange(e, true)}><ExpandMore /></IconButton>}
            </Stack>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            toolbar={data.creation.enabled ? <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <div>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => {
                            event.stopPropagation();
                            setAnchor(event.currentTarget);
                        }}>
                        <AddCircleIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={removeAnchor}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        {data.creation.allowTypes.includes(PropertyType.Text) && <MenuItem onClick={_onAddTextProperty}>Text</MenuItem>}
                        {data.creation.allowTypes.includes(PropertyType.MultilineText) && <MenuItem onClick={_onAddMultilineTextProperty}>Multiline Text</MenuItem>}
                        {data.creation.allowTypes.includes(PropertyType.CodeEditor) && <MenuItem onClick={_onAddCodeEditorProperty}>Code editor</MenuItem>}
                        {data.creation.allowTypes.includes(PropertyType.Video) && <MenuItem onClick={_onAddVideoProperty}>Video</MenuItem>}
                        {data.creation.allowTypes.includes(PropertyType.Number) && <MenuItem onClick={_onAddNumberProperty}>Number</MenuItem>}
                    </Menu>
                </div>
            </Stack> : undefined}
        >
            <Typography style={{ fontWeight: expanded ? "bold" : "normal" }}>{data.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
}