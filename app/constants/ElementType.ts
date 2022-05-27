export enum ElementType {
    LABEL = 'label',
    SEQUENCE_FLOW = 'bpmn:SequenceFlow',
    START_EVENT = 'bpmn:StartEvent',
    END_EVENT = 'bpmn:EndEvent',
    SUB_PROCESS = 'bpmn:SubProcess',

    WEB = "custom:Web",
    CLICK = "custom:Click",
    INPUT = "custom:Input",
    EXTRACT_TEXT_VALUE = "custom:ExtractTextValue",
    SLEEP = "custom:Sleep"
}