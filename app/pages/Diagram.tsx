import { nodesSelector } from '../features/PropertiesPanel/PropertiesPanelSlice';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../AppContext';
import { DiagramContainer } from '../components/DiagramContainer';
import init from '../init';
import { INode } from '@models/Node';
import { ElementType } from '@constants';

export const DiagramPage = () => {
    const { setModeler } = useContext(AppContext);
    const _nodes = useSelector(nodesSelector);

    useEffect(() => {
        let _modeler = init();
        setModeler(_modeler);
    }, [])

    const downloadFile = (content, fileName, contentType) => {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    const _isValid = (nodes: INode[]): boolean => {
        return nodes.filter(node => node.type === ElementType.START_EVENT)?.length === 1
            && nodes.filter(node => node.type === ElementType.END_EVENT)?.length === 1;
    }

    const _convertNodes = (nodes: INode[]) => {
        let _valid = true;
        function getChildren(nodeId: string) {
            let children = nodes.filter(e => e.parentId === nodeId);
            if (children.length === 0) return [];

            // validate
            _valid = _isValid(children);

            return children.map(child => ({
                ...child,
                children: getChildren(child.id)
            }))
        }

        let process = {
            id: "Process_1",
            children: getChildren("Process_1")
        };

        if (!_valid) return;
        return process;
    }

    const _onDownloadDiagramProperties = () => {
        console.log("node json", JSON.stringify(_convertNodes(_nodes)));
        let exportedData = _convertNodes(_nodes);
        if (!exportedData)
            alert('Each process must have 1 StartEvent and 1 EndEvent');
        else
            downloadFile(JSON.stringify(exportedData), "diagram-properties.json", 'text/plain');
    }

    return (
        <React.Fragment>
            <div className="content" id="js-drop-zone">
                <div className="message intro">
                    <div className="note">
                        Drop BPMN diagram from your desktop or <a id="js-create-diagram" href="#">create a new diagram</a> to get started.
                    </div>
                </div>

                <div className="message error">
                    <div className="note">
                        <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

                        <div className="details">
                            <span>cause of the problem</span>
                            <pre></pre>
                        </div>
                    </div>
                </div>

                <DiagramContainer />
            </div>

            <ul className="buttons">
                <li>
                    download
                </li>
                <li>
                    <a id="js-download-diagram" href="#" title="download BPMN diagram">
                        BPMN diagram
                    </a>
                </li>
                <li>
                    <a href="#" id='js-download-properties' title="download Diagram properties" onClick={_onDownloadDiagramProperties}>
                        Diagram properties
                    </a>
                </li>
                <li>
                    <a id="js-download-svg" href="#" title="download as SVG image">
                        SVG image
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}