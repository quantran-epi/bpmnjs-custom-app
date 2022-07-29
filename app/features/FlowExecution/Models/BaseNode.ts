import { INode } from "@models/Node";

export abstract class BaseNode {
    _data: INode;

    constructor(data: INode) {
        this._data = data;
    }
}