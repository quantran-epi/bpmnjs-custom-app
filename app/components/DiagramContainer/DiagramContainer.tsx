import { initProperties } from '@helpers/initProperty';
import { IFlowNode } from '@models/FlowNode';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppContext } from '../../AppContext';
import { ELEMENT_TYPES } from '../../constants';
import { PanelHeaderProvider } from '../../features/PropertiesPanel/PropertiesPanelHeaderProvider';
import { addNode, deselectNode, removeNodes, selectNode, updateLabel } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import { DiagramPropertiesPanel } from '../DiagramPropertiesPanel';
import './DiagramContainer.scss';

export const DiagramContainer = () => {
    const dispatch = useDispatch();
    const { modeler } = useContext(AppContext);
    const nodeTypeBlaclist = ["label"];

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
                typelLabel: PanelHeaderProvider.getTypeLabel(e.element, modeler),
                type: e.element.type,
                properties: initProperties(e.element.id, e.element.type)
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
                let selectionNodeId = e.newSelection[0].type === ELEMENT_TYPES.LABEL ?
                    e.newSelection[0].labelTarget.id
                    : e.newSelection[0].id;
                dispatch(selectNode(selectionNodeId));
            }
        })

        eventBus.on('connection.added', function (e) {
            console.log('connection created', e);
            dispatch(addNode({
                id: e.element.id,
                typelLabel: PanelHeaderProvider.getTypeLabel(e.element, modeler),
                type: e.element.type,
                properties: [],
                sourceRef: e.element.source.id,
                targetRef: e.element.target.id
            } as IFlowNode));
        })

        eventBus.on('connection.removed', function (e) {
            console.log('connection removed', e);
            dispatch(removeNodes(e.element.id));
        })
    }

    return (
        <div className='diagram-container'>
            <div className="canvas" id="js-canvas"></div>
            <div className="property-panel-container" id="js-property-panel-container">
                {/* <div className="properties-panel-parent" id="js-properties-panel"></div> */}
                <DiagramPropertiesPanel />
            </div>
        </div>
    )
}