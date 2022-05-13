import { INode } from "@models/Node";
import { IProperty } from "@models/Property";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProperty, removeProperties, updateProperty } from '../features/PropertiesPanel/PropertiesPanelSlice';

interface IUseProperties {
    properties: IProperty[];
    saveProperty: (data: IProperty) => void;
    updateProperty: (data: IProperty) => void;
    removeProperty: (id: string) => void;
}

interface IUsePropertiesProps {
    node: INode;
}

export const useProperties = ({
    node
}: IUsePropertiesProps): IUseProperties => {
    const dispatch = useDispatch();
    const [_properties, _setProperties] = useState<IProperty[]>(node.properties);

    const _saveProperty = (data: IProperty) => {
        dispatch(addProperty({ nodeId: node.id, property: data }));
    }

    const _updateProperty = (data: IProperty) => {
        dispatch(updateProperty({ nodeId: node.id, propertyId: data.id, property: data }));
    }

    const _removeProperty = (id: string) => {
        dispatch(removeProperties({ nodeId: node.id, propertyIds: [id] }))
    }

    useEffect(() => {
        _setProperties(node.properties);
    }, [node])


    return {
        saveProperty: _saveProperty,
        updateProperty: _updateProperty,
        removeProperty: _removeProperty,
        properties: _properties
    }
}