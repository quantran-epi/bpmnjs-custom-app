import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class WebHandler extends ExecutableNode {
    constructor(data: INode) {
        super(data);
    }

    public async run(): Promise<void> {
        console.log('web ', this._data, new Date().toUTCString());
    }
}