import { selectedNode } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import React, { useContext, useMemo, useState } from 'react';
import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { ELEMENT_TYPES } from '../../constants';
import { INode } from '../../models/Node';
import { RootState } from '../../store';
import { DynamicCreateProperties } from '../Block/DynamicCreateProperties';
import './DiagramPropertiesPanel.scss';

export const DiagramPropertiesPanel = () => {
    const _selectedNode = useSelector(selectedNode);
    const { modeler } = useContext(AppContext);

    return (
        <Card className="properties-panel-parent" id="js-properties-panel">
            <Card.Header>{_selectedNode ?
                <React.Fragment>
                    <Card.Title>{_selectedNode.typelLabel}</Card.Title>
                    <Card.Text>{_selectedNode.label}</Card.Text>
                </React.Fragment> : "Please select an element"}</Card.Header>
            {_selectedNode && <Card.Body style={{ padding: 0 }}>
                <Accordion flush defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Basic</Accordion.Header>
                        <Accordion.Body>
                            Body
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="1">
                        <Accordion.Header>Connection</Accordion.Header>
                        <Accordion.Body>
                            <DemoDynamicConnect node={_selectedNode} />
                        </Accordion.Body>
                    </Accordion.Item> */}
                    <DynamicCreateProperties node={_selectedNode} />
                </Accordion>
            </Card.Body >}
        </Card >
    )
}

const DemoDynamicConnect = ({
    node
}) => {
    const _nodes = useSelector((state: RootState) => state.propertiesPanel.nodes);
    const [_destination, _setDestination] = useState<string>("");
    const { modeler } = useContext(AppContext);
    const _destinationTypesBlacklist = [
        ELEMENT_TYPES.SEQUENCE_FLOW,
        ELEMENT_TYPES.START_EVENT];
    const _sourceTypesBlacklist = [ELEMENT_TYPES.SEQUENCE_FLOW, ELEMENT_TYPES.END_EVENT];
    const _filteredNodes = useMemo<INode[]>(() => {
        return _nodes.filter(e => e.id !== node.id && !_destinationTypesBlacklist.includes(e.type));
    }, [node, _nodes, _destinationTypesBlacklist])

    const _connect = () => {
        const elementRegistry = modeler.get('elementRegistry'),
            modeling = modeler.get('modeling');

        const source = elementRegistry.get(node.id),
            destination = elementRegistry.get(_destination);

        modeling.connect(source, destination);
        _reset();
    }

    const _reset = () => {
        _setDestination("");
    }


    const _canConnect = (): boolean => {
        return _destination !== "";
    }

    return _filteredNodes.length > 0 && !_sourceTypesBlacklist.includes(node.type) && (
        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Text>Connect to</InputGroup.Text>
                <Form.Select id="disabledSelect"
                    onChange={e => _setDestination(e.target.value)}
                    value={_destination}>
                    <option>Select</option>
                    {_filteredNodes.map(node => <option key={node.id} value={node.id}>{node.label}-{node.typelLabel}</option>)}
                </Form.Select>
                <Button onClick={_connect} disabled={!_canConnect()}>Connect</Button>
            </InputGroup>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="disabledFieldsetCheck"
                    label="Check this"
                />
            </Form.Group>
        </Form>
    )
}
