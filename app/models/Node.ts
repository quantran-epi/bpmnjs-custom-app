import { IProperty } from "./Property";

export interface INode {
    id: string;
    typeLabel: string;
    label?: string
    type: string;
    properties: IProperty[];
}