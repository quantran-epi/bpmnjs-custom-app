import { BasicProperties } from '@components/BasicProperties';
import { PropertyList } from '@components/PropertyList';
import { useAccordion } from '@hooks/useAccordion';
import { useProperties } from '@hooks/useProperties';
import { INode } from '@models/Node';
import React, { FunctionComponent, useMemo } from 'react';

interface IClickPropertiesProps {
    data: INode;
}

export const ClickProperties: FunctionComponent<IClickPropertiesProps> = ({
    data
}) => {
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: data });
    const { handleExpandedChange, isExpanded } = useAccordion({
        keys: ['basic'],
        activeKeys: ['basic']
    })
    const _filterProperties = useMemo(() => {
        return _properties.filter(prop => !prop.dynamic)
    }, [_properties])

    return (
        <BasicProperties node={data} expanded={isExpanded('basic')} onExpanedChange={handleExpandedChange('basic')}>
            <PropertyList properties={_filterProperties} onSave={_updateProperty} onRemove={_removeProperty} />
        </BasicProperties>
    )
}