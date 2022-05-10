import { IProperty } from "./Property";

export interface INode {
    id: string;
    typelLabel: string;
    label?: string
    type: string;
    properties: IProperty[];
}