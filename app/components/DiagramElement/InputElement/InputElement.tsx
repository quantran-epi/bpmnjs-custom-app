import { PropertyList } from '@components/PropertyList';
import { useProperties } from '@hooks/useProperties';
import { INode } from '@models/Node';
import React, { FunctionComponent, useMemo } from 'react';

interface IInputPropertiesProps {
    data: INode;
}

export const InputProperties: FunctionComponent<IInputPropertiesProps> = ({
    data
}) => {
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: data });

    const _filterProperties = useMemo(() => {
        return _properties.filter(prop => !prop.dynamic)
    }, [_properties])

    return (
        <PropertyList properties={_filterProperties} onSave={_updateProperty} onRemove={_removeProperty} />
    )
}