import { INode } from "@models/Node";
import { BaseNode } from "./BaseNode";

export class FlowNode extends BaseNode {
    constructor(data: INode, previous: INode, next: INode) {
        super(data, previous, next);
    }
}