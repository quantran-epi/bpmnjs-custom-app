import { ElementType } from "@constants";
import { IFlowNode } from "@models/FlowNode";
import { INode } from "@models/Node";
import { IGraphNode } from "./GraphNode";

export class NodeParser {
    constructor() {
    }

    parse(elements: INode[]) {
        let graphNodes: IGraphNode[] = [];
        let flows = elements.filter(e => e.type === ElementType.SEQUENCE_FLOW) as IFlowNode[];
        let nodes = elements.filter(e => e.type !== ElementType.SEQUENCE_FLOW
            && e.type !== ElementType.LABEL);
        nodes.forEach(node => {
            graphNodes.push(this.parseNode(node, nodes, flows));
        })
        return graphNodes;
    }

    parseNode(node: INode, nodes: INode[], flows: IFlowNode[]): IGraphNode | null {
        let incommingNodes = this.findIncommings(node, nodes, flows);
        let outgoingNodes = this.findOutgoings(node, nodes, flows);

        return {
            id: node.id,
            properties: node.properties.map(e => ({
                key: e.key,
                value: e.value
            })),
            type: node.type,
            incommings: incommingNodes.map(e => e.id),
            outgoings: outgoingNodes.map(e => e.id)
        }
    }

    findIncommings(data: INode, nodes: INode[], flows: IFlowNode[]): INode[] {
        return flows.filter(e => e.targetRef === data.id)
            .map(flow => nodes.find(node => node.id == flow.sourceRef));
    }

    findOutgoings(data: INode, nodes: INode[], flows: IFlowNode[]): INode[] {
        return flows.filter(e => e.sourceRef === data.id)
            .map(flow => nodes.find(node => node.id == flow.targetRef));
    }
}