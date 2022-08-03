import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class StartHandler extends ExecutableNode {
    constructor(data: INode) {
        super(data);
    }

    public async run(): Promise<void> {
        console.log('start ', this._data, new Date().toUTCString());
    }
}