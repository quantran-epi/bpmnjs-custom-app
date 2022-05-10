import { RootState } from './../../store';
import { IProperty } from './../../models/Property';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INode } from '../../models/Node'
import { useSelector } from 'react-redux';

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
            node.properties = node.properties.filter(prop => !action.payload.propertyIds.includes(prop.key));
        },
        updateProperty: (state, action: PayloadAction<{ nodeId: string, propertyId: string, property: IProperty }>) => {
            let node = state.nodes.find(node => node.id === action.payload.nodeId);
            if (!node) return;
            let property = node.properties.find(prop => prop.key === action.payload.propertyId);
            if (!property) return;
            property.key = action.payload.property.key;
            property.value = action.payload.property.value;
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
    updateProperty
} = PropertiesPanelSlice.actions

export default PropertiesPanelSlice.reducer

const selectSelf = (state: RootState) => state
export const selectedNode = createSelector(selectSelf,
    (state: RootState) => state.propertiesPanel.nodes
        .find(e => e.id === state.propertiesPanel.selectedNodeId)) 