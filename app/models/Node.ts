import { ElementType } from "@constants";
import { IProperty } from "./Property";

export interface INode {
    id: string;
    typeLabel: string;
    label?: string
    type: ElementType;
    properties: IProperty[];
    parentId: string;
}