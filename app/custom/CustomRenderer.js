import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate,
    remove as svgRemove,
    classes as svgClasses,
    innerSVG
} from 'tiny-svg';

import {
    assign,
} from 'min-dash';

import {
    getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
    getSemantic,
    getLabelColor
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { webElementSvg } from '@components/DiagramElement/WebElement/icon';
import { clickElementSvg } from '@components/DiagramElement/ClickElement/icon';
import { inputElementSvg } from '@components/DiagramElement/InputElement/icon';
import { sleepElementSvg } from '@components/DiagramElement/SleepElement/icon';

const HIGH_PRIORITY = 1500,
    TASK_BORDER_RADIUS = 2;

function getSvgFromString(xml_string) {
    return new DOMParser().parseFromString(xml_string, 'application/xml').documentElement;
}


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer, textRenderer) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
        this.textRenderer = textRenderer;
    }

    canRender(element) {

        // only render tasks and events (ignore labels)
        return isAny(element, ['custom:Web', 'custom:Click', 'custom:Input', 'custom:Sleep']) && !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const rect = drawRect(parentNode, element.width, element.height, TASK_BORDER_RADIUS, '#000');

        if (is(element, 'custom:Web')) {
            const iconWrapper = svgCreate("g");
            const icon = getSvgFromString(webElementSvg);
            svgAppend(iconWrapper, icon);
            svgAppend(parentNode, iconWrapper);

            svgAttr(iconWrapper, {
                transform: `translate(0, ${element.height - 37})`
            });

            let semantic = getSemantic(element);

            this.renderLabel(parentNode, semantic.name, {
                box: element,
                align: 'center-top',
                padding: 5,
            })

            return rect;
        }

        if (is(element, 'custom:Click')) {
            const iconWrapper = svgCreate("g");
            const icon = getSvgFromString(clickElementSvg);
            svgAppend(iconWrapper, icon);
            svgAppend(parentNode, iconWrapper);

            svgAttr(iconWrapper, {
                transform: `translate(0, ${element.height - 40})`
            });

            let semantic = getSemantic(element);

            this.renderLabel(parentNode, semantic.name, {
                box: element,
                align: 'center-top',
                padding: 5,
            })

            return rect;
        }

        if (is(element, 'custom:Input')) {
            const iconWrapper = svgCreate("g");
            const icon = getSvgFromString(inputElementSvg);
            svgAppend(iconWrapper, icon);
            svgAppend(parentNode, iconWrapper);

            svgAttr(iconWrapper, {
                transform: `translate(0, ${element.height - 40})`
            });

            let semantic = getSemantic(element);

            this.renderLabel(parentNode, semantic.name, {
                box: element,
                align: 'center-top',
                padding: 5,
            })

            return rect;
        }

        if (is(element, 'custom:Sleep')) {
            const iconWrapper = svgCreate("g");
            const icon = getSvgFromString(sleepElementSvg);
            svgAppend(iconWrapper, icon);
            svgAppend(parentNode, iconWrapper);

            svgAttr(iconWrapper, {
                transform: `translate(0, ${element.height - 40})`
            });

            let semantic = getSemantic(element);

            this.renderLabel(parentNode, semantic.name, {
                box: element,
                align: 'center-top',
                padding: 5,
            })

            return rect;
        }
    }

    renderLabel(parentGfx, label, options) {

        options = assign({
            size: {
                width: 100
            }
        }, options);

        var text = this.textRenderer.createText(label || '', options);

        svgClasses(text).add('djs-label');

        svgAppend(parentGfx, text);

        return text;
    }

    // getShapePath(shape) {
    //     if (is(shape, 'bpmn:Task')) {
    //         return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    //     }

    //     return this.bpmnRenderer.getShapePath(shape);
    // }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer', 'textRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
    const rect = svgCreate('rect');

    svgAttr(rect, {
        width: width,
        height: height,
        rx: borderRadius,
        ry: borderRadius,
        stroke: strokeColor || '#000',
        strokeWidth: 2,
        fill: '#fff',
    });

    svgAppend(parentNode, rect);

    return rect;
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
    parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}