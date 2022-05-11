import template from '@config/property-template.json';
import { PropertyType } from '@constants';
import { useMenu } from '@hooks/useMenu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty, removeProperties, updateProperty } from '../../../features/PropertiesPanel/PropertiesPanelSlice';
import { INode } from '../../../models/Node';
import { IProperty } from '../../../models/Property';
import { TextProperty } from './PropertyTemplate/TextProperty';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface IDynamicCreatePropertiesProps {
    node: INode;
    expanded: boolean;
    onExpanedChange: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void;
}

export const DynamicCreateProperties: FunctionComponent<IDynamicCreatePropertiesProps> = ({
    node,
    expanded,
    onExpanedChange
}) => {
    const dispatch = useDispatch();
    const [_properties, _setProperties] = useState<IProperty[]>(node.properties);
    const { anchor, removeAnchor, setAnchor } = useMenu();

    useEffect(() => {
        _setProperties(node.properties);
    }, [node])

    const _onAddTextProperty = () => {
        let newProperty: IProperty = {
            id: template.basic.textInput.name.prefix.concat("_").concat(nanoid()),
            key: template.basic.textInput.name.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Text
        }
        // _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
        removeAnchor();
        if (!expanded) onExpanedChange(null, true);
    }

    const _saveProperty = (data: IProperty) => {
        dispatch(addProperty({ nodeId: node.id, property: data }));
    }

    const _updateProperty = (data: IProperty) => {
        dispatch(updateProperty({ nodeId: node.id, propertyId: data.id, property: data }));
    }

    const _removeProperty = (id: string) => {
        dispatch(removeProperties({ nodeId: node.id, propertyIds: [id] }))
    }

    const _renderProperty = (prop: IProperty): React.ReactNode => {
        switch (prop.valueType) {
            case PropertyType.Text: return <TextProperty key={prop.id} data={prop} onSave={_updateProperty} onRemove={_removeProperty} />
            default: return;
        }
    }

    return <React.Fragment>
        <Accordion expanded={expanded} bottomSeparator>
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
                            <MenuItem onClick={_onAddTextProperty}>Text</MenuItem>
                            <MenuItem onClick={removeAnchor}>Number</MenuItem>
                        </Menu>
                    </div>
                </Stack>}
                onClick={(e) => onExpanedChange(e, !expanded)}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography style={{ fontWeight: expanded ? "bold" : "normal" }}>Additional Properties</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {_properties.length > 0 ? _properties.map(_renderProperty) : "No properties found."}
            </AccordionDetails>
        </Accordion >


    </React.Fragment >
}
