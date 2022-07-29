import { TaskRunner } from '@helpers/TaskRunner';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { nodesSelector } from '../../features/PropertiesPanel/PropertiesPanelSlice';

export const TaskRunnerArea = () => {
    const { modeler } = useContext(AppContext);
    const _nodes = useSelector(nodesSelector);

    const _run = async () => {
        await _loadFlow();
    }

    const _loadFlow = async () => {
        let runner = new TaskRunner(_nodes);
        await runner.run();
    }

    return <div className='task-runner'>
        <Button onClick={_run}>Run</Button>
    </div>
}