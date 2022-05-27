import { ClickProperties } from '@components/DiagramElement/ClickElement/ClickElement';
import { ExpandedSubProcessProperties } from '@components/DiagramElement/ExpandedSubProcessElement/ExpandedSubProcessElement';
import { ExtractTextValueProperties } from '@components/DiagramElement/ExtractTextValueElement/ExtractTextValueElement';
import { InputProperties } from '@components/DiagramElement/InputElement/InputElement';
import { SequenceFlowProperties } from '@components/DiagramElement/SequenceFlowElement/SequenceFlowElement';
import { SleepProperties } from '@components/DiagramElement/SleepElement/SleepElement';
import { WebProperties } from '@components/DiagramElement/WebElement/WebProperties';
import { ElementType } from '@constants';
import { INode } from '@models/Node';
import { AppBar, Button, Paper, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { nodesSelector, selectedNode } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import './DiagramPropertiesPanel.scss';

export const DiagramPropertiesPanel = () => {
    const _selectedNode = useSelector(selectedNode);
    const _nodes = useSelector(nodesSelector);
    const { modeler } = useContext(AppContext);

    const _renderElementProperties = (node: INode) => {
        switch (node.type) {
            case ElementType.WEB: return <WebProperties data={node} />
            case ElementType.CLICK: return <ClickProperties data={node} />
            case ElementType.INPUT: return <InputProperties data={node} />
            case ElementType.SLEEP: return <SleepProperties data={node} />
            case ElementType.EXTRACT_TEXT_VALUE: return <ExtractTextValueProperties data={node} />
            case ElementType.SEQUENCE_FLOW: return <SequenceFlowProperties data={node} />
            case ElementType.SUB_PROCESS: return <ExpandedSubProcessProperties data={node} />
        }
    }

    return (
        <Paper variant="outlined" square className="properties-panel-parent" id="js-properties-panel">
            <AppBar style={{ position: "static", boxShadow: "none" }}>
                <Toolbar>
                    {_selectedNode ?
                        <Box>
                            <Typography variant='h6'>{_selectedNode.typeLabel}</Typography>
                            <Typography>{_selectedNode.label}</Typography>
                        </Box> : "Please select an element"}
                </Toolbar>
            </AppBar>
            {_selectedNode && <Box style={{ padding: 0 }}>
                {_renderElementProperties(_selectedNode)}
                {/* <Button onClick={() => console.log(_nodes)}>Parse</Button> */}
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
//         ElementType.SEQUENCE_FLOW,
//         ElementType.START_EVENT];
//     const _sourceTypesBlacklist = [ElementType.SEQUENCE_FLOW, ElementType.END_EVENT];
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
