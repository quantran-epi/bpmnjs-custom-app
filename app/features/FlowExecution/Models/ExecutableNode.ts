import { INode } from "@models/Node";
import { BaseNode } from "./BaseNode";

export abstract class ExecutableNode extends BaseNode {
    constructor(data: INode) {
        super(data);
    }

    public abstract run(): Promise<void>;
}