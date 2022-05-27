import { WebNode } from './../nodes/WebNode';
import { ElementType } from '@constants';
import { INode } from '@models/Node';
import { GraphNode } from './GraphNode';
import { NodeParser } from './NodeParser';

export class Graph {
    nodes: GraphNode[];
    puppeteer: any;

    constructor(puppeteer: any) {
        this.nodes = [];
        this.puppeteer = puppeteer;
    }

    load(data: INode[]) {
        let self = this;
        let parsedNodes = new NodeParser().parse(data);
        parsedNodes.forEach(node => {
            if (node.type === ElementType.WEB) self.nodes.push(new WebNode(this.puppeteer, node))
        });
        return self.nodes;
    }

    find(id: string): GraphNode {
        return this.nodes.find(e => e.data.id === id);
    }
}