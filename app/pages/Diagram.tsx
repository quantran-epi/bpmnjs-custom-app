import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { DiagramContainer } from '../components/DiagramContainer';
import init from '../init';

export const DiagramPage = () => {
    const { setModeler } = useContext(AppContext);

    useEffect(() => {
        let _modeler = init();
        setModeler(_modeler);
    }, [])

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
                    <a id="js-download-svg" href="#" title="download as SVG image">
                        SVG image
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}