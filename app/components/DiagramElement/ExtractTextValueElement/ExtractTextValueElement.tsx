import { BasicProperties } from '@components/BasicProperties';
import { DynamicCreateProperties } from '@components/DynamicCreateProperties';
import { PropertyList } from '@components/PropertyList';
import { PropertyType } from '@constants';
import { useAccordion } from '@hooks/useAccordion';
import { useProperties } from '@hooks/useProperties';
import { INode } from '@models/Node';
import { IProperty } from '@models/Property';
import { useMenu } from '@mui/base';
import React, { FunctionComponent, useMemo, useState } from 'react';

interface IExtractTextValuePropertiesProps {
    data: INode;
}

export const ExtractTextValueProperties: FunctionComponent<IExtractTextValuePropertiesProps> = ({
    data
}) => {
    const { properties: _properties, saveProperty: _saveProperty, updateProperty: _updateProperty, removeProperty: _removeProperty } = useProperties({ node: data });
    const { handleExpandedChange, isExpanded } = useAccordion({
        keys: ['basic', 'valueMapping'],
        activeKeys: ['valueMapping']
    })
    const _filterProperties = useMemo(() => {
        return _properties.filter(prop => !prop.dynamic)
    }, [_properties])

    return (
        <React.Fragment>
            {_filterProperties.length > 0 && <BasicProperties
                node={data}
                expanded={isExpanded("basic")}
                onExpanedChange={handleExpandedChange("basic")}>
                <PropertyList properties={_filterProperties} onSave={_updateProperty} onRemove={_removeProperty} />
            </BasicProperties>}
            <DynamicCreateProperties
                allowCreateTypes={[PropertyType.MultilineText]}
                title="Value Extractor"
                node={data}
                expanded={isExpanded("valueMapping")}
                onExpanedChange={handleExpandedChange("valueMapping")}
            />
        </React.Fragment>
    )
}