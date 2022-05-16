import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { PropertyList } from '@components/PropertyList';
import template from '@config/property-template.json';
import { PropertyType } from '@constants';
import { nanoid } from '@helpers/nanoid';
import { useMenu } from '@hooks/useMenu';
import { useProperties } from '@hooks/useProperties';
import { IVideoPropertyData, VideoPropertySourceType } from '@models/Properties/VideoPropertyData';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent, useMemo } from 'react';
import { INode } from '../../models/Node';
import { IProperty } from '../../models/Property';

interface IDynamicCreatePropertiesProps {
    node: INode;
    expanded: boolean;
    onExpanedChange: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void;
    title?: string;
    allowCreateTypes?: PropertyType[];
    style?: React.CSSProperties;
    className?: string;
}

export const DynamicCreateProperties: FunctionComponent<IDynamicCreatePropertiesProps> = ({
    node,
    expanded,
    onExpanedChange,
    title = "Dynamic Properties",
    allowCreateTypes = Object.values(PropertyType),
    style,
    className
}) => {
    const { anchor, removeAnchor, setAnchor } = useMenu();
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: node });

    const _dynamicProperties = useMemo(() => {
        return _properties.filter(prop => prop.dynamic);
    }, [_properties])

    const _onAddTextProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.textInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.textInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Text,
            dynamic: true
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddCodeEditorProperty = () => {
        let newProperty: IProperty = {
            id: template.advanced.codeEditor.key.prefix.concat("_").concat(nanoid()),
            key: template.advanced.codeEditor.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.CodeEditor,
            dynamic: true
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
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
            dynamic: true
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddMultilineTextProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.multilineTextInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.multilineTextInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.MultilineText,
            dynamic: true
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _onAddNumberProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.numberInput.key.prefix.concat("_").concat(nanoid()),
            key: template.basic.numberInput.key.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Number,
            dynamic: true
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    return <Accordion expanded={expanded} bottomSeparator className={className} style={style}>
        <AccordionSummary
            expandButton={_properties.length > 0 && <Stack direction="row" spacing={2} alignItems="center">
                {expanded ? <IconButton onClick={(e) => onExpanedChange(e, false)}><ExpandLessIcon /></IconButton> :
                    <IconButton onClick={(e) => onExpanedChange(e, true)}><ExpandMoreIcon /></IconButton>}
            </Stack>}
            toolbar={<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
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
                        {allowCreateTypes.includes(PropertyType.Text) && <MenuItem onClick={_onAddTextProperty}>Text</MenuItem>}
                        {allowCreateTypes.includes(PropertyType.MultilineText) && <MenuItem onClick={_onAddMultilineTextProperty}>Multiline Text</MenuItem>}
                        {allowCreateTypes.includes(PropertyType.CodeEditor) && <MenuItem onClick={_onAddCodeEditorProperty}>Code editor</MenuItem>}
                        {allowCreateTypes.includes(PropertyType.Video) && <MenuItem onClick={_onAddVideoProperty}>Video</MenuItem>}
                        {allowCreateTypes.includes(PropertyType.Number) && <MenuItem onClick={_onAddNumberProperty}>Number</MenuItem>}
                    </Menu>
                </div>
            </Stack>}
            onClick={(e) => onExpanedChange(e, !expanded)}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography style={{ fontWeight: expanded ? "bold" : "normal" }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {_dynamicProperties.length > 0 ? <PropertyList properties={_dynamicProperties} onSave={_updateProperty} onRemove={_removeProperty} /> : "No properties found."}
        </AccordionDetails>
    </Accordion >
}
