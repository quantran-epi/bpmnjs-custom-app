import { initProperties } from '@helpers/initProperty';
import { IFlowNode } from '@models/FlowNode';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { ElementType } from '../../constants';
import { PanelHeaderProvider } from '../../features/PropertiesPanel/PropertiesPanelHeaderProvider';
import { addNextCursor, addNode, addPreviousCursor, deselectNode, nodesSelector, removeNextCursor, removeNodes, removePreviousCursor, selectNode, updateLabel } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import { DiagramPropertiesPanel } from '../DiagramPropertiesPanel';
import './DiagramContainer.scss';

export const DiagramContainer = () => {
    const dispatch = useDispatch();
    const { modeler } = useContext(AppContext);
    const nodeTypeBlaclist = ["label"];
    const _nodes = useSelector(nodesSelector);

    useEffect(() => {
        if (!modeler) return;
        _registerElementEvent();
    }, [modeler])

    const _handleLabelUpdated = (element) => {
        // dispatch(updateLabel({ nodeId: element.labelTarget.id, label: element.businessObject.name }));
        // dispatch(selectNode(element.labelTarget.id));
    }

    const _handleOtherElementLabelUpdated = (element) => {
        dispatch(updateLabel({ nodeId: element.id, label: element.businessObject.name }));
        dispatch(selectNode(element.id));
    }

    const _autoCreateName = (element) => {
        modeler.get('modeling').updateProperties(element, { name: element.id });
    }

    const _registerElementEvent = () => {
        let eventBus = modeler.get('eventBus');

        eventBus.on('element.changed', function (e) {
            console.log('element changed', e.element);
            if (e.element.type === "label")
                _handleLabelUpdated(e.element);
            else
                _handleOtherElementLabelUpdated(e.element);
        })

        eventBus.on('commandStack.shape.create.postExecuted', function (e) {
            console.log('after created', e);
            _autoCreateName(e.context.shape);
        })

        eventBus.on('shape.added', function (e) {
            console.log('shape added', e);
            if (nodeTypeBlaclist.includes(e.element.type)) return;
            dispatch(addNode({
                id: e.element.id,
                label: e.element.id,
                typeLabel: PanelHeaderProvider.getTypeLabel(e.element, modeler),
                type: e.element.type,
                properties: initProperties(e.element.id, e.element.type),
                parentId: e.element.parent?.id,
                next: [],
                previous: []
            }));
        })

        eventBus.on('shape.remove', function (e) {
            console.log('element deleted', e);
            dispatch(removeNodes([e.element.id]));
        })

        eventBus.on('selection.changed', function (e) {
            console.log('selection.changed', e);
            if (e.newSelection.length === 0) dispatch(deselectNode());
            else {
                let selectionNodeId = e.newSelection[0].type === ElementType.LABEL ?
                    e.newSelection[0].labelTarget.id
                    : e.newSelection[0].id;
                dispatch(selectNode(selectionNodeId));
            }
        })

        eventBus.on('connection.added', function (e) {
            console.log('connection created', e);
            let flowNode = {
                id: e.element.id,
                typeLabel: PanelHeaderProvider.getTypeLabel(e.element, modeler),
                type: e.element.type,
                properties: initProperties(e.element.id, e.element.type),
                sourceRef: e.element.source.id,
                targetRef: e.element.target.id,
                parentId: e.element.parent?.id
            } as IFlowNode
            dispatch(addNode(flowNode));
            dispatch(addNextCursor({
                nodeId: flowNode.sourceRef, cursor: {
                    flowId: flowNode.id,
                    nodeId: flowNode.targetRef
                }
            }))
            dispatch(addPreviousCursor({
                nodeId: flowNode.targetRef, cursor: {
                    flowId: flowNode.id,
                    nodeId: flowNode.sourceRef
                }
            }))
        })

        eventBus.on('connection.removed', function (e) {
            debugger
            console.log('connection removed', e);
            dispatch(removeNodes(e.element.id));
            dispatch(removePreviousCursor({
                nodeId: e.element.target.id,
                flowId: e.element.id
            }))
            dispatch(removeNextCursor({
                nodeId: e.element.source.id,
                flowId: e.element.id
            }))
        })
    }

    return (
        <div className='diagram-container'>
            <div className="canvas" id="js-canvas"></div>
            <div className="property-panel-container" id="js-property-panel-container">
                {/* <div className="properties-panel-parent" id="js-properties-panel"></div> */}
                <DiagramPropertiesPanel />
            </div>
            {/* <ElementModalCollection /> */}
        </div>
    )
}