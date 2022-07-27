import { ElementType } from "@constants";
import { IFlowNode } from "./FlowNode";
import { IProperty } from "./Property";

export interface ICursor {
    nodeId: string;
    flow: IFlowNode;
}

export interface INode {
    id: string;
    typeLabel: string;
    label?: string
    type: ElementType;
    properties: IProperty[];
    parentId: string;
    previous?: ICursor[];
    next?: ICursor[];
    children?: INode[];
}