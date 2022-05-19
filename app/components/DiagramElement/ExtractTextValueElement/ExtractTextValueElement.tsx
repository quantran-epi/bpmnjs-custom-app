import { BasicProperties } from '@components/BasicProperties';
import { DynamicCreateProperties } from '@components/DynamicCreateProperties';
import { PropertyGroup } from '@components/PropertyGroup';
import { PropertyList } from '@components/PropertyList';
import { PropertyType } from '@constants';
import { useAccordion } from '@hooks/useAccordion';
import { useProperties } from '@hooks/useProperties';
import { usePropertyGroup } from '@hooks/usePropertyGroup';
import { INode } from '@models/Node';
import { IProperty } from '@models/Property';
import { IPropertyGroup } from '@models/PropertyGroup';
import { useMenu } from '@mui/base';
import { Stack } from '@mui/material';
import React, { FunctionComponent, useMemo, useState } from 'react';

interface IExtractTextValuePropertiesProps {
    data: INode;
}

export const ExtractTextValueProperties: FunctionComponent<IExtractTextValuePropertiesProps> = ({
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
    return (
        <Stack>
            {groups.map(_renderGroup)}
        </Stack>
    )
}