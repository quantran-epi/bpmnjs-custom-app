import { RootState } from './../../store';
import { IProperty } from './../../models/Property';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICursor, INode } from '../../models/Node'
import { useSelector } from 'react-redux';
import { IFlowNode } from '@models/FlowNode';
import { ElementType } from '@constants';

export interface PropertiesPanelState {
    nodes: INode[];
    selectedNodeId?: string;
}

const initialState: PropertiesPanelState = {
    nodes: [],
    selectedNodeId: undefined
}

export const PropertiesPanelSlice = createSlice({
    name: 'PropertiesPanel',
    initialState,
    reducers: {
        selectNode: (state, action: PayloadAction<string>) => {
            state.selectedNodeId = action.payload;
        },
        deselectNode: (state) => {
            state.selectedNodeId = undefined;
        },
        addNode: (state, action: PayloadAction<INode>) => {
            if (state.nodes.some(node => node.id === action.payload.id)) return;
            state.nodes.push(action.payload);
        },
        addNodes: (state, action: PayloadAction<INode[]>) => {
            state.nodes.push(...action.payload);
        },
        removeNodes: (state, action: PayloadAction<string[]>) => {
            // remove selected node if this node is about to be deleted
            if (state.selectedNodeId && action.payload.includes(state.selectedNodeId)) state.selectedNodeId = undefined;
            state.nodes = state.nodes.filter(node => !action.payload.includes(node.id));
        },
        updateLabel: (state, action: PayloadAction<{ nodeId: string, label: string }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            node.label = action.payload.label;
        },
        addProperty: (state, action: PayloadAction<{ nodeId: string, property: IProperty }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            node.properties.push(action.payload.property);
        },
        addProperties: (state, action: PayloadAction<{ nodeId: string, properties: IProperty[] }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            node.properties.push(...action.payload.properties);
        },
        removeProperties: (state, action: PayloadAction<{ nodeId: string, propertyIds: string[] }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            node.properties = node.properties.filter(prop => !action.payload.propertyIds.includes(prop.id));
        },
        updateProperty: (state, action: PayloadAction<{ nodeId: string, propertyId: string, property: IProperty }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            let property = node.properties.find(prop => prop.id === action.payload.propertyId);
            if (!property) return;
            property.key = action.payload.property.key;
            property.value = action.payload.property.value;
        },
        addNextCursor: (state, action: PayloadAction<{ nodeId: string, cursor: ICursor }>) => {
            state.nodes = state.nodes.map(node => {
                if (node.id !== action.payload.nodeId) return node;
                return {
                    ...node,
                    next: [...node.next, action.payload.cursor]
                }
            })
        },
        addPreviousCursor: (state, action: PayloadAction<{ nodeId: string, cursor: ICursor }>) => {
            state.nodes = state.nodes.map(node => {
                if (node.id !== action.payload.nodeId) return node;
                return {
                    ...node,
                    previous: [...node.previous, action.payload.cursor]
                }
            })
        },
        removeNextCursor: (state, action: PayloadAction<{ nodeId: string, flowId: string }>) => {
            state.nodes = state.nodes.map(node => {
                if (node.id !== action.payload.nodeId) return node;
                return {
                    ...node,
                    next: node.next.filter(cursor => cursor.flowId !== action.payload.flowId)
                }
            })
        },
        removePreviousCursor: (state, action: PayloadAction<{ nodeId: string, flowId: string }>) => {
            state.nodes = state.nodes.map(node => {
                if (node.id !== action.payload.nodeId) return node;
                return {
                    ...node,
                    previous: node.previous.filter(cursor => cursor.flowId !== action.payload.flowId)
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    selectNode,
    deselectNode,
    addNode,
    addNodes,
    removeNodes,
    updateLabel,
    addProperties,
    addProperty,
    removeProperties,
    updateProperty,
    addNextCursor,
    addPreviousCursor,
    removeNextCursor,
    removePreviousCursor
} = PropertiesPanelSlice.actions

export default PropertiesPanelSlice.reducer

const selectSelf = (state: RootState) => state
export const selectedNode = createSelector(selectSelf,
    (state: RootState) => state.propertiesPanel.nodes
        .find(e => e.id === state.propertiesPanel.selectedNodeId))

export const nodesSelector = createSelector(selectSelf, (state: RootState) => state.propertiesPanel.nodes);