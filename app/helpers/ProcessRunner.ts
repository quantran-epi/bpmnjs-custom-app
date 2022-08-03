import { ElementType } from "@constants";
import { ClickHandler } from "@features/FlowExecution/Handlers/ClickHandler";
import { EndHandler } from "@features/FlowExecution/Handlers/EndHandler";
import { StartHandler } from "@features/FlowExecution/Handlers/StartHandler";
import { WebHandler } from "@features/FlowExecution/Handlers/WebHandler";
import { IFlowNode } from "@models/FlowNode";
import { INode } from "@models/Node";

interface INextNode {
    flow: IFlowNode;
    node: INode;
}

export class ProcessRunner {
    _childrenNodes: INode[];
    _process: Pick<INode, "id" | "properties">;

    constructor(childrenNode: INode[], process: Pick<INode, "id" | "properties">) {
        this._childrenNodes = childrenNode;
        this._process = process;
    }

    private _getStartEvent(): INode {
        return this._childrenNodes.find(this._isStart);
    }

    private _isStart(node: INode): boolean {
        return node.type === ElementType.START_EVENT;
    }

    private _isEnd(node: INode): boolean {
        return node.type === ElementType.END_EVENT;
    }

    private _getChildren(node: INode): INode[] {
        return this._childrenNodes.filter(child => child.parentId === node.id);
    }

    private _getChildrenRecursive(node: INode): INode[] {
        let children = this._getChildren(node);
        return children.concat(children.map(child => this._getChildren(child)).flat());
    }

    private async _runNode(node: INode): Promise<void> {
        switch (node.type) {
            case ElementType.START_EVENT:
                await new StartHandler(node).run();
                break;
            case ElementType.END_EVENT:
                await new EndHandler(node).run();
                break;
            case ElementType.WEB:
                await new WebHandler(node).run();
                break;
            case ElementType.CLICK:
                await new ClickHandler(node).run();
                break;
            case ElementType.SUB_PROCESS:
                console.log('Running process ', node.id, new Date().toUTCString());
                await this._runWithLoop(node);
                console.log("Finish running process ", node.id, new Date().toUTCString());
                break;
        }
    }

    private async _runWithLoop(node: INode): Promise<void> {
        let loop = node.properties.find(prop => prop.key === "loop").value;
        if (!loop)
            await new ProcessRunner(this._getChildrenRecursive(node), { id: node.id, properties: node.properties }).run();
        else
            for (let i = 0; i < loop; i++) {
                console.log('loop process ', node.id, i + 1);
                await new ProcessRunner(this._getChildrenRecursive(node), { id: node.id, properties: node.properties }).run();
                console.log('finish loop process ', node.id, i + 1);
            }
    }

    private _getNext(node: INode): INextNode[] {
        return node.next.map(next => ({
            flow: this._childrenNodes.find(node => node.id === next.flowId) as IFlowNode,
            node: this._childrenNodes.find(node => node.id === next.nodeId)
        }));
    }

    private _hasNext(node: INode): boolean {
        return node.next.length > 0;
    }

    private async _run(node: INode) {
        await this._runNode(node);
        if (this._isEnd(node)) return;
        if (!this._hasNext(node)) return;
        await Promise.all(this._getNext(node).map(async next => await this._run(next.node)));
    }

    async run(): Promise<void> {
        let start = this._getStartEvent();
        await this._run(start);
    }
}