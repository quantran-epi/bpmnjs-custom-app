import { ElementType } from "@constants";
import { IProperty } from "./Property";

export interface ICursor {
    nodeId: string;
    flowId: string;
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