import { INode } from "./Node";

export interface IFlowNode extends INode {
    sourceRef: string;
    targetRef: string;
}