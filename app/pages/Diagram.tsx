import { NodeTransformer } from '@helpers/NodeTransformer';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../AppContext';
import { DiagramContainer } from '../components/DiagramContainer';
import { nodesSelector } from '../features/PropertiesPanel/PropertiesPanelSlice';
import init from '../init';

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

    const _onDownloadDiagramProperties = () => {
        console.log("node json", JSON.stringify(NodeTransformer.ToTree(_nodes)));
        let exportedData = NodeTransformer.ToTree(_nodes);
        if (!exportedData)
            alert('Each process must have 1 StartEvent and 1 EndEvent');
        else
            downloadFile(JSON.stringify(exportedData), "diagram-properties.json", 'text/plain');
    }

    const _onDownloadDiagramPropertiesFlat = () => {
        downloadFile(JSON.stringify(_nodes), "diagram-properties-flat.json", 'text/plain');
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
                    <a href="#" id='js-download-properties-flat' title="download Diagram properties" onClick={_onDownloadDiagramPropertiesFlat}>
                        Diagram properties flat
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