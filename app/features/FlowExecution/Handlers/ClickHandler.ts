import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

export class ClickHandler extends ExecutableNode {
    constructor(data: INode) {
        super(data);
    }

    public async run(): Promise<void> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log('click ', this._data, new Date().toUTCString());
                res();
            }, 2000)
        })
    }
}