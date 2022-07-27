import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class WebHandler extends ExecutableNode {
    constructor(data: INode, previous: INode[], next: INode[]) {
        super(data, previous, next);
    }

    public run(): void {
        console.log('web ', this._data);
    }
}