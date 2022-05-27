import { Graph } from './models/Graph';
const puppeteer = require('puppeteer');

(async () => {
    const graph = new Graph(any);
    graph.load([
        {
            "id": "Event_18uexvi",
            "label": "Event_18uexvi",
            "typeLabel": "Start Event",
            "type": "bpmn:StartEvent",
            "properties": []
        },
        {
            "id": "Event_07141er",
            "label": "Event_07141er",
            "typeLabel": "End Event",
            "type": "bpmn:EndEvent",
            "properties": []
        },
        {
            "id": "Web_112uo0z",
            "label": "Web_112uo0z",
            "typeLabel": "Web",
            "type": "custom:Web",
            "properties": [
                {
                    "id": "Web_112uo0z_href",
                    "key": "href",
                    "valueType": "Text",
                    "value": "",
                    "dynamic": false,
                    "group": "basic"
                }
            ]
        },
        {
            "id": "Flow_0fsry9d",
            "typeLabel": "Sequence Flow",
            "type": "bpmn:SequenceFlow",
            "properties": [],
            "sourceRef": "Event_18uexvi",
            "targetRef": "Web_112uo0z"
        },
        {
            "id": "Flow_15fr8ia",
            "typeLabel": "Sequence Flow",
            "type": "bpmn:SequenceFlow",
            "properties": [],
            "sourceRef": "Web_112uo0z",
            "targetRef": "Event_07141er"
        }
    ]);
    console.log(graph);
})();