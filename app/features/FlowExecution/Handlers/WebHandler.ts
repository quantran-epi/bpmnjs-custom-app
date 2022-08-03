import { INode } from "@models/Node";
import { ExecutableNode } from "../Models/ExecutableNode";

declare const chrome: any;

export class WebHandler extends ExecutableNode {
    constructor(data: INode) {
        super(data);
    }

    public async run(): Promise<void> {
        console.log('chrome', chrome);
        console.log('web ', this._data, new Date().toUTCString());
        let href = this._data.properties.find(prop => prop.key === 'href').value as unknown as string;

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        function injectedFunction() {
            console.log('inject function', href);
            chrome.windows.create({
                url: href,
                type: "popup"
            }, function (win) {
                console.log('open window', win);
                // win represents the Window object from windows API
                // Do something after opening
            })
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: injectedFunction,
        });
    }
}