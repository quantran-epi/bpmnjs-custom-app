import { IGraphNode } from './../models/GraphNode';
import { GraphNode } from "../models/GraphNode";

export class WebNode extends GraphNode {
    laucher: any;

    constructor(launcher: any, data: IGraphNode) {
        super(data);
        this.laucher = launcher;
    }

    async run() {
        const browser = await this.laucher.launch();
        const page = await browser.newPage();
        let href = this.data.properties.find(e => e.key === "href");
        await page.goto(href.value);
        return page;
    }
}