import { BasicProperties } from '@components/BasicProperties';
import { PropertyGroup } from '@components/PropertyGroup';
import { PropertyList } from '@components/PropertyList';
import { useAccordion } from '@hooks/useAccordion';
import { useProperties } from '@hooks/useProperties';
import { usePropertyGroup } from '@hooks/usePropertyGroup';
import { INode } from '@models/Node';
import { IPropertyGroup } from '@models/PropertyGroup';
import { Stack } from '@mui/material';
import React, { FunctionComponent, useMemo } from 'react';

interface IInputPropertiesProps {
    data: INode;
}

export const InputProperties: FunctionComponent<IInputPropertiesProps> = ({
    data
}) => {
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: data });
    const { groups } = usePropertyGroup({ elementType: data.type });

    const { handleExpandedChange, isExpanded } = useAccordion({
        activeKeys: [groups[0]?.key]
    })

    const _renderGroup = (group: IPropertyGroup): React.ReactNode => {
        let properties = _properties.filter(prop => prop.group === group.key);
        return <PropertyGroup data={group} onAddProperty={_saveProperty} expanded={isExpanded(group.key)} onExpanedChange={handleExpandedChange(group.key)}>
            <PropertyList properties={properties} onSave={_updateProperty} onRemove={_removeProperty} />
        </PropertyGroup>
    }

    return <Stack>
        {groups.map(_renderGroup)}
    </Stack>
}