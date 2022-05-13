import { Accordion, AccordionDetails, AccordionSummary } from '@components/Accordion';
import { ClickProperties } from '@components/DiagramElement/ClickElement/ClickElement';
import { WebProperties } from '@components/DiagramElement/WebElement/WebProperties';
import { ELEMENT_TYPES } from '@constants';
import { INode } from '@models/Node';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AppBar, IconButton, Paper, Stack, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
// import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { selectedNode } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import { DynamicCreateProperties } from '../DynamicCreateProperties';
import './DiagramPropertiesPanel.scss';

export const DiagramPropertiesPanel = () => {
    const _selectedNode = useSelector(selectedNode);
    const { modeler } = useContext(AppContext);
    const accordionKeys = {
        basicProperties: "basicProperties",
        additionalProperties: "additionalProperties"
    }

    const [expanded, setExpanded] = React.useState<string | false>(accordionKeys.basicProperties);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const _renderElementProperties = (node: INode) => {
        switch (node.type) {
            case ELEMENT_TYPES.WEB: return <WebProperties data={node} />
            case ELEMENT_TYPES.CLICK: return <ClickProperties data={node} />
        }
    }

    return (
        <Paper variant="outlined" square className="properties-panel-parent" id="js-properties-panel">
            <AppBar style={{ position: "static", boxShadow: "none" }}>
                <Toolbar>
                    {_selectedNode ?
                        <Box>
                            <Typography variant='h6'>{_selectedNode.typelLabel}</Typography>
                            <Typography>{_selectedNode.label}</Typography>
                        </Box> : "Please select an element"}
                </Toolbar>
            </AppBar>
            {_selectedNode && <Box style={{ padding: 0 }}>
                <Accordion expanded={expanded === accordionKeys.basicProperties} onChange={handleChange(accordionKeys.basicProperties)}>
                    <AccordionSummary
                        expandButton={<Stack direction="row" spacing={2} alignItems="center">
                            {expanded ? <IconButton onClick={(e) => handleChange(accordionKeys.basicProperties)(e, false)}><ExpandLess /></IconButton> :
                                <IconButton onClick={(e) => handleChange(accordionKeys.basicProperties)(e, true)}><ExpandMore /></IconButton>}
                        </Stack>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ fontWeight: expanded === accordionKeys.basicProperties ? "bold" : "normal" }}>Basic Properties</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {_renderElementProperties(_selectedNode)}
                    </AccordionDetails>
                </Accordion>
                <DynamicCreateProperties
                    expanded={expanded === accordionKeys.additionalProperties}
                    onExpanedChange={handleChange(accordionKeys.additionalProperties)}
                    node={_selectedNode} />
            </Box >}
        </Paper >
    )
}

// const DemoDynamicConnect = ({
//     node
// }) => {
//     const _nodes = useSelector((state: RootState) => state.propertiesPanel.nodes);
//     const [_destination, _setDestination] = useState<string>("");
//     const { modeler } = useContext(AppContext);
//     const _destinationTypesBlacklist = [
//         ELEMENT_TYPES.SEQUENCE_FLOW,
//         ELEMENT_TYPES.START_EVENT];
//     const _sourceTypesBlacklist = [ELEMENT_TYPES.SEQUENCE_FLOW, ELEMENT_TYPES.END_EVENT];
//     const _filteredNodes = useMemo<INode[]>(() => {
//         return _nodes.filter(e => e.id !== node.id && !_destinationTypesBlacklist.includes(e.type));
//     }, [node, _nodes, _destinationTypesBlacklist])

//     const _connect = () => {
//         const elementRegistry = modeler.get('elementRegistry'),
//             modeling = modeler.get('modeling');

//         const source = elementRegistry.get(node.id),
//             destination = elementRegistry.get(_destination);

//         modeling.connect(source, destination);
//         _reset();
//     }

//     const _reset = () => {
//         _setDestination("");
//     }


//     const _canConnect = (): boolean => {
//         return _destination !== "";
//     }

//     return _filteredNodes.length > 0 && !_sourceTypesBlacklist.includes(node.type) && (
//         <Form>
//             <InputGroup className="mb-3">
//                 <InputGroup.Text>Connect to</InputGroup.Text>
//                 <Form.Select id="disabledSelect"
//                     onChange={e => _setDestination(e.target.value)}
//                     value={_destination}>
//                     <option>Select</option>
//                     {_filteredNodes.map(node => <option key={node.id} value={node.id}>{node.label}-{node.typelLabel}</option>)}
//                 </Form.Select>
//                 <Button onClick={_connect} disabled={!_canConnect()}>Connect</Button>
//             </InputGroup>
//             <Form.Group className="mb-3">
//                 <Form.Check
//                     type="checkbox"
//                     id="disabledFieldsetCheck"
//                     label="Check this"
//                 />
//             </Form.Group>
//         </Form>
//     )
// }
