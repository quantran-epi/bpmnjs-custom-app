import { INode } from "@models/Node";

export abstract class BaseNode {
    _data: INode;
    _previous: INode[];
    _next: INode[];

    constructor(data: INode, previous: INode[], next: INode[]) {
        this._data = data;
        this._previous = previous;
        this._next = next;
    }
}