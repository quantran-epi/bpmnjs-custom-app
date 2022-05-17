import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import { is } from 'bpmn-js/lib/util/ModelUtil';


/**
 * A custom rule provider that decides what elements can be
 * dropped where based on a `vendor:allowDrop` BPMN extension.
 *
 * See {@link BpmnRules} for the default implementation
 * of BPMN 2.0 modeling rules provided by bpmn-js.
 *
 * @param {EventBus} eventBus
 */
export default function CustomRules(eventBus) {
    RuleProvider.call(this, eventBus);
}

inherits(CustomRules, RuleProvider);

CustomRules.$inject = ['eventBus'];


CustomRules.prototype.init = function () {
    this.addRule('connection.create', function (context) {
        debugger
        var source = context.source,
            target = context.target;
        if (is(target, 'custom:Web')) return false;
    });

    this.addRule('connection.reconnect', function (context) {
        var connection = context.connection,
            source = context.source,
            target = context.target;

        if (is(target, 'custom:Web')) return false;
    });
};