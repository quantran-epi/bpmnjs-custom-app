import { ElementType } from "@constants";
import { ClickHandler } from "@features/FlowExecution/Handlers/ClickHandler";
import { WebHandler } from "@features/FlowExecution/Handlers/WebHandler";
import { IFlowNode } from "@models/FlowNode";
import { INode } from "@models/Node";

interface INextNode {
    flow: IFlowNode;
    node: INode;
}

export class TaskRunner {
    _nodes: INode[];

    constructor(nodes: INode[]) {
        this._nodes = nodes;
    }

    private _getStartEvent(): INode {
        return this._nodes.find(this._isStart);
    }

    private _isStart(node: INode): boolean {
        return node.type === ElementType.START_EVENT;
    }

    private _isEnd(node: INode): boolean {
        return node.type === ElementType.END_EVENT;
    }

    private async _runNode(node: INode): Promise<void> {
        switch (node.type) {
            case ElementType.WEB:
                await new WebHandler(node).run();
                break;
            case ElementType.CLICK:
                await new ClickHandler(node).run();
                break;
        }
    }

    private _getNext(node: INode): INextNode[] {
        return node.next.map(next => ({
            flow: this._nodes.find(node => node.id === next.flowId) as IFlowNode,
            node: this._nodes.find(node => node.id === next.nodeId)
        }));
    }

    private _hasNext(node: INode): boolean {
        return node.next.length > 0;
    }

    private async _run(node: INode) {
        if (this._isEnd(node)) return;
        await this._runNode(node);
        if (!this._hasNext(node)) return;
        await Promise.all(this._getNext(node).map(async next => await this._run(next.node)));
    }

    async run(): Promise<void> {
        let start = this._getStartEvent();
        await this._run(start);
    }
}