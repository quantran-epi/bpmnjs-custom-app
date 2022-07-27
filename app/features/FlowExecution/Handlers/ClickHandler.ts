import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class ClickHandler extends ExecutableNode {
    constructor(data: INode, previous: INode[], next: INode[]) {
        super(data, previous, next);
    }

    public run(): void {
        console.log('click ', this._data);
    }
}