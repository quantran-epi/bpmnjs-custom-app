import { AppContext } from '../../AppContext';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { nodesSelector } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import { ElementModal } from './ElementModal';

export const ElementModalCollection = () => {
    const _nodes = useSelector(nodesSelector);

    const _renderModals = () => {
        return _nodes.map(node => <ElementModal id={node.id}>
            modal content
        </ElementModal>)
    }

    return <React.Fragment>
        {_renderModals()}
    </React.Fragment>
}