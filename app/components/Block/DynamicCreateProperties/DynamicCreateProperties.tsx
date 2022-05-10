import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Accordion, ButtonGroup, Col, Dropdown, DropdownButton, Form, ListGroup, Row } from 'react-bootstrap';
import { INode } from '../../../models/Node';
import { IProperty } from '../../../models/Property';
import template from '@config/property-template.json';
import { TextProperty } from './PropertyTemplate/TextProperty';
import { nanoid } from 'nanoid';
import { PropertyType } from '@constants';
import { useDispatch } from 'react-redux';
import { addProperty, removeProperties, updateProperty } from '../../../features/PropertiesPanel/PropertiesPanelSlice';


interface IDynamicCreatePropertiesProps {
    node: INode;
}

export const DynamicCreateProperties: FunctionComponent<IDynamicCreatePropertiesProps> = ({
    node,
}) => {
    const dispatch = useDispatch();
    const [_properties, _setProperties] = useState<IProperty[]>(node.properties);

    useEffect(() => {
        _setProperties(node.properties);
    }, [node])

    const _onAddTextProperty = () => {
        let newProperty: IProperty = {
            key: template.basic.textInput.name.prefix.concat("_").concat(nanoid(10)),
            value: "",
            valueType: PropertyType.Text
        }
        _setProperties([..._properties, newProperty]);
        _saveProperty(newProperty);
    }

    const _saveProperty = (data: IProperty) => {
        dispatch(addProperty({ nodeId: node.id, property: data }));
    }

    const _updateProperty = (data: IProperty) => {
        dispatch(updateProperty({ nodeId: node.id, propertyId: data.key, property: data }));
    }

    const _removeProperty = (key: string) => {
        dispatch(removeProperties({ nodeId: node.id, propertyIds: [key] }))
    }

    const _renderProperty = (prop: IProperty): React.ReactNode => {
        switch (prop.valueType) {
            case PropertyType.Text: return <TextProperty data={prop} onSave={_updateProperty} onRemove={_removeProperty} />
            default: return;
        }
    }

    return <Accordion.Item eventKey="2">
        <Accordion.Header>Additional Properties</Accordion.Header>
        <Accordion.Body>
            <Row>
                <Col md={{ span: 6, offset: 6 }}>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <DropdownButton as={ButtonGroup} title="Add Property" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" onClick={_onAddTextProperty}>Text</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Number</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Col>
            </Row>
            {_properties.map(_renderProperty)}
        </Accordion.Body>
    </Accordion.Item>
}