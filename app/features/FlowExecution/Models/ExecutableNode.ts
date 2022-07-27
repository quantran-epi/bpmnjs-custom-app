import { INode } from "@models/Node";
import { BaseNode } from "./BaseNode";

export abstract class ExecutableNode extends BaseNode {
    constructor(data: INode, previous: INode[], next: INode[]) {
        super(data, previous, next);
    }

    public abstract run(): void;
}