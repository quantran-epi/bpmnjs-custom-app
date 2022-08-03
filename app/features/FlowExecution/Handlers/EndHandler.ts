import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class EndHandler extends ExecutableNode {
    constructor(data: INode) {
        super(data);
    }

    public async run(): Promise<void> {
        console.log('end ', this._data, new Date().toUTCString());
    }
}