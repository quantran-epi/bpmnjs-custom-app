import { ElementType } from "@constants";
import { INode } from "@models/Node";

export const NodeTransformer = {
    ToTree: (nodes: INode[]) => {
        const _isValid = (nodes: INode[]): boolean => {
            return nodes.filter(node => node.type === ElementType.START_EVENT)?.length === 1
                && nodes.filter(node => node.type === ElementType.END_EVENT)?.length === 1;
        }

        const _convertNodes = (nodes: INode[]) => {
            let _valid = true;
            function getChildren(nodeId: string) {
                let children = nodes.filter(e => e.parentId === nodeId);
                if (children.length === 0) return [];

                // validate
                _valid = _isValid(children);

                return children.map(child => ({
                    ...child,
                    children: getChildren(child.id)
                }))
            }

            let process = {
                id: "Process_1",
                children: getChildren("Process_1")
            };

            if (!_valid) return;
            return process;
        }

        return _convertNodes(nodes);
    }
}