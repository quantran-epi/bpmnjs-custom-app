import { ElementType } from "@constants";

export interface IGraphNodeProperty<T = any> {
    key: string;
    value: T;
}

export interface IGraphNode {
    id: string;
    type: ElementType,
    properties: IGraphNodeProperty[];
    outgoings: string[];
    incommings: string[];
}

export class GraphNode {
    data: IGraphNode;

    constructor(data: IGraphNode) {
        this.data = data;
    }
}