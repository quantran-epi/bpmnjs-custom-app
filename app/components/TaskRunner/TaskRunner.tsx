import { NodeTransformer } from '@helpers/NodeTransformer';
import { ICursor, INode } from '@models/Node';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { nodesSelector } from '../../features/PropertiesPanel/PropertiesPanelSlice';
import { AppContext } from '../../AppContext';
import { ElementType } from '@constants';
import { IFlowNode } from '@models/FlowNode';

export const TaskRunner = () => {
    const { modeler } = useContext(AppContext);
    const _nodes = useSelector(nodesSelector);

    const _run = (): void => {
        _loadFlow();
    }

    const _loadFlow = () => {
        let executableNodes = _nodes.filter(e => e.type !== ElementType.SEQUENCE_FLOW);
    }

    return <div className='task-runner'>
        <Button onClick={_run}>Run</Button>
    </div>
}