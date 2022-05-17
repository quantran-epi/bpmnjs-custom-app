import {
    assign
} from 'min-dash';
import { getDi } from 'bpmn-js/lib/util/ModelUtil';
import { webElementSvgUrl } from '@components/DiagramElement/WebElement/icon';
import { clickElementSvgUrl } from '@components/DiagramElement/ClickElement/icon';
import { inputElementSvgUrl } from '@components/DiagramElement/InputElement/icon';
import { sleepElementSvgUrl } from '@components/DiagramElement/SleepElement/icon';
import { extractTextValueElementSvgUrl } from '@components/DiagramElement/ExtractTextValueElement/icon';
import { expandedSubProcessElementSvgUrl } from '@components/DiagramElement/ExpandedSubProcessElement/icon';

/**
 * A palette provider for BPMN 2.0 elements.
 */
export default function CustomPaletteProvider(
    palette, create, elementFactory,
    spaceTool, lassoTool, handTool,
    globalConnect, translate) {

    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
    this._handTool = handTool;
    this._globalConnect = globalConnect;
    this._translate = translate;

    palette.registerProvider(this);
}

CustomPaletteProvider.$inject = [
    'palette',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect',
    'translate'
];


CustomPaletteProvider.prototype.getPaletteEntries = function (element) {

    var actions = {},
        create = this._create,
        elementFactory = this._elementFactory,
        spaceTool = this._spaceTool,
        lassoTool = this._lassoTool,
        handTool = this._handTool,
        globalConnect = this._globalConnect,
        translate = this._translate;

    function createAction(type, group, className, title, options) {

        function createListener(event) {
            var shape = elementFactory.createShape(assign({ type: type }, options));

            if (options) {
                var di = getDi(shape);
                di.isExpanded = options.isExpanded;
            }

            create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn:/, '');

        return {
            group: group,
            className: className,
            title: title || translate('Create {type}', { type: shortType }),
            action: {
                dragstart: createListener,
                click: createListener
            }
        };
    }

    function createSubprocess(event) {
        var subProcess = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            x: 0,
            y: 0,
            isExpanded: true
        });

        var startEvent = elementFactory.createShape({
            type: 'bpmn:StartEvent',
            x: 40,
            y: 82,
            parent: subProcess
        });

        create.start(event, [subProcess, startEvent], {
            hints: {
                autoSelect: [subProcess]
            }
        });
    }

    function createParticipant(event) {
        create.start(event, elementFactory.createParticipantShape());
    }

    function createWeb(event) {
        var webShape = elementFactory.create(
            'shape', { type: 'custom:Web' }
        );

        create.start(event, webShape);
    }

    function createClick(event) {
        var clickShape = elementFactory.create(
            'shape', { type: 'custom:Click' }
        );

        create.start(event, clickShape);
    }

    function createInput(event) {
        var inputShape = elementFactory.create(
            'shape', { type: 'custom:Input' }
        );

        create.start(event, inputShape);
    }

    function createSleep(event) {
        var sleepShape = elementFactory.create(
            'shape', { type: 'custom:Sleep' }
        );

        create.start(event, sleepShape);
    }

    function createExtractTextValue(event) {
        var extractTextValueShape = elementFactory.create(
            'shape', { type: 'custom:ExtractTextValue' }
        );

        create.start(event, extractTextValueShape);
    }

    function createRepeatProcess(event) {
        var repeatProcessShape = elementFactory.create(
            'shape', { type: 'custom:RepeatProcess' }
        );

        create.start(event, repeatProcessShape);
    }

    assign(actions, {
        'hand-tool': {
            group: 'tools',
            className: 'bpmn-icon-hand-tool',
            title: translate('Activate the hand tool'),
            action: {
                click: function (event) {
                    handTool.activateHand(event);
                }
            }
        },
        // 'lasso-tool': {
        //     group: 'tools',
        //     className: 'bpmn-icon-lasso-tool',
        //     title: translate('Activate the lasso tool'),
        //     action: {
        //         click: function (event) {
        //             lassoTool.activateSelection(event);
        //         }
        //     }
        // },
        // 'space-tool': {
        //     group: 'tools',
        //     className: 'bpmn-icon-space-tool',
        //     title: translate('Activate the create/remove space tool'),
        //     action: {
        //         click: function (event) {
        //             spaceTool.activateSelection(event);
        //         }
        //     }
        // },
        'global-connect-tool': {
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('Activate the global connect tool'),
            action: {
                click: function (event) {
                    globalConnect.start(event);
                }
            }
        },
        'tool-separator': {
            group: 'tools',
            separator: true
        },
        'create.start-event': createAction(
            'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
            translate('Create StartEvent')
        ),
        // 'create.intermediate-event': createAction(
        //     'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none',
        //     translate('Create Intermediate/Boundary Event')
        // ),
        'create.end-event': createAction(
            'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none',
            translate('Create EndEvent')
        ),
        // 'create.exclusive-gateway': createAction(
        //     'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-none',
        //     translate('Create Gateway')
        // ),
        // 'create.task': createAction(
        //     'bpmn:Task', 'activity', 'bpmn-icon-task',
        //     translate('Create Task')
        // ),
        // 'create.data-object': createAction(
        //     'bpmn:DataObjectReference', 'data-object', 'bpmn-icon-data-object',
        //     translate('Create DataObjectReference')
        // ),
        // 'create.data-store': createAction(
        //     'bpmn:DataStoreReference', 'data-store', 'bpmn-icon-data-store',
        //     translate('Create DataStoreReference')
        // ),
        'create.subprocess-expanded': {
            group: 'activity',
            imageUrl: expandedSubProcessElementSvgUrl,
            title: translate('Create expanded SubProcess'),
            action: {
                dragstart: createSubprocess,
                click: createSubprocess
            }
        },
        // 'create.participant-expanded': {
        //     group: 'collaboration',
        //     className: 'bpmn-icon-participant',
        //     title: translate('Create Pool/Participant'),
        //     action: {
        //         dragstart: createParticipant,
        //         click: createParticipant
        //     }
        // },
        // 'create.group': createAction(
        //     'bpmn:Group', 'artifact', 'bpmn-icon-group',
        //     translate('Create Group')
        // ),
        'create.web': {
            group: 'activity',
            imageUrl: webElementSvgUrl,
            title: translate('Create web'),
            action: {
                dragstart: createWeb,
                click: createWeb
            }
        },
        'create.click': {
            group: 'activity',
            imageUrl: clickElementSvgUrl,
            title: translate('Create click'),
            action: {
                dragstart: createClick,
                click: createClick
            }
        },
        'create.input': {
            group: 'activity',
            imageUrl: inputElementSvgUrl,
            title: translate('Create input'),
            action: {
                dragstart: createInput,
                click: createInput
            }
        },
        'create.sleep': {
            group: 'activity',
            imageUrl: sleepElementSvgUrl,
            title: translate('Create sleep'),
            action: {
                dragstart: createSleep,
                click: createSleep
            }
        },
        'create.extractTextValue': {
            group: 'activity',
            imageUrl: extractTextValueElementSvgUrl,
            title: translate('Create ExtractTextValue'),
            action: {
                dragstart: createExtractTextValue,
                click: createExtractTextValue
            }
        }
    });

    return actions;
};

